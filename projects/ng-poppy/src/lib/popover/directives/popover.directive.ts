import {
  AfterViewInit,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Injector,
  Input,
  NgZone,
  TemplateRef,
} from '@angular/core';
import { fromEvent, merge, timer } from 'rxjs';
import { takeUntil, debounceTime, tap, switchMap, take } from 'rxjs/operators';
import { POPOVER_CONFIG, PopoverConfig } from '../popover.token';
import { PopoverService } from '../services/popover.service';
import { PopoverAppendOptions } from '../models/popover-append-options.model';
import { BasePopoverDirective } from './base-popover';
import { PopoverType } from '../popover.interface';

@Directive({
  selector: '[poppyPopover]',
  exportAs: 'poppyPopover',
})
export class PopoverDirective extends BasePopoverDirective implements AfterViewInit {
  @Input() poppyPopover: TemplateRef<HTMLElement> | string;

  protected type: PopoverType = 'popover';

  constructor(
    protected readonly componentFactoryResolver: ComponentFactoryResolver,
    protected readonly popoverService: PopoverService,
    public readonly hostElement: ElementRef,
    protected readonly ngZone: NgZone
  ) {
    super(componentFactoryResolver, popoverService, hostElement, ngZone);
  }

  ngAfterViewInit(): void {
    if (this.poppyPopover) {
      this.ngZone.runOutsideAngular(() => {
        if (this.trigger === 'click') {
          this.listenEventsForClickTrigger();
        }

        if (this.trigger === 'hover') {
          this.listenEventsForHoverTrigger();
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

  protected getPopoverComponentInjector(): Injector {
    const providerValues: PopoverConfig = {
      bounds: this.hostElement.nativeElement.getBoundingClientRect(),
      type: this.type,
      trigger: this.trigger,
      triggerElement: this.hostElement,
      triggerDirective: this,
      content: this.poppyPopover,
      closeOnClickOutside: this.closeOnClickOutside,
      innerClass: this.innerClass,
    };

    return Injector.create([
      {
        provide: POPOVER_CONFIG,
        useValue: providerValues,
      },
    ]);
  }

  protected canAppend(): boolean {
    return !this.popoverComponentRef || (this.popoverComponentRef && this.closeOnTriggerAgain);
  }

  private listenEventsForClickTrigger(): void {
    fromEvent(this.hostElement.nativeElement, 'click')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.open();
      });
  }

  private listenEventsForHoverTrigger(): void {
    let popoverHovered = false;
    let hostHovered = false;
    let isMouseLeftBeforeDelayTimePast = false;

    merge(
      fromEvent(this.hostElement.nativeElement, 'mouseenter'),
      fromEvent(this.hostElement.nativeElement, 'click')
    )
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          fromEvent(this.hostElement.nativeElement, 'mouseleave')
            .pipe(takeUntil(this.destroy$), takeUntil(this.afterClose), debounceTime(200))
            .subscribe(() => {
              hostHovered = false;
              isMouseLeftBeforeDelayTimePast = true;
              setTimeout(() => {
                isMouseLeftBeforeDelayTimePast = false;
              }, 200);
              if (!popoverHovered) {
                this.remove(this.popoverComponentRef);
              }
            });
        }),
        switchMap(() => timer(300))
      )
      .subscribe(() => {
        const isHostElementStillInDOM = document.body.contains(this.hostElement.nativeElement);
        popoverHovered = false;
        hostHovered = true;

        if (isHostElementStillInDOM && !isMouseLeftBeforeDelayTimePast) {
          this.open();
        }

        setTimeout(() => {
          if (this.popoverComponentRef) {
            fromEvent(this.popoverComponentRef.instance.element.nativeElement, 'mouseenter')
              .pipe(takeUntil(this.afterClose))
              .subscribe(() => {
                popoverHovered = true;
              });

            fromEvent(this.popoverComponentRef.instance.element.nativeElement, 'mouseleave')
              .pipe(takeUntil(this.afterClose))
              .subscribe(() => {
                popoverHovered = false;
                if (!hostHovered) {
                  this.remove(this.popoverComponentRef);
                }
              });
          }
        }, 0);
      });

    this.destroy$.pipe(take(1)).subscribe(() => {
      if (this.popoverComponentRef) {
        this.remove(this.popoverComponentRef);
      }
    });
  }

  private append(): void {
    const options = new PopoverAppendOptions({
      type: 'popover',
      triggeredBy: this.trigger,
    });

    this.appendToLayer(options);
  }
}
