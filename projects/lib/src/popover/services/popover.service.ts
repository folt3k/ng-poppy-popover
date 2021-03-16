import { ComponentRef, Injectable, Injector } from '@angular/core';

import { PopoverContentComponent } from '../components/popover-content/popover-content.component';
import { LayerService } from '../../layer/layer.service';
import { PopoverAppendOptions } from '../models/popover-append-options.model';
import { ActivePopover } from '../models/popover-active.model';
import { BasePopoverDirective } from '../directives/base-popover';
import { LayerAppendOptions } from '../../layer/layer.model';
import { PopoverEventsService } from './events.service';

@Injectable({
  providedIn: 'root',
})
export class PopoverService {
  activePopovers: ActivePopover[] = [];

  constructor(private layerService: LayerService, private eventsService: PopoverEventsService) {}

  append(
    injector: Injector,
    directive: BasePopoverDirective,
    options: PopoverAppendOptions,
    parentPopoverRef?: ComponentRef<PopoverContentComponent>
  ): ComponentRef<PopoverContentComponent> {
    const existedPopover = this.activePopovers.find((popover) => popover.directiveRef === directive);

    if (options.closeOnTriggerAgain && existedPopover) {
      this.remove(existedPopover.popoverRef);
      return existedPopover.popoverRef;
    } else {
      return this.appendToBody(injector, directive, options, parentPopoverRef);
    }
  }

  remove(popoverRef: ComponentRef<PopoverContentComponent>): void {
    const active: ActivePopover = this.activePopovers.find((p) => p.popoverRef === popoverRef);

    if (active) {
      if (active.directiveRef) {
        active.directiveRef.popoverComponentRef = null;
        active.directiveRef.afterClose.emit();
      }
      active.popoverRef.destroy();
      this.layerService.removeFromBody(active.popoverRef);
      this.eventsService.unregister('click-outside', active);
      this.eventsService.unregister('capture-scroll', active);
      this.eventsService.unregister('resize', active);

      this.activePopovers = this.activePopovers.filter((a) => a.popoverRef !== popoverRef);
    }
  }

  removeByNativeElementRef(element: HTMLElement): void {
    const activePopover = this.activePopovers.find(
      (active) => active.popoverRef.location.nativeElement === element
    );

    if (activePopover) {
      this.remove(activePopover.popoverRef);
    }
  }

  getActive(popoverRef: ComponentRef<PopoverContentComponent>): ActivePopover {
    return this.activePopovers.find((active) => active.popoverRef === popoverRef);
  }

  isPopoverSubmenuExits(
    precendingRef: ComponentRef<PopoverContentComponent>,
    parentRef: ComponentRef<PopoverContentComponent>
  ): boolean {
    const precendingActivePopover: ActivePopover = this.getActive(precendingRef);

    if (!precendingActivePopover || (precendingActivePopover && !precendingActivePopover.deepLevel)) {
      return false;
    }

    return !!this.activePopovers.find(
      (popover) =>
        popover.parentPopoverRef === parentRef && popover.deepLevel === precendingActivePopover.deepLevel + 1
    );
  }

  removeAllNestedPopovers(popoverRef: ComponentRef<PopoverContentComponent>): void {
    const activePopover = this.getActive(popoverRef);

    if (activePopover) {
      this.activePopovers
        .filter((popover) => popover.deepLevel > activePopover.deepLevel)
        .forEach((popover) => {
          this.remove(popover.popoverRef);
        });
    }
  }

  removeMenu(componentRef: ComponentRef<PopoverContentComponent>): void {
    this.activePopovers
      .filter((popover) => popover.parentPopoverRef === componentRef || popover.popoverRef === componentRef)
      .forEach((popover) => {
        this.remove(popover.popoverRef);
      });
  }

  subscribeToClickOutsideEventForParentPopover(componentRef: ComponentRef<PopoverContentComponent>): void {
    const currentPopover: ActivePopover = this.getActive(componentRef);

    if (currentPopover) {
      const parentPopover: ActivePopover = this.activePopovers.find(
        (popover) =>
          popover.superParentPopoverRef === currentPopover.superParentPopoverRef &&
          popover.deepLevel === currentPopover.deepLevel - 1
      );

      if (parentPopover) {
        setTimeout(() => {
          this.eventsService.subscribe('click-outside', parentPopover);
        });
      }
    }
  }

  private appendToBody(
    injector: Injector,
    directive: BasePopoverDirective,
    options: PopoverAppendOptions,
    parentPopoverRef?: ComponentRef<PopoverContentComponent>
  ): ComponentRef<PopoverContentComponent> {
    const layerOptions = new LayerAppendOptions({ delayClose: options.delayClose });
    const popover = this.layerService.appendToBody(PopoverContentComponent, layerOptions, injector);
    const { superparent, deepLevel } = this.prepareSuperparentAndDeepLevel(
      popover,
      parentPopoverRef,
      directive
    );
    const newPopover = new ActivePopover(
      popover,
      parentPopoverRef,
      superparent,
      directive,
      options.type,
      deepLevel
    );

    popover.instance.componentRef = popover;
    popover.instance.parentPopoverRef = popover;
    popover.changeDetectorRef.detectChanges();

    this.activePopovers.push(newPopover);

    if (newPopover.directiveRef) {
      newPopover.directiveRef.afterShow.emit();
    }

    if (this.canRegisterScrollCaptureEvent(newPopover, options)) {
      this.registerScrollCaptureEvent(newPopover, options);
    }

    if (this.canRegisterResizeEvent(newPopover, options)) {
      this.registerResizeEvent(newPopover, options);
    }

    return popover;
  }

  private prepareSuperparentAndDeepLevel(
    popover: ComponentRef<PopoverContentComponent>,
    parentPopover: ComponentRef<PopoverContentComponent>,
    directive: BasePopoverDirective
  ): { deepLevel: number; superparent: ComponentRef<PopoverContentComponent> } {
    let deepLevel = 0;
    let superparent = null;

    if (directive) {
      const parentPopover = this.activePopovers.find((p) => {
        return p.popoverRef.instance.element.nativeElement.contains(directive.hostElement.nativeElement);
      });

      if (!parentPopover) {
        superparent = popover;
        deepLevel = 0;
      } else {
        superparent = parentPopover.superParentPopoverRef || parentPopover.popoverRef;
        deepLevel = parentPopover.deepLevel + 1;
      }
    } else {
      const closestParent = this.activePopovers.find((p) => p.popoverRef === parentPopover);
      if (closestParent) {
        const popoverGroup = this.activePopovers.filter(
          (p) => p.superParentPopoverRef === closestParent.superParentPopoverRef
        );
        superparent = closestParent.superParentPopoverRef;
        deepLevel = popoverGroup[popoverGroup.length - 1].deepLevel + 1;
      }
    }

    return {
      deepLevel,
      superparent,
    };
  }

  private canRegisterScrollCaptureEvent(popover: ActivePopover, options: PopoverAppendOptions): boolean {
    const { triggeredBy, type, closeOnScroll } = options;

    return (
      popover.directiveRef &&
      popover.deepLevel === 0 &&
      triggeredBy !== 'hover' &&
      type !== 'submenu' &&
      closeOnScroll
    );
  }

  private canRegisterResizeEvent(popover: ActivePopover, options: PopoverAppendOptions): boolean {
    const { triggeredBy, type } = options;

    return popover.directiveRef && popover.deepLevel === 0 && triggeredBy !== 'hover' && type !== 'submenu';
  }

  private registerResizeEvent(popover: ActivePopover, options: PopoverAppendOptions): void {
    this.eventsService.register('resize', popover, () => {
      if (options.type === 'context') {
        this.hideGroup(popover);
      } else {
        this.updateGroupPosition(popover);
      }
    });
  }

  private registerScrollCaptureEvent(popover: ActivePopover, options: PopoverAppendOptions): void {
    this.eventsService.register('capture-scroll', popover, (event: MouseEvent) => {
      const captured =
        popover.directiveRef.hostElement.nativeElement === event.target ||
        (event.target as HTMLElement).contains(popover.directiveRef.hostElement.nativeElement);

      if ((captured && options.hideOnScroll) || options.type === 'context') {
        this.hideGroup(popover);
      }

      if (captured && !options.hideOnScroll && options.type !== 'context') {
        this.updateGroupPosition(popover);
      }
    });
  }

  private hideGroup(popover: ActivePopover): void {
    this.activePopovers.forEach((active) => {
      if (active.superParentPopoverRef === popover.superParentPopoverRef) {
        this.remove(active.popoverRef);
      }
    });
  }

  private updateGroupPosition(popover: ActivePopover): void {
    this.activePopovers
      .filter((active) => active.superParentPopoverRef === popover.popoverRef)
      .forEach((active) => {
        if (active.popoverRef.instance.componentStyles) {
          active.popoverRef.instance.componentStyles.update();
        }
      });
  }
}
