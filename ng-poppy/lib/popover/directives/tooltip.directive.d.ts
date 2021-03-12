import { ComponentFactoryResolver, ElementRef, NgZone, OnInit, TemplateRef } from '@angular/core';
import { PopoverDirective } from './popover.directive';
import { PopoverService } from '../services/popover.service';
import { PopoverTrigger, PopoverType } from '../popover.interface';
import * as i0 from "@angular/core";
export declare class TooltipDirective extends PopoverDirective implements OnInit {
    protected readonly componentFactoryResolver: ComponentFactoryResolver;
    protected readonly popoverService: PopoverService;
    readonly hostElement: ElementRef;
    protected readonly ngZone: NgZone;
    poppyTooltip: string | TemplateRef<any>;
    trigger: PopoverTrigger;
    type: PopoverType;
    constructor(componentFactoryResolver: ComponentFactoryResolver, popoverService: PopoverService, hostElement: ElementRef, ngZone: NgZone);
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDef<TooltipDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<TooltipDirective, "[poppyTooltip]", never, { "poppyTooltip": "poppyTooltip"; }, {}, never>;
}
