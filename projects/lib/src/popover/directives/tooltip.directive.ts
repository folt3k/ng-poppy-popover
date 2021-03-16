import {
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  Input,
  NgZone,
  OnInit,
  TemplateRef,
} from '@angular/core';

import { PopoverDirective } from './popover.directive';
import { PopoverService } from '../services/popover.service';
import { PopoverTrigger, PopoverType } from '../popover.interface';

@Directive({
  selector: '[poppyTooltip]',
})
export class TooltipDirective extends PopoverDirective implements OnInit {
  @Input() poppyTooltip: string | TemplateRef<any>;

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
