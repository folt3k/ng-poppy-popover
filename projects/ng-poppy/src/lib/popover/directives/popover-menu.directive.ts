import {
  AfterViewInit,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Injector,
  Input,
  NgZone,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { POPOVER_CONFIG, PopoverConfig } from '../popover.token';
import { PopoverBounds, PopoverContextMenuPosition, PopoverMenuType } from '../popover.interface';
import { PopoverService } from '../services/popover.service';
import { PopoverAppendOptions } from '../models/popover-append-options.model';
import { BasePopoverDirective } from './base-popover';
import { PopoverMenuComponent } from '../components/popover-menu/popover-menu.component';

@Directive({
  selector: '[poppyMenu]',
  exportAs: 'poppyMenu',
})
export class PopoverMenuDirective extends BasePopoverDirective implements AfterViewInit {
  @Input() poppyMenu: PopoverMenuComponent;
  @Input() type: PopoverMenuType = 'menu';
  @Input() closeOnClickItem: boolean = true;

  private contextMenuPosition: PopoverContextMenuPosition;

  constructor(
    protected readonly componentFactoryResolver: ComponentFactoryResolver,
    protected readonly popoverService: PopoverService,
    public readonly hostElement: ElementRef,
    protected readonly ngZone: NgZone
  ) {
    super(componentFactoryResolver, popoverService, hostElement, ngZone);
  }

  ngAfterViewInit(): void {
    if (this.poppyMenu) {
      this.ngZone.runOutsideAngular(() => {
        if (this.trigger !== 'manual' && this.type === 'menu') {
          this.listenEventsForClickTrigger();
        }

        if (this.type === 'context') {
          this.listenEventsForContextTrigger();
        }
      });
    }
  }

  open(): void {
    if (this.canAppend()) {
      this.ngZone.run(() => {
        this.append();
      });
    }
  }

  // NOTE: It should be removed after upgrade to ng 9, because QueryList should emit changes
  // when elements is removed
  updateContentPosition(): void {
    if (this.popoverComponentRef) {
      this.popoverComponentRef.instance.componentStyles.update();
    }
  }

  protected getPopoverComponentInjector(): Injector {
    const providerValues: PopoverConfig = {
      bounds: this.getBounds(),
      type: this.type,
      triggerElement: this.hostElement,
      triggerDirective: this,
      closeOnClickOutside: this.closeOnClickOutside,
      closeOnClickItem: this.closeOnClickItem,
      menuRef: this.poppyMenu,
      innerClass: this.innerClass,
      position: this.position,
    };

    return Injector.create([
      {
        provide: POPOVER_CONFIG,
        useValue: providerValues,
      },
    ]);
  }

  protected canAppend(): boolean {
    return (
      !this.popoverComponentRef ||
      (this.popoverComponentRef && this.type === 'context') ||
      (this.popoverComponentRef && this.closeOnTriggerAgain)
    );
  }

  private listenEventsForClickTrigger(): void {
    fromEvent(this.hostElement.nativeElement, 'click')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.open();
      });
  }

  private listenEventsForContextTrigger(): void {
    fromEvent(this.hostElement.nativeElement, 'contextmenu')
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: MouseEvent) => {
        event.preventDefault();
        this.contextMenuPosition = {
          top: event.clientY,
          left: event.clientX,
        };
        this.open();
      });
  }

  private append(): void {
    const options = new PopoverAppendOptions({
      type: this.type,
    });

    this.appendToLayer(options);
  }

  private getBounds(): PopoverBounds {
    if (this.type === 'context') {
      return { top: this.contextMenuPosition.top, left: this.contextMenuPosition.left };
    } else {
      return this.hostElement.nativeElement.getBoundingClientRect();
    }
  }
}
