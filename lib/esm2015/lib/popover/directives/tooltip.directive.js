import { Directive, Input, } from '@angular/core';
import { PopoverDirective } from './popover.directive';
import * as i0 from "@angular/core";
import * as i1 from "../services/popover.service";
export class TooltipDirective extends PopoverDirective {
    constructor(componentFactoryResolver, popoverService, hostElement, ngZone) {
        super(componentFactoryResolver, popoverService, hostElement, ngZone);
        this.componentFactoryResolver = componentFactoryResolver;
        this.popoverService = popoverService;
        this.hostElement = hostElement;
        this.ngZone = ngZone;
        this.trigger = 'hover';
        this.type = 'tooltip';
    }
    ngOnInit() {
        this.poppyPopover = this.poppyTooltip;
    }
}
TooltipDirective.ɵfac = function TooltipDirective_Factory(t) { return new (t || TooltipDirective)(i0.ɵɵdirectiveInject(i0.ComponentFactoryResolver), i0.ɵɵdirectiveInject(i1.PopoverService), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.NgZone)); };
TooltipDirective.ɵdir = i0.ɵɵdefineDirective({ type: TooltipDirective, selectors: [["", "poppyTooltip", ""]], inputs: { poppyTooltip: "poppyTooltip" }, features: [i0.ɵɵInheritDefinitionFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(TooltipDirective, [{
        type: Directive,
        args: [{
                selector: '[poppyTooltip]',
            }]
    }], function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.PopoverService }, { type: i0.ElementRef }, { type: i0.NgZone }]; }, { poppyTooltip: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvZm9sdGkvUHJvamVjdHMvbmctcG9wcHkvcHJvamVjdHMvbGliL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9wb3BvdmVyL2RpcmVjdGl2ZXMvdG9vbHRpcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFFVCxLQUFLLEdBSU4sTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7OztBQU92RCxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsZ0JBQWdCO0lBTXBELFlBQ3FCLHdCQUFrRCxFQUNsRCxjQUE4QixFQUNqQyxXQUF1QixFQUNwQixNQUFjO1FBRWpDLEtBQUssQ0FBQyx3QkFBd0IsRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBTGxELDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQ2pDLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3BCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFQbkMsWUFBTyxHQUFtQixPQUFPLENBQUM7UUFDbEMsU0FBSSxHQUFnQixTQUFTLENBQUM7SUFTOUIsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDeEMsQ0FBQzs7Z0ZBakJVLGdCQUFnQjtxREFBaEIsZ0JBQWdCO2tEQUFoQixnQkFBZ0I7Y0FINUIsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxnQkFBZ0I7YUFDM0I7c0pBRVUsWUFBWTtrQkFBcEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkluaXQsXG4gIFRlbXBsYXRlUmVmLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUG9wb3ZlckRpcmVjdGl2ZSB9IGZyb20gJy4vcG9wb3Zlci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUG9wb3ZlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9wb3BvdmVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgUG9wb3ZlclRyaWdnZXIsIFBvcG92ZXJUeXBlIH0gZnJvbSAnLi4vcG9wb3Zlci5pbnRlcmZhY2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcG9wcHlUb29sdGlwXScsXG59KVxuZXhwb3J0IGNsYXNzIFRvb2x0aXBEaXJlY3RpdmUgZXh0ZW5kcyBQb3BvdmVyRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgcG9wcHlUb29sdGlwOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gIHRyaWdnZXI6IFBvcG92ZXJUcmlnZ2VyID0gJ2hvdmVyJztcbiAgdHlwZTogUG9wb3ZlclR5cGUgPSAndG9vbHRpcCc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByb3RlY3RlZCByZWFkb25seSBwb3BvdmVyU2VydmljZTogUG9wb3ZlclNlcnZpY2UsXG4gICAgcHVibGljIHJlYWRvbmx5IGhvc3RFbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByb3RlY3RlZCByZWFkb25seSBuZ1pvbmU6IE5nWm9uZVxuICApIHtcbiAgICBzdXBlcihjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHBvcG92ZXJTZXJ2aWNlLCBob3N0RWxlbWVudCwgbmdab25lKTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMucG9wcHlQb3BvdmVyID0gdGhpcy5wb3BweVRvb2x0aXA7XG4gIH1cbn1cbiJdfQ==