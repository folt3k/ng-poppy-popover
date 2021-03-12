import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  Inject,
  Injector,
  NgZone,
  OnDestroy,
  ViewChild,
  ViewRef,
  ViewEncapsulation,
  TemplateRef,
} from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, skipUntil, takeUntil } from 'rxjs/operators';

import { POPOVER_CONFIG, PopoverConfig } from '../../popover.token';
import { PopoverService } from '../../services/popover.service';
import { PopoverType } from '../../popover.interface';
import { PopoverAppendOptions } from '../../models/popover-append-options.model';
import { fadeInAnimation } from '../../popover.animations';
import { PopoverStyles } from '../../models/popover-styles.model';
import { PopoverEventsService } from '../../services/events.service';
import { PopoverMenuItemDirective } from '../../directives/popover-menu-item.directive';
import { PopoverMenuComponent } from '../popover-menu/popover-menu.component';

@Component({
  selector: 'poppy-content',
  templateUrl: './popover-content.component.html',
  styleUrls: ['./popover-content.component.scss'],
  animations: [fadeInAnimation],
  encapsulation: ViewEncapsulation.None,
})
export class PopoverContentComponent implements OnDestroy, AfterViewInit {
  @ViewChild('popoverWrapperEl') popoverWrapperEl: ElementRef;

  componentRef: ComponentRef<PopoverContentComponent>;
  parentPopoverRef: ComponentRef<PopoverContentComponent>;
  animationState: 'open' | 'close' = 'close';
  componentStyles: PopoverStyles;
  private subMenuComponentRef: ComponentRef<PopoverContentComponent>;
  private animationEnd$ = new Subject();
  private menuItemsChanged = new Subject();
  private destroy$ = new Subject();

  constructor(
    public readonly element: ElementRef,
    private readonly ngZone: NgZone,
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly popoverService: PopoverService,
    private readonly popoverEventsService: PopoverEventsService,
    private readonly cdr: ChangeDetectorRef,
    @Inject(POPOVER_CONFIG) public readonly popoverConfig: PopoverConfig
  ) {}

  ngAfterViewInit(): void {
    this.applyStyles();

    if (this.popoverConfig.submenuTriggeredItem) {
      this.popoverConfig.submenuTriggeredItem.element.nativeElement.classList.add(
        'popover-menu-item--focused'
      );
    }

    if (this.popoverConfig.innerClass) {
      this.popoverWrapperEl.nativeElement.classList.add(this.popoverConfig.innerClass);
    }

    this.listenForMouseEventOnHost();

    if (this.canListenForClickOutside()) {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this.listenForClickOutside();
        });
      });
    }

    if (this.popoverConfig.menuRef?.menuItems) {
      this.listenForMenuItemTriggers();

      // Subscribe to click outside event again, when menu items changed - it's workaround to refresh host element content;
      this.popoverConfig.menuRef.menuItems.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.menuItemsChanged.next();

        this.listenForMenuItemTriggers();
        this.popoverEventsService.unregister(
          'click-outside',
          this.popoverService.getActive(this.componentRef)
        );
        setTimeout(() => {
          this.listenForClickOutside();
          this.componentStyles.update();
        }, 0);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.popoverConfig.submenuTriggeredItem) {
      this.popoverConfig.submenuTriggeredItem.element.nativeElement.classList.remove(
        'popover-menu-item--focused'
      );
    }

    this.destroy$.next();
    this.destroy$.complete();
  }

  get template(): TemplateRef<any> {
    return (
      (this.popoverConfig.content instanceof TemplateRef &&
        (this.popoverConfig.content as TemplateRef<any>)) ||
      this.popoverConfig.menuRef?.templateRef
    );
  }

  animationEnd(event: AnimationEvent): void {
    if (event.toState === 'open') {
      this.animationEnd$.next();
    }
  }

  private applyStyles(): void {
    this.componentStyles = new PopoverStyles(this);
    this.componentStyles.init();

    setTimeout(() => {
      this.componentStyles.update();
      this.animationState = 'open';
      this.detectChanges();
    });
  }

  private onClickMenuItem(item: PopoverMenuItemDirective): void {
    const hasItemNestedSubpopovers = !!item.submenu;

    if (!hasItemNestedSubpopovers) {
      if (this.popoverConfig.closeOnClickItem) {
        this.close();
      }
    }
  }

  private onHoverMenuItem(item: PopoverMenuItemDirective): void {
    const canRemoveNestedSubmenus = !this.popoverService.activePopovers.find(
      (popover) => popover.popoverRef.instance.popoverConfig.submenuTriggeredItem === item
    );
    const hasItemNestedSubpopovers = !!item.submenu;

    if (canRemoveNestedSubmenus) {
      this.popoverService.removeAllNestedPopovers(this.componentRef);
      this.detectChanges();
    }

    const isSubmenuExists = this.popoverService.isPopoverSubmenuExits(
      this.componentRef,
      this.parentPopoverRef
    );

    if (!isSubmenuExists && hasItemNestedSubpopovers && canRemoveNestedSubmenus) {
      this.createSubpopover(item);
    }
  }

  private listenForClickOutside(): void {
    const activePopover = this.popoverService.getActive(this.componentRef);

    this.popoverEventsService.register('click-outside', activePopover, (event) => {
      const clickedElement = event.target;
      let clickedOutside =
        clickedElement !== this.element.nativeElement &&
        !this.element.nativeElement.contains(clickedElement) &&
        clickedElement !== this.popoverConfig.triggerElement.nativeElement &&
        !this.popoverConfig.triggerElement.nativeElement.contains(clickedElement);

      if (
        this.popoverConfig.type === 'context' &&
        (clickedElement === this.popoverConfig.triggerElement.nativeElement ||
          this.popoverConfig.triggerElement.nativeElement.contains(clickedElement))
      ) {
        clickedOutside = true;
      }
      if (clickedOutside) {
        this.close();
      }
    });
  }

  private listenForMouseEventOnHost(): void {
    fromEvent(this.element.nativeElement, 'mouseenter')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const enteredPopover = this.popoverService.getActive(this.componentRef);

        if (enteredPopover?.deepLevel) {
          this.popoverService.activePopovers.forEach((popover, index) => {
            if (index <= enteredPopover.deepLevel) {
              this.popoverEventsService.unsubscribe('click-outside', popover);
            } else {
              this.popoverEventsService.subscribe('click-outside', popover);
            }
          });
        }
      });
    fromEvent(this.element.nativeElement, 'mouseleave')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.popoverService.activePopovers.forEach((popover) => {
          this.popoverEventsService.subscribe('click-outside', popover);
        });
      });
  }

  private listenForMenuItemTriggers(): void {
    this.popoverConfig.menuRef.menuItems.forEach((item) => {
      item.clicked$.pipe(takeUntil(this.destroy$), takeUntil(this.menuItemsChanged)).subscribe(() => {
        this.onClickMenuItem(item);
      });
      item.hovered$
        .pipe(
          takeUntil(this.destroy$),
          takeUntil(this.menuItemsChanged),
          debounceTime(0),
          skipUntil(this.animationEnd$)
        )
        .subscribe(() => {
          this.onHoverMenuItem(item);
        });
    });
  }

  private close(): void {
    if (this.isMenu()) {
      this.popoverService.subscribeToClickOutsideEventForParentPopover(this.componentRef);
      this.popoverService.removeMenu(this.parentPopoverRef);
    } else {
      this.popoverService.remove(this.componentRef);
    }
  }

  private createSubpopover(item: PopoverMenuItemDirective): void {
    const factory = this.componentFactoryResolver.resolveComponentFactory(PopoverContentComponent);
    const bounds = item.element.nativeElement.getBoundingClientRect();
    const type: PopoverType = 'submenu';
    const options = new PopoverAppendOptions({ type });

    const providedValues: PopoverConfig = {
      bounds,
      type,
      submenuTriggeredItem: item,
      triggerElement: this.popoverConfig.triggerElement,
      closeOnClickItem: this.popoverConfig.closeOnClickItem,
    };

    if (item?.submenu instanceof PopoverMenuComponent) {
      providedValues.menuRef = item.submenu;
    }
    if (item?.submenu instanceof TemplateRef) {
      providedValues.content = item.submenu;
    }

    const injector = Injector.create([
      {
        provide: POPOVER_CONFIG,
        useValue: providedValues,
      },
    ]);

    this.subMenuComponentRef = this.popoverService.append(injector, null, options, this.parentPopoverRef);
    this.subMenuComponentRef.instance.componentRef = this.subMenuComponentRef;
    this.subMenuComponentRef.instance.parentPopoverRef = this.parentPopoverRef;
    this.subMenuComponentRef.hostView.detectChanges();
  }

  private isMenu(): boolean {
    return (
      this.popoverConfig.type === 'menu' ||
      this.popoverConfig.type === 'context' ||
      this.popoverConfig.type === 'submenu'
    );
  }

  private canListenForClickOutside(): boolean {
    return (
      this.popoverConfig.closeOnClickOutside && (this.popoverConfig.trigger !== 'hover' || this.isMenu())
    );
  }

  private detectChanges(): void {
    if (this.cdr && !(this.cdr as ViewRef).destroyed) {
      this.cdr.detectChanges();
    }
  }
}
