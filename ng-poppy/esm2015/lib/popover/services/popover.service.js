import { Injectable } from '@angular/core';
import { PopoverContentComponent } from '../components/popover-content/popover-content.component';
import { ActivePopover } from '../models/popover-active.model';
import { LayerAppendOptions } from '../../layer/layer.model';
import * as i0 from "@angular/core";
import * as i1 from "../../layer/layer.service";
import * as i2 from "./events.service";
export class PopoverService {
    constructor(layerService, eventsService) {
        this.layerService = layerService;
        this.eventsService = eventsService;
        this.activePopovers = [];
    }
    append(injector, directive, options, parentPopoverRef) {
        const existedPopover = this.activePopovers.find((popover) => popover.directiveRef === directive);
        if (options.closeOnTriggerAgain && existedPopover) {
            this.remove(existedPopover.popoverRef);
            return existedPopover.popoverRef;
        }
        else {
            return this.appendToBody(injector, directive, options, parentPopoverRef);
        }
    }
    remove(popoverRef) {
        const active = this.activePopovers.find((p) => p.popoverRef === popoverRef);
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
    removeByNativeElementRef(element) {
        const activePopover = this.activePopovers.find((active) => active.popoverRef.location.nativeElement === element);
        if (activePopover) {
            this.remove(activePopover.popoverRef);
        }
    }
    getActive(popoverRef) {
        return this.activePopovers.find((active) => active.popoverRef === popoverRef);
    }
    isPopoverSubmenuExits(precendingRef, parentRef) {
        const precendingActivePopover = this.getActive(precendingRef);
        if (!precendingActivePopover || (precendingActivePopover && !precendingActivePopover.deepLevel)) {
            return false;
        }
        return !!this.activePopovers.find((popover) => popover.parentPopoverRef === parentRef && popover.deepLevel === precendingActivePopover.deepLevel + 1);
    }
    removeAllNestedPopovers(popoverRef) {
        const activePopover = this.getActive(popoverRef);
        if (activePopover) {
            this.activePopovers
                .filter((popover) => popover.deepLevel > activePopover.deepLevel)
                .forEach((popover) => {
                this.remove(popover.popoverRef);
            });
        }
    }
    removeMenu(componentRef) {
        this.activePopovers
            .filter((popover) => popover.parentPopoverRef === componentRef || popover.popoverRef === componentRef)
            .forEach((popover) => {
            this.remove(popover.popoverRef);
        });
    }
    subscribeToClickOutsideEventForParentPopover(componentRef) {
        const currentPopover = this.getActive(componentRef);
        if (currentPopover) {
            const parentPopover = this.activePopovers.find((popover) => popover.superParentPopoverRef === currentPopover.superParentPopoverRef &&
                popover.deepLevel === currentPopover.deepLevel - 1);
            if (parentPopover) {
                setTimeout(() => {
                    this.eventsService.subscribe('click-outside', parentPopover);
                });
            }
        }
    }
    appendToBody(injector, directive, options, parentPopoverRef) {
        const layerOptions = new LayerAppendOptions({ delayClose: options.delayClose });
        const popover = this.layerService.appendToBody(PopoverContentComponent, layerOptions, injector);
        const { superparent, deepLevel } = this.prepareSuperparentAndDeepLevel(popover, parentPopoverRef, directive);
        const newPopover = new ActivePopover(popover, parentPopoverRef, superparent, directive, options.type, deepLevel);
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
    prepareSuperparentAndDeepLevel(popover, parentPopover, directive) {
        let deepLevel = 0;
        let superparent = null;
        if (directive) {
            const parentPopover = this.activePopovers.find((p) => {
                return p.popoverRef.instance.element.nativeElement.contains(directive.hostElement.nativeElement);
            });
            if (!parentPopover) {
                superparent = popover;
                deepLevel = 0;
            }
            else {
                superparent = parentPopover.superParentPopoverRef || parentPopover.popoverRef;
                deepLevel = parentPopover.deepLevel + 1;
            }
        }
        else {
            const closestParent = this.activePopovers.find((p) => p.popoverRef === parentPopover);
            if (closestParent) {
                const popoverGroup = this.activePopovers.filter((p) => p.superParentPopoverRef === closestParent.superParentPopoverRef);
                superparent = closestParent.superParentPopoverRef;
                deepLevel = popoverGroup[popoverGroup.length - 1].deepLevel + 1;
            }
        }
        return {
            deepLevel,
            superparent,
        };
    }
    canRegisterScrollCaptureEvent(popover, options) {
        const { triggeredBy, type, closeOnScroll } = options;
        return (popover.directiveRef &&
            popover.deepLevel === 0 &&
            triggeredBy !== 'hover' &&
            type !== 'submenu' &&
            closeOnScroll);
    }
    canRegisterResizeEvent(popover, options) {
        const { triggeredBy, type } = options;
        return popover.directiveRef && popover.deepLevel === 0 && triggeredBy !== 'hover' && type !== 'submenu';
    }
    registerResizeEvent(popover, options) {
        this.eventsService.register('resize', popover, () => {
            if (options.type === 'context') {
                this.hideGroup(popover);
            }
            else {
                this.updateGroupPosition(popover);
            }
        });
    }
    registerScrollCaptureEvent(popover, options) {
        this.eventsService.register('capture-scroll', popover, (event) => {
            const captured = popover.directiveRef.hostElement.nativeElement === event.target ||
                event.target.contains(popover.directiveRef.hostElement.nativeElement);
            if ((captured && options.hideOnScroll) || options.type === 'context') {
                this.hideGroup(popover);
            }
            if (captured && !options.hideOnScroll && options.type !== 'context') {
                this.updateGroupPosition(popover);
            }
        });
    }
    hideGroup(popover) {
        this.activePopovers.forEach((active) => {
            if (active.superParentPopoverRef === popover.superParentPopoverRef) {
                this.remove(active.popoverRef);
            }
        });
    }
    updateGroupPosition(popover) {
        this.activePopovers
            .filter((active) => active.superParentPopoverRef === popover.popoverRef)
            .forEach((active) => {
            if (active.popoverRef.instance.componentStyles) {
                active.popoverRef.instance.componentStyles.update();
            }
        });
    }
}
PopoverService.ɵfac = function PopoverService_Factory(t) { return new (t || PopoverService)(i0.ɵɵinject(i1.LayerService), i0.ɵɵinject(i2.PopoverEventsService)); };
PopoverService.ɵprov = i0.ɵɵdefineInjectable({ token: PopoverService, factory: PopoverService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(PopoverService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: i1.LayerService }, { type: i2.PopoverEventsService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2ZvbHRpL1Byb2plY3RzL25nLXBvcHB5L3Byb2plY3RzL25nLXBvcHB5L3NyYy8iLCJzb3VyY2VzIjpbImxpYi9wb3BvdmVyL3NlcnZpY2VzL3BvcG92ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWdCLFVBQVUsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUVuRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSx5REFBeUQsQ0FBQztBQUdsRyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFL0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7QUFNN0QsTUFBTSxPQUFPLGNBQWM7SUFHekIsWUFBb0IsWUFBMEIsRUFBVSxhQUFtQztRQUF2RSxpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFzQjtRQUYzRixtQkFBYyxHQUFvQixFQUFFLENBQUM7SUFFeUQsQ0FBQztJQUUvRixNQUFNLENBQ0osUUFBa0IsRUFDbEIsU0FBK0IsRUFDL0IsT0FBNkIsRUFDN0IsZ0JBQXdEO1FBRXhELE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsWUFBWSxLQUFLLFNBQVMsQ0FBQyxDQUFDO1FBRWpHLElBQUksT0FBTyxDQUFDLG1CQUFtQixJQUFJLGNBQWMsRUFBRTtZQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN2QyxPQUFPLGNBQWMsQ0FBQyxVQUFVLENBQUM7U0FDbEM7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1NBQzFFO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFpRDtRQUN0RCxNQUFNLE1BQU0sR0FBa0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLEtBQUssVUFBVSxDQUFDLENBQUM7UUFFM0YsSUFBSSxNQUFNLEVBQUU7WUFDVixJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUU7Z0JBQ3ZCLE1BQU0sQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO2dCQUMvQyxNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUN2QztZQUNELE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFaEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsS0FBSyxVQUFVLENBQUMsQ0FBQztTQUN0RjtJQUNILENBQUM7SUFFRCx3QkFBd0IsQ0FBQyxPQUFvQjtRQUMzQyxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDNUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLGFBQWEsS0FBSyxPQUFPLENBQ2pFLENBQUM7UUFFRixJQUFJLGFBQWEsRUFBRTtZQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN2QztJQUNILENBQUM7SUFFRCxTQUFTLENBQUMsVUFBaUQ7UUFDekQsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsS0FBSyxVQUFVLENBQUMsQ0FBQztJQUNoRixDQUFDO0lBRUQscUJBQXFCLENBQ25CLGFBQW9ELEVBQ3BELFNBQWdEO1FBRWhELE1BQU0sdUJBQXVCLEdBQWtCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFN0UsSUFBSSxDQUFDLHVCQUF1QixJQUFJLENBQUMsdUJBQXVCLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUMvRixPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQy9CLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FDVixPQUFPLENBQUMsZ0JBQWdCLEtBQUssU0FBUyxJQUFJLE9BQU8sQ0FBQyxTQUFTLEtBQUssdUJBQXVCLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FDeEcsQ0FBQztJQUNKLENBQUM7SUFFRCx1QkFBdUIsQ0FBQyxVQUFpRDtRQUN2RSxNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRWpELElBQUksYUFBYSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxjQUFjO2lCQUNoQixNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQztpQkFDaEUsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDSCxDQUFDO0lBRUQsVUFBVSxDQUFDLFlBQW1EO1FBQzVELElBQUksQ0FBQyxjQUFjO2FBQ2hCLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLGdCQUFnQixLQUFLLFlBQVksSUFBSSxPQUFPLENBQUMsVUFBVSxLQUFLLFlBQVksQ0FBQzthQUNyRyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUNuQixJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw0Q0FBNEMsQ0FBQyxZQUFtRDtRQUM5RixNQUFNLGNBQWMsR0FBa0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUVuRSxJQUFJLGNBQWMsRUFBRTtZQUNsQixNQUFNLGFBQWEsR0FBa0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQzNELENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FDVixPQUFPLENBQUMscUJBQXFCLEtBQUssY0FBYyxDQUFDLHFCQUFxQjtnQkFDdEUsT0FBTyxDQUFDLFNBQVMsS0FBSyxjQUFjLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FDckQsQ0FBQztZQUVGLElBQUksYUFBYSxFQUFFO2dCQUNqQixVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNkLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxhQUFhLENBQUMsQ0FBQztnQkFDL0QsQ0FBQyxDQUFDLENBQUM7YUFDSjtTQUNGO0lBQ0gsQ0FBQztJQUVPLFlBQVksQ0FDbEIsUUFBa0IsRUFDbEIsU0FBK0IsRUFDL0IsT0FBNkIsRUFDN0IsZ0JBQXdEO1FBRXhELE1BQU0sWUFBWSxHQUFHLElBQUksa0JBQWtCLENBQUMsRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDaEYsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsdUJBQXVCLEVBQUUsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ2hHLE1BQU0sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLDhCQUE4QixDQUNwRSxPQUFPLEVBQ1AsZ0JBQWdCLEVBQ2hCLFNBQVMsQ0FDVixDQUFDO1FBQ0YsTUFBTSxVQUFVLEdBQUcsSUFBSSxhQUFhLENBQ2xDLE9BQU8sRUFDUCxnQkFBZ0IsRUFDaEIsV0FBVyxFQUNYLFNBQVMsRUFDVCxPQUFPLENBQUMsSUFBSSxFQUNaLFNBQVMsQ0FDVixDQUFDO1FBRUYsT0FBTyxDQUFDLFFBQVEsQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO1FBQ3hDLE9BQU8sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDO1FBQzVDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUUxQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVyQyxJQUFJLFVBQVUsQ0FBQyxZQUFZLEVBQUU7WUFDM0IsVUFBVSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDMUM7UUFFRCxJQUFJLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLEVBQUU7WUFDM0QsSUFBSSxDQUFDLDBCQUEwQixDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUN0RDtRQUVELElBQUksSUFBSSxDQUFDLHNCQUFzQixDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsRUFBRTtZQUNwRCxJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQy9DO1FBRUQsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVPLDhCQUE4QixDQUNwQyxPQUE4QyxFQUM5QyxhQUFvRCxFQUNwRCxTQUErQjtRQUUvQixJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7UUFDbEIsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBRXZCLElBQUksU0FBUyxFQUFFO1lBQ2IsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDbkQsT0FBTyxDQUFDLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ25HLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDbEIsV0FBVyxHQUFHLE9BQU8sQ0FBQztnQkFDdEIsU0FBUyxHQUFHLENBQUMsQ0FBQzthQUNmO2lCQUFNO2dCQUNMLFdBQVcsR0FBRyxhQUFhLENBQUMscUJBQXFCLElBQUksYUFBYSxDQUFDLFVBQVUsQ0FBQztnQkFDOUUsU0FBUyxHQUFHLGFBQWEsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO2FBQ3pDO1NBQ0Y7YUFBTTtZQUNMLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxLQUFLLGFBQWEsQ0FBQyxDQUFDO1lBQ3RGLElBQUksYUFBYSxFQUFFO2dCQUNqQixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FDN0MsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsS0FBSyxhQUFhLENBQUMscUJBQXFCLENBQ3ZFLENBQUM7Z0JBQ0YsV0FBVyxHQUFHLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQztnQkFDbEQsU0FBUyxHQUFHLFlBQVksQ0FBQyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7YUFDakU7U0FDRjtRQUVELE9BQU87WUFDTCxTQUFTO1lBQ1QsV0FBVztTQUNaLENBQUM7SUFDSixDQUFDO0lBRU8sNkJBQTZCLENBQUMsT0FBc0IsRUFBRSxPQUE2QjtRQUN6RixNQUFNLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsR0FBRyxPQUFPLENBQUM7UUFFckQsT0FBTyxDQUNMLE9BQU8sQ0FBQyxZQUFZO1lBQ3BCLE9BQU8sQ0FBQyxTQUFTLEtBQUssQ0FBQztZQUN2QixXQUFXLEtBQUssT0FBTztZQUN2QixJQUFJLEtBQUssU0FBUztZQUNsQixhQUFhLENBQ2QsQ0FBQztJQUNKLENBQUM7SUFFTyxzQkFBc0IsQ0FBQyxPQUFzQixFQUFFLE9BQTZCO1FBQ2xGLE1BQU0sRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBRXRDLE9BQU8sT0FBTyxDQUFDLFlBQVksSUFBSSxPQUFPLENBQUMsU0FBUyxLQUFLLENBQUMsSUFBSSxXQUFXLEtBQUssT0FBTyxJQUFJLElBQUksS0FBSyxTQUFTLENBQUM7SUFDMUcsQ0FBQztJQUVPLG1CQUFtQixDQUFDLE9BQXNCLEVBQUUsT0FBNkI7UUFDL0UsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDbEQsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtnQkFDOUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN6QjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDbkM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTywwQkFBMEIsQ0FBQyxPQUFzQixFQUFFLE9BQTZCO1FBQ3RGLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLE9BQU8sRUFBRSxDQUFDLEtBQWlCLEVBQUUsRUFBRTtZQUMzRSxNQUFNLFFBQVEsR0FDWixPQUFPLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEtBQUssS0FBSyxDQUFDLE1BQU07Z0JBQzlELEtBQUssQ0FBQyxNQUFzQixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUV6RixJQUFJLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtnQkFDcEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN6QjtZQUVELElBQUksUUFBUSxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtnQkFDbkUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ25DO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sU0FBUyxDQUFDLE9BQXNCO1FBQ3RDLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDckMsSUFBSSxNQUFNLENBQUMscUJBQXFCLEtBQUssT0FBTyxDQUFDLHFCQUFxQixFQUFFO2dCQUNsRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNoQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLG1CQUFtQixDQUFDLE9BQXNCO1FBQ2hELElBQUksQ0FBQyxjQUFjO2FBQ2hCLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLHFCQUFxQixLQUFLLE9BQU8sQ0FBQyxVQUFVLENBQUM7YUFDdkUsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDbEIsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUU7Z0JBQzlDLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNyRDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7NEVBdlBVLGNBQWM7c0RBQWQsY0FBYyxXQUFkLGNBQWMsbUJBRmIsTUFBTTtrREFFUCxjQUFjO2NBSDFCLFVBQVU7ZUFBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudFJlZiwgSW5qZWN0YWJsZSwgSW5qZWN0b3IgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgUG9wb3ZlckNvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL3BvcG92ZXItY29udGVudC9wb3BvdmVyLWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IExheWVyU2VydmljZSB9IGZyb20gJy4uLy4uL2xheWVyL2xheWVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgUG9wb3ZlckFwcGVuZE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvcG9wb3Zlci1hcHBlbmQtb3B0aW9ucy5tb2RlbCc7XG5pbXBvcnQgeyBBY3RpdmVQb3BvdmVyIH0gZnJvbSAnLi4vbW9kZWxzL3BvcG92ZXItYWN0aXZlLm1vZGVsJztcbmltcG9ydCB7IEJhc2VQb3BvdmVyRGlyZWN0aXZlIH0gZnJvbSAnLi4vZGlyZWN0aXZlcy9iYXNlLXBvcG92ZXInO1xuaW1wb3J0IHsgTGF5ZXJBcHBlbmRPcHRpb25zIH0gZnJvbSAnLi4vLi4vbGF5ZXIvbGF5ZXIubW9kZWwnO1xuaW1wb3J0IHsgUG9wb3ZlckV2ZW50c1NlcnZpY2UgfSBmcm9tICcuL2V2ZW50cy5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFBvcG92ZXJTZXJ2aWNlIHtcbiAgYWN0aXZlUG9wb3ZlcnM6IEFjdGl2ZVBvcG92ZXJbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbGF5ZXJTZXJ2aWNlOiBMYXllclNlcnZpY2UsIHByaXZhdGUgZXZlbnRzU2VydmljZTogUG9wb3ZlckV2ZW50c1NlcnZpY2UpIHt9XG5cbiAgYXBwZW5kKFxuICAgIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBkaXJlY3RpdmU6IEJhc2VQb3BvdmVyRGlyZWN0aXZlLFxuICAgIG9wdGlvbnM6IFBvcG92ZXJBcHBlbmRPcHRpb25zLFxuICAgIHBhcmVudFBvcG92ZXJSZWY/OiBDb21wb25lbnRSZWY8UG9wb3ZlckNvbnRlbnRDb21wb25lbnQ+XG4gICk6IENvbXBvbmVudFJlZjxQb3BvdmVyQ29udGVudENvbXBvbmVudD4ge1xuICAgIGNvbnN0IGV4aXN0ZWRQb3BvdmVyID0gdGhpcy5hY3RpdmVQb3BvdmVycy5maW5kKChwb3BvdmVyKSA9PiBwb3BvdmVyLmRpcmVjdGl2ZVJlZiA9PT0gZGlyZWN0aXZlKTtcblxuICAgIGlmIChvcHRpb25zLmNsb3NlT25UcmlnZ2VyQWdhaW4gJiYgZXhpc3RlZFBvcG92ZXIpIHtcbiAgICAgIHRoaXMucmVtb3ZlKGV4aXN0ZWRQb3BvdmVyLnBvcG92ZXJSZWYpO1xuICAgICAgcmV0dXJuIGV4aXN0ZWRQb3BvdmVyLnBvcG92ZXJSZWY7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmFwcGVuZFRvQm9keShpbmplY3RvciwgZGlyZWN0aXZlLCBvcHRpb25zLCBwYXJlbnRQb3BvdmVyUmVmKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmUocG9wb3ZlclJlZjogQ29tcG9uZW50UmVmPFBvcG92ZXJDb250ZW50Q29tcG9uZW50Pik6IHZvaWQge1xuICAgIGNvbnN0IGFjdGl2ZTogQWN0aXZlUG9wb3ZlciA9IHRoaXMuYWN0aXZlUG9wb3ZlcnMuZmluZCgocCkgPT4gcC5wb3BvdmVyUmVmID09PSBwb3BvdmVyUmVmKTtcblxuICAgIGlmIChhY3RpdmUpIHtcbiAgICAgIGlmIChhY3RpdmUuZGlyZWN0aXZlUmVmKSB7XG4gICAgICAgIGFjdGl2ZS5kaXJlY3RpdmVSZWYucG9wb3ZlckNvbXBvbmVudFJlZiA9IG51bGw7XG4gICAgICAgIGFjdGl2ZS5kaXJlY3RpdmVSZWYuYWZ0ZXJDbG9zZS5lbWl0KCk7XG4gICAgICB9XG4gICAgICBhY3RpdmUucG9wb3ZlclJlZi5kZXN0cm95KCk7XG4gICAgICB0aGlzLmxheWVyU2VydmljZS5yZW1vdmVGcm9tQm9keShhY3RpdmUucG9wb3ZlclJlZik7XG4gICAgICB0aGlzLmV2ZW50c1NlcnZpY2UudW5yZWdpc3RlcignY2xpY2stb3V0c2lkZScsIGFjdGl2ZSk7XG4gICAgICB0aGlzLmV2ZW50c1NlcnZpY2UudW5yZWdpc3RlcignY2FwdHVyZS1zY3JvbGwnLCBhY3RpdmUpO1xuICAgICAgdGhpcy5ldmVudHNTZXJ2aWNlLnVucmVnaXN0ZXIoJ3Jlc2l6ZScsIGFjdGl2ZSk7XG5cbiAgICAgIHRoaXMuYWN0aXZlUG9wb3ZlcnMgPSB0aGlzLmFjdGl2ZVBvcG92ZXJzLmZpbHRlcigoYSkgPT4gYS5wb3BvdmVyUmVmICE9PSBwb3BvdmVyUmVmKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVCeU5hdGl2ZUVsZW1lbnRSZWYoZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICBjb25zdCBhY3RpdmVQb3BvdmVyID0gdGhpcy5hY3RpdmVQb3BvdmVycy5maW5kKFxuICAgICAgKGFjdGl2ZSkgPT4gYWN0aXZlLnBvcG92ZXJSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCA9PT0gZWxlbWVudFxuICAgICk7XG5cbiAgICBpZiAoYWN0aXZlUG9wb3Zlcikge1xuICAgICAgdGhpcy5yZW1vdmUoYWN0aXZlUG9wb3Zlci5wb3BvdmVyUmVmKTtcbiAgICB9XG4gIH1cblxuICBnZXRBY3RpdmUocG9wb3ZlclJlZjogQ29tcG9uZW50UmVmPFBvcG92ZXJDb250ZW50Q29tcG9uZW50Pik6IEFjdGl2ZVBvcG92ZXIge1xuICAgIHJldHVybiB0aGlzLmFjdGl2ZVBvcG92ZXJzLmZpbmQoKGFjdGl2ZSkgPT4gYWN0aXZlLnBvcG92ZXJSZWYgPT09IHBvcG92ZXJSZWYpO1xuICB9XG5cbiAgaXNQb3BvdmVyU3VibWVudUV4aXRzKFxuICAgIHByZWNlbmRpbmdSZWY6IENvbXBvbmVudFJlZjxQb3BvdmVyQ29udGVudENvbXBvbmVudD4sXG4gICAgcGFyZW50UmVmOiBDb21wb25lbnRSZWY8UG9wb3ZlckNvbnRlbnRDb21wb25lbnQ+XG4gICk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHByZWNlbmRpbmdBY3RpdmVQb3BvdmVyOiBBY3RpdmVQb3BvdmVyID0gdGhpcy5nZXRBY3RpdmUocHJlY2VuZGluZ1JlZik7XG5cbiAgICBpZiAoIXByZWNlbmRpbmdBY3RpdmVQb3BvdmVyIHx8IChwcmVjZW5kaW5nQWN0aXZlUG9wb3ZlciAmJiAhcHJlY2VuZGluZ0FjdGl2ZVBvcG92ZXIuZGVlcExldmVsKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAhIXRoaXMuYWN0aXZlUG9wb3ZlcnMuZmluZChcbiAgICAgIChwb3BvdmVyKSA9PlxuICAgICAgICBwb3BvdmVyLnBhcmVudFBvcG92ZXJSZWYgPT09IHBhcmVudFJlZiAmJiBwb3BvdmVyLmRlZXBMZXZlbCA9PT0gcHJlY2VuZGluZ0FjdGl2ZVBvcG92ZXIuZGVlcExldmVsICsgMVxuICAgICk7XG4gIH1cblxuICByZW1vdmVBbGxOZXN0ZWRQb3BvdmVycyhwb3BvdmVyUmVmOiBDb21wb25lbnRSZWY8UG9wb3ZlckNvbnRlbnRDb21wb25lbnQ+KTogdm9pZCB7XG4gICAgY29uc3QgYWN0aXZlUG9wb3ZlciA9IHRoaXMuZ2V0QWN0aXZlKHBvcG92ZXJSZWYpO1xuXG4gICAgaWYgKGFjdGl2ZVBvcG92ZXIpIHtcbiAgICAgIHRoaXMuYWN0aXZlUG9wb3ZlcnNcbiAgICAgICAgLmZpbHRlcigocG9wb3ZlcikgPT4gcG9wb3Zlci5kZWVwTGV2ZWwgPiBhY3RpdmVQb3BvdmVyLmRlZXBMZXZlbClcbiAgICAgICAgLmZvckVhY2goKHBvcG92ZXIpID0+IHtcbiAgICAgICAgICB0aGlzLnJlbW92ZShwb3BvdmVyLnBvcG92ZXJSZWYpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVNZW51KGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPFBvcG92ZXJDb250ZW50Q29tcG9uZW50Pik6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZlUG9wb3ZlcnNcbiAgICAgIC5maWx0ZXIoKHBvcG92ZXIpID0+IHBvcG92ZXIucGFyZW50UG9wb3ZlclJlZiA9PT0gY29tcG9uZW50UmVmIHx8IHBvcG92ZXIucG9wb3ZlclJlZiA9PT0gY29tcG9uZW50UmVmKVxuICAgICAgLmZvckVhY2goKHBvcG92ZXIpID0+IHtcbiAgICAgICAgdGhpcy5yZW1vdmUocG9wb3Zlci5wb3BvdmVyUmVmKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgc3Vic2NyaWJlVG9DbGlja091dHNpZGVFdmVudEZvclBhcmVudFBvcG92ZXIoY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8UG9wb3ZlckNvbnRlbnRDb21wb25lbnQ+KTogdm9pZCB7XG4gICAgY29uc3QgY3VycmVudFBvcG92ZXI6IEFjdGl2ZVBvcG92ZXIgPSB0aGlzLmdldEFjdGl2ZShjb21wb25lbnRSZWYpO1xuXG4gICAgaWYgKGN1cnJlbnRQb3BvdmVyKSB7XG4gICAgICBjb25zdCBwYXJlbnRQb3BvdmVyOiBBY3RpdmVQb3BvdmVyID0gdGhpcy5hY3RpdmVQb3BvdmVycy5maW5kKFxuICAgICAgICAocG9wb3ZlcikgPT5cbiAgICAgICAgICBwb3BvdmVyLnN1cGVyUGFyZW50UG9wb3ZlclJlZiA9PT0gY3VycmVudFBvcG92ZXIuc3VwZXJQYXJlbnRQb3BvdmVyUmVmICYmXG4gICAgICAgICAgcG9wb3Zlci5kZWVwTGV2ZWwgPT09IGN1cnJlbnRQb3BvdmVyLmRlZXBMZXZlbCAtIDFcbiAgICAgICk7XG5cbiAgICAgIGlmIChwYXJlbnRQb3BvdmVyKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuZXZlbnRzU2VydmljZS5zdWJzY3JpYmUoJ2NsaWNrLW91dHNpZGUnLCBwYXJlbnRQb3BvdmVyKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhcHBlbmRUb0JvZHkoXG4gICAgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIGRpcmVjdGl2ZTogQmFzZVBvcG92ZXJEaXJlY3RpdmUsXG4gICAgb3B0aW9uczogUG9wb3ZlckFwcGVuZE9wdGlvbnMsXG4gICAgcGFyZW50UG9wb3ZlclJlZj86IENvbXBvbmVudFJlZjxQb3BvdmVyQ29udGVudENvbXBvbmVudD5cbiAgKTogQ29tcG9uZW50UmVmPFBvcG92ZXJDb250ZW50Q29tcG9uZW50PiB7XG4gICAgY29uc3QgbGF5ZXJPcHRpb25zID0gbmV3IExheWVyQXBwZW5kT3B0aW9ucyh7IGRlbGF5Q2xvc2U6IG9wdGlvbnMuZGVsYXlDbG9zZSB9KTtcbiAgICBjb25zdCBwb3BvdmVyID0gdGhpcy5sYXllclNlcnZpY2UuYXBwZW5kVG9Cb2R5KFBvcG92ZXJDb250ZW50Q29tcG9uZW50LCBsYXllck9wdGlvbnMsIGluamVjdG9yKTtcbiAgICBjb25zdCB7IHN1cGVycGFyZW50LCBkZWVwTGV2ZWwgfSA9IHRoaXMucHJlcGFyZVN1cGVycGFyZW50QW5kRGVlcExldmVsKFxuICAgICAgcG9wb3ZlcixcbiAgICAgIHBhcmVudFBvcG92ZXJSZWYsXG4gICAgICBkaXJlY3RpdmVcbiAgICApO1xuICAgIGNvbnN0IG5ld1BvcG92ZXIgPSBuZXcgQWN0aXZlUG9wb3ZlcihcbiAgICAgIHBvcG92ZXIsXG4gICAgICBwYXJlbnRQb3BvdmVyUmVmLFxuICAgICAgc3VwZXJwYXJlbnQsXG4gICAgICBkaXJlY3RpdmUsXG4gICAgICBvcHRpb25zLnR5cGUsXG4gICAgICBkZWVwTGV2ZWxcbiAgICApO1xuXG4gICAgcG9wb3Zlci5pbnN0YW5jZS5jb21wb25lbnRSZWYgPSBwb3BvdmVyO1xuICAgIHBvcG92ZXIuaW5zdGFuY2UucGFyZW50UG9wb3ZlclJlZiA9IHBvcG92ZXI7XG4gICAgcG9wb3Zlci5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICB0aGlzLmFjdGl2ZVBvcG92ZXJzLnB1c2gobmV3UG9wb3Zlcik7XG5cbiAgICBpZiAobmV3UG9wb3Zlci5kaXJlY3RpdmVSZWYpIHtcbiAgICAgIG5ld1BvcG92ZXIuZGlyZWN0aXZlUmVmLmFmdGVyU2hvdy5lbWl0KCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY2FuUmVnaXN0ZXJTY3JvbGxDYXB0dXJlRXZlbnQobmV3UG9wb3Zlciwgb3B0aW9ucykpIHtcbiAgICAgIHRoaXMucmVnaXN0ZXJTY3JvbGxDYXB0dXJlRXZlbnQobmV3UG9wb3Zlciwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY2FuUmVnaXN0ZXJSZXNpemVFdmVudChuZXdQb3BvdmVyLCBvcHRpb25zKSkge1xuICAgICAgdGhpcy5yZWdpc3RlclJlc2l6ZUV2ZW50KG5ld1BvcG92ZXIsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiBwb3BvdmVyO1xuICB9XG5cbiAgcHJpdmF0ZSBwcmVwYXJlU3VwZXJwYXJlbnRBbmREZWVwTGV2ZWwoXG4gICAgcG9wb3ZlcjogQ29tcG9uZW50UmVmPFBvcG92ZXJDb250ZW50Q29tcG9uZW50PixcbiAgICBwYXJlbnRQb3BvdmVyOiBDb21wb25lbnRSZWY8UG9wb3ZlckNvbnRlbnRDb21wb25lbnQ+LFxuICAgIGRpcmVjdGl2ZTogQmFzZVBvcG92ZXJEaXJlY3RpdmVcbiAgKTogeyBkZWVwTGV2ZWw6IG51bWJlcjsgc3VwZXJwYXJlbnQ6IENvbXBvbmVudFJlZjxQb3BvdmVyQ29udGVudENvbXBvbmVudD4gfSB7XG4gICAgbGV0IGRlZXBMZXZlbCA9IDA7XG4gICAgbGV0IHN1cGVycGFyZW50ID0gbnVsbDtcblxuICAgIGlmIChkaXJlY3RpdmUpIHtcbiAgICAgIGNvbnN0IHBhcmVudFBvcG92ZXIgPSB0aGlzLmFjdGl2ZVBvcG92ZXJzLmZpbmQoKHApID0+IHtcbiAgICAgICAgcmV0dXJuIHAucG9wb3ZlclJlZi5pbnN0YW5jZS5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZGlyZWN0aXZlLmhvc3RFbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmICghcGFyZW50UG9wb3Zlcikge1xuICAgICAgICBzdXBlcnBhcmVudCA9IHBvcG92ZXI7XG4gICAgICAgIGRlZXBMZXZlbCA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdXBlcnBhcmVudCA9IHBhcmVudFBvcG92ZXIuc3VwZXJQYXJlbnRQb3BvdmVyUmVmIHx8IHBhcmVudFBvcG92ZXIucG9wb3ZlclJlZjtcbiAgICAgICAgZGVlcExldmVsID0gcGFyZW50UG9wb3Zlci5kZWVwTGV2ZWwgKyAxO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjbG9zZXN0UGFyZW50ID0gdGhpcy5hY3RpdmVQb3BvdmVycy5maW5kKChwKSA9PiBwLnBvcG92ZXJSZWYgPT09IHBhcmVudFBvcG92ZXIpO1xuICAgICAgaWYgKGNsb3Nlc3RQYXJlbnQpIHtcbiAgICAgICAgY29uc3QgcG9wb3Zlckdyb3VwID0gdGhpcy5hY3RpdmVQb3BvdmVycy5maWx0ZXIoXG4gICAgICAgICAgKHApID0+IHAuc3VwZXJQYXJlbnRQb3BvdmVyUmVmID09PSBjbG9zZXN0UGFyZW50LnN1cGVyUGFyZW50UG9wb3ZlclJlZlxuICAgICAgICApO1xuICAgICAgICBzdXBlcnBhcmVudCA9IGNsb3Nlc3RQYXJlbnQuc3VwZXJQYXJlbnRQb3BvdmVyUmVmO1xuICAgICAgICBkZWVwTGV2ZWwgPSBwb3BvdmVyR3JvdXBbcG9wb3Zlckdyb3VwLmxlbmd0aCAtIDFdLmRlZXBMZXZlbCArIDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGRlZXBMZXZlbCxcbiAgICAgIHN1cGVycGFyZW50LFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGNhblJlZ2lzdGVyU2Nyb2xsQ2FwdHVyZUV2ZW50KHBvcG92ZXI6IEFjdGl2ZVBvcG92ZXIsIG9wdGlvbnM6IFBvcG92ZXJBcHBlbmRPcHRpb25zKTogYm9vbGVhbiB7XG4gICAgY29uc3QgeyB0cmlnZ2VyZWRCeSwgdHlwZSwgY2xvc2VPblNjcm9sbCB9ID0gb3B0aW9ucztcblxuICAgIHJldHVybiAoXG4gICAgICBwb3BvdmVyLmRpcmVjdGl2ZVJlZiAmJlxuICAgICAgcG9wb3Zlci5kZWVwTGV2ZWwgPT09IDAgJiZcbiAgICAgIHRyaWdnZXJlZEJ5ICE9PSAnaG92ZXInICYmXG4gICAgICB0eXBlICE9PSAnc3VibWVudScgJiZcbiAgICAgIGNsb3NlT25TY3JvbGxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBjYW5SZWdpc3RlclJlc2l6ZUV2ZW50KHBvcG92ZXI6IEFjdGl2ZVBvcG92ZXIsIG9wdGlvbnM6IFBvcG92ZXJBcHBlbmRPcHRpb25zKTogYm9vbGVhbiB7XG4gICAgY29uc3QgeyB0cmlnZ2VyZWRCeSwgdHlwZSB9ID0gb3B0aW9ucztcblxuICAgIHJldHVybiBwb3BvdmVyLmRpcmVjdGl2ZVJlZiAmJiBwb3BvdmVyLmRlZXBMZXZlbCA9PT0gMCAmJiB0cmlnZ2VyZWRCeSAhPT0gJ2hvdmVyJyAmJiB0eXBlICE9PSAnc3VibWVudSc7XG4gIH1cblxuICBwcml2YXRlIHJlZ2lzdGVyUmVzaXplRXZlbnQocG9wb3ZlcjogQWN0aXZlUG9wb3Zlciwgb3B0aW9uczogUG9wb3ZlckFwcGVuZE9wdGlvbnMpOiB2b2lkIHtcbiAgICB0aGlzLmV2ZW50c1NlcnZpY2UucmVnaXN0ZXIoJ3Jlc2l6ZScsIHBvcG92ZXIsICgpID0+IHtcbiAgICAgIGlmIChvcHRpb25zLnR5cGUgPT09ICdjb250ZXh0Jykge1xuICAgICAgICB0aGlzLmhpZGVHcm91cChwb3BvdmVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudXBkYXRlR3JvdXBQb3NpdGlvbihwb3BvdmVyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVnaXN0ZXJTY3JvbGxDYXB0dXJlRXZlbnQocG9wb3ZlcjogQWN0aXZlUG9wb3Zlciwgb3B0aW9uczogUG9wb3ZlckFwcGVuZE9wdGlvbnMpOiB2b2lkIHtcbiAgICB0aGlzLmV2ZW50c1NlcnZpY2UucmVnaXN0ZXIoJ2NhcHR1cmUtc2Nyb2xsJywgcG9wb3ZlciwgKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBjb25zdCBjYXB0dXJlZCA9XG4gICAgICAgIHBvcG92ZXIuZGlyZWN0aXZlUmVmLmhvc3RFbGVtZW50Lm5hdGl2ZUVsZW1lbnQgPT09IGV2ZW50LnRhcmdldCB8fFxuICAgICAgICAoZXZlbnQudGFyZ2V0IGFzIEhUTUxFbGVtZW50KS5jb250YWlucyhwb3BvdmVyLmRpcmVjdGl2ZVJlZi5ob3N0RWxlbWVudC5uYXRpdmVFbGVtZW50KTtcblxuICAgICAgaWYgKChjYXB0dXJlZCAmJiBvcHRpb25zLmhpZGVPblNjcm9sbCkgfHwgb3B0aW9ucy50eXBlID09PSAnY29udGV4dCcpIHtcbiAgICAgICAgdGhpcy5oaWRlR3JvdXAocG9wb3Zlcik7XG4gICAgICB9XG5cbiAgICAgIGlmIChjYXB0dXJlZCAmJiAhb3B0aW9ucy5oaWRlT25TY3JvbGwgJiYgb3B0aW9ucy50eXBlICE9PSAnY29udGV4dCcpIHtcbiAgICAgICAgdGhpcy51cGRhdGVHcm91cFBvc2l0aW9uKHBvcG92ZXIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBoaWRlR3JvdXAocG9wb3ZlcjogQWN0aXZlUG9wb3Zlcik6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZlUG9wb3ZlcnMuZm9yRWFjaCgoYWN0aXZlKSA9PiB7XG4gICAgICBpZiAoYWN0aXZlLnN1cGVyUGFyZW50UG9wb3ZlclJlZiA9PT0gcG9wb3Zlci5zdXBlclBhcmVudFBvcG92ZXJSZWYpIHtcbiAgICAgICAgdGhpcy5yZW1vdmUoYWN0aXZlLnBvcG92ZXJSZWYpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVHcm91cFBvc2l0aW9uKHBvcG92ZXI6IEFjdGl2ZVBvcG92ZXIpOiB2b2lkIHtcbiAgICB0aGlzLmFjdGl2ZVBvcG92ZXJzXG4gICAgICAuZmlsdGVyKChhY3RpdmUpID0+IGFjdGl2ZS5zdXBlclBhcmVudFBvcG92ZXJSZWYgPT09IHBvcG92ZXIucG9wb3ZlclJlZilcbiAgICAgIC5mb3JFYWNoKChhY3RpdmUpID0+IHtcbiAgICAgICAgaWYgKGFjdGl2ZS5wb3BvdmVyUmVmLmluc3RhbmNlLmNvbXBvbmVudFN0eWxlcykge1xuICAgICAgICAgIGFjdGl2ZS5wb3BvdmVyUmVmLmluc3RhbmNlLmNvbXBvbmVudFN0eWxlcy51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cbn1cbiJdfQ==