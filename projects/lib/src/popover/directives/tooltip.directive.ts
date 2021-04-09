import {
  ComponentFactoryResolver,
  Directive,
  ElementRef, EventEmitter,
  Input,
  NgZone,
  OnInit, Output,
  TemplateRef,
} from '@angular/core';

import { PopoverDirective } from './popover.directive';
import { PopoverService } from '../services/popover.service';
import {PopoverPosition, PopoverTrigger, PopoverType} from '../popover.interface';

@Directive({
  selector: '[poppyTooltip]',
})
export class TooltipDirective extends PopoverDirective implements OnInit {
  @Input() poppyTooltip: string | TemplateRef<any>;
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

  trigger: PopoverTrigger = 'hover';
  type: PopoverType = 'tooltip';

  constructor(
    protected readonly componentFactoryResolver: ComponentFactoryResolver,
    protected readonly popoverService: PopoverService,
    public readonly hostElement: ElementRef,
    protected readonly ngZone: NgZone
  ) {
    super(componentFactoryResolver, popoverService, hostElement, ngZone);
  }

  ngOnInit(): void {
    this.poppyPopover = this.poppyTooltip;
  }
}
