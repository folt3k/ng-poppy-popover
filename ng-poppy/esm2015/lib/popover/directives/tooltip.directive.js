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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvZm9sdGkvUHJvamVjdHMvbmctcG9wcHkvcHJvamVjdHMvbmctcG9wcHkvc3JjLyIsInNvdXJjZXMiOlsibGliL3BvcG92ZXIvZGlyZWN0aXZlcy90b29sdGlwLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBRUwsU0FBUyxFQUVULEtBQUssR0FJTixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7O0FBT3ZELE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxnQkFBZ0I7SUFNcEQsWUFDcUIsd0JBQWtELEVBQ2xELGNBQThCLEVBQ2pDLFdBQXVCLEVBQ3BCLE1BQWM7UUFFakMsS0FBSyxDQUFDLHdCQUF3QixFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFMbEQsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDakMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDcEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQVBuQyxZQUFPLEdBQW1CLE9BQU8sQ0FBQztRQUNsQyxTQUFJLEdBQWdCLFNBQVMsQ0FBQztJQVM5QixDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUN4QyxDQUFDOztnRkFqQlUsZ0JBQWdCO3FEQUFoQixnQkFBZ0I7a0RBQWhCLGdCQUFnQjtjQUg1QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjthQUMzQjtzSkFFVSxZQUFZO2tCQUFwQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uSW5pdCxcbiAgVGVtcGxhdGVSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQb3BvdmVyRGlyZWN0aXZlIH0gZnJvbSAnLi9wb3BvdmVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBQb3BvdmVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3BvcG92ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBQb3BvdmVyVHJpZ2dlciwgUG9wb3ZlclR5cGUgfSBmcm9tICcuLi9wb3BvdmVyLmludGVyZmFjZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1twb3BweVRvb2x0aXBdJyxcbn0pXG5leHBvcnQgY2xhc3MgVG9vbHRpcERpcmVjdGl2ZSBleHRlbmRzIFBvcG92ZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBwb3BweVRvb2x0aXA6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgdHJpZ2dlcjogUG9wb3ZlclRyaWdnZXIgPSAnaG92ZXInO1xuICB0eXBlOiBQb3BvdmVyVHlwZSA9ICd0b29sdGlwJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IHBvcG92ZXJTZXJ2aWNlOiBQb3BvdmVyU2VydmljZSxcbiAgICBwdWJsaWMgcmVhZG9ubHkgaG9zdEVsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IG5nWm9uZTogTmdab25lXG4gICkge1xuICAgIHN1cGVyKGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgcG9wb3ZlclNlcnZpY2UsIGhvc3RFbGVtZW50LCBuZ1pvbmUpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5wb3BweVBvcG92ZXIgPSB0aGlzLnBvcHB5VG9vbHRpcDtcbiAgfVxufVxuIl19