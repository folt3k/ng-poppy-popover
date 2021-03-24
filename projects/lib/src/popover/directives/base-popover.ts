import {
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Injector,
  Input,
  OnDestroy,
  Output,
  ElementRef,
  NgZone,
  Directive,
  OnInit,
} from '@angular/core';
import { merge, Observable, Subject } from 'rxjs';

import { PopoverContentComponent } from '../components/popover-content/popover-content.component';
import { PopoverService } from '../services/popover.service';
import { PopoverAppendOptions } from '../models/popover-append-options.model';
import { PopoverPosition, PopoverTrigger, PopoverType } from '../popover.interface';
import { mapTo } from 'rxjs/operators';

@Directive()
export abstract class BasePopoverDirective implements OnDestroy, OnInit {
  @Input() trigger: PopoverTrigger = 'click';
  // Options
  @Input() delayClose: number = null;
  @Input() closeOnTriggerAgain = undefined;
  @Input() closeOnClickOutside = true;
  @Input() hideOnScroll: boolean = false;
  @Input() stickyToTrigger: boolean = false;
  @Input() innerClass: string;
  @Input() position: PopoverPosition = 'bottom';
  // Emitters
  @Output() afterClose = new EventEmitter();
  @Output() afterShow = new EventEmitter();

  popoverComponentRef: ComponentRef<PopoverContentComponent>;
  isOpen$: Observable<boolean>;
  protected type: PopoverType = 'popover';
  protected destroy$ = new Subject();

  protected constructor(
    protected readonly componentFactoryResolver: ComponentFactoryResolver,
    protected readonly popoverService: PopoverService,
    public readonly hostElement: ElementRef,
    protected readonly ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.setOptions();
    this.isOpen$ = merge(this.afterShow.pipe(mapTo(true)), this.afterClose.pipe(mapTo(false)));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  public abstract open(): void;

  protected abstract getPopoverComponentInjector(): Injector;

  protected abstract canAppend(): boolean;

  public close(): void {
    if (this.popoverComponentRef) {
      this.remove(this.popoverComponentRef);
    }
  }

  protected appendToLayer(options: PopoverAppendOptions): void {
    const injector = this.getPopoverComponentInjector();
    const opts: PopoverAppendOptions = {
      ...options,
      delayClose: this.delayClose,
      closeOnTriggerAgain: this.closeOnTriggerAgain,
      hideOnScroll: this.hideOnScroll,
      stickyToTrigger: this.stickyToTrigger,
    };

    this.popoverComponentRef = this.popoverService.append(injector, this, opts);
  }

  protected remove(popoverRef: ComponentRef<PopoverContentComponent>): void {
    this.ngZone.run(() => {
      this.popoverService.remove(popoverRef);
    });
  }

  private setOptions(): void {
    if (this.closeOnTriggerAgain === undefined) {
      this.closeOnTriggerAgain = !(
        this.type === 'tooltip' ||
        this.trigger === 'hover' ||
        this.type === 'context'
      );
    }
  }
}
