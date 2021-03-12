import { Directive, Injector, Input, } from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { POPOVER_CONFIG } from '../popover.token';
import { PopoverAppendOptions } from '../models/popover-append-options.model';
import { BasePopoverDirective } from './base-popover';
import * as i0 from "@angular/core";
import * as i1 from "../services/popover.service";
export class PopoverMenuDirective extends BasePopoverDirective {
    constructor(componentFactoryResolver, popoverService, hostElement, ngZone) {
        super(componentFactoryResolver, popoverService, hostElement, ngZone);
        this.componentFactoryResolver = componentFactoryResolver;
        this.popoverService = popoverService;
        this.hostElement = hostElement;
        this.ngZone = ngZone;
        this.type = 'menu';
        this.closeOnClickItem = true;
    }
    ngAfterViewInit() {
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
    open() {
        if (this.canAppend()) {
            this.ngZone.run(() => {
                this.append();
            });
        }
    }
    // NOTE: It should be removed after upgrade to ng 9, because QueryList should emit changes
    // when elements is removed
    updateContentPosition() {
        if (this.popoverComponentRef) {
            this.popoverComponentRef.instance.componentStyles.update();
        }
    }
    getPopoverComponentInjector() {
        const providerValues = {
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
    canAppend() {
        return (!this.popoverComponentRef ||
            (this.popoverComponentRef && this.type === 'context') ||
            (this.popoverComponentRef && this.closeOnTriggerAgain));
    }
    listenEventsForClickTrigger() {
        fromEvent(this.hostElement.nativeElement, 'click')
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.open();
        });
    }
    listenEventsForContextTrigger() {
        fromEvent(this.hostElement.nativeElement, 'contextmenu')
            .pipe(takeUntil(this.destroy$))
            .subscribe((event) => {
            event.preventDefault();
            this.contextMenuPosition = {
                top: event.clientY,
                left: event.clientX,
            };
            this.open();
        });
    }
    append() {
        const options = new PopoverAppendOptions({
            type: this.type,
        });
        this.appendToLayer(options);
    }
    getBounds() {
        if (this.type === 'context') {
            return { top: this.contextMenuPosition.top, left: this.contextMenuPosition.left };
        }
        else {
            return this.hostElement.nativeElement.getBoundingClientRect();
        }
    }
}
PopoverMenuDirective.ɵfac = function PopoverMenuDirective_Factory(t) { return new (t || PopoverMenuDirective)(i0.ɵɵdirectiveInject(i0.ComponentFactoryResolver), i0.ɵɵdirectiveInject(i1.PopoverService), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.NgZone)); };
PopoverMenuDirective.ɵdir = i0.ɵɵdefineDirective({ type: PopoverMenuDirective, selectors: [["", "poppyMenu", ""]], inputs: { poppyMenu: "poppyMenu", type: "type", closeOnClickItem: "closeOnClickItem" }, exportAs: ["poppyMenu"], features: [i0.ɵɵInheritDefinitionFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(PopoverMenuDirective, [{
        type: Directive,
        args: [{
                selector: '[poppyMenu]',
                exportAs: 'poppyMenu',
            }]
    }], function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.PopoverService }, { type: i0.ElementRef }, { type: i0.NgZone }]; }, { poppyMenu: [{
            type: Input
        }], type: [{
            type: Input
        }], closeOnClickItem: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1tZW51LmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9mb2x0aS9Qcm9qZWN0cy9uZy1wb3BweS9wcm9qZWN0cy9saWIvc3JjLyIsInNvdXJjZXMiOlsibGliL3BvcG92ZXIvZGlyZWN0aXZlcy9wb3BvdmVyLW1lbnUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFHTCxTQUFTLEVBRVQsUUFBUSxFQUNSLEtBQUssR0FFTixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ2pDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsY0FBYyxFQUFpQixNQUFNLGtCQUFrQixDQUFDO0FBR2pFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQzlFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7QUFPdEQsTUFBTSxPQUFPLG9CQUFxQixTQUFRLG9CQUFvQjtJQU81RCxZQUNxQix3QkFBa0QsRUFDbEQsY0FBOEIsRUFDakMsV0FBdUIsRUFDcEIsTUFBYztRQUVqQyxLQUFLLENBQUMsd0JBQXdCLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUxsRCw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUNqQyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUNwQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBVDFCLFNBQUksR0FBb0IsTUFBTSxDQUFDO1FBQy9CLHFCQUFnQixHQUFZLElBQUksQ0FBQztJQVcxQyxDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtnQkFDakMsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtvQkFDckQsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7aUJBQ3BDO2dCQUVELElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7b0JBQzNCLElBQUksQ0FBQyw2QkFBNkIsRUFBRSxDQUFDO2lCQUN0QztZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQsSUFBSTtRQUNGLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBRUQsMEZBQTBGO0lBQzFGLDJCQUEyQjtJQUMzQixxQkFBcUI7UUFDbkIsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDNUIsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDNUQ7SUFDSCxDQUFDO0lBRVMsMkJBQTJCO1FBQ25DLE1BQU0sY0FBYyxHQUFrQjtZQUNwQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUN4QixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixjQUFjLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDaEMsZ0JBQWdCLEVBQUUsSUFBSTtZQUN0QixtQkFBbUIsRUFBRSxJQUFJLENBQUMsbUJBQW1CO1lBQzdDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0I7WUFDdkMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTO1lBQ3ZCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVTtZQUMzQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDeEIsQ0FBQztRQUVGLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUNyQjtnQkFDRSxPQUFPLEVBQUUsY0FBYztnQkFDdkIsUUFBUSxFQUFFLGNBQWM7YUFDekI7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRVMsU0FBUztRQUNqQixPQUFPLENBQ0wsQ0FBQyxJQUFJLENBQUMsbUJBQW1CO1lBQ3pCLENBQUMsSUFBSSxDQUFDLG1CQUFtQixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDO1lBQ3JELENBQUMsSUFBSSxDQUFDLG1CQUFtQixJQUFJLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUN2RCxDQUFDO0lBQ0osQ0FBQztJQUVPLDJCQUEyQjtRQUNqQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDO2FBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzlCLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyw2QkFBNkI7UUFDbkMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQzthQUNyRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM5QixTQUFTLENBQUMsQ0FBQyxLQUFpQixFQUFFLEVBQUU7WUFDL0IsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxtQkFBbUIsR0FBRztnQkFDekIsR0FBRyxFQUFFLEtBQUssQ0FBQyxPQUFPO2dCQUNsQixJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU87YUFDcEIsQ0FBQztZQUNGLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVPLE1BQU07UUFDWixNQUFNLE9BQU8sR0FBRyxJQUFJLG9CQUFvQixDQUFDO1lBQ3ZDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtTQUNoQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFTyxTQUFTO1FBQ2YsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUMzQixPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNuRjthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1NBQy9EO0lBQ0gsQ0FBQzs7d0ZBOUdVLG9CQUFvQjt5REFBcEIsb0JBQW9CO2tEQUFwQixvQkFBb0I7Y0FKaEMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUUsV0FBVzthQUN0QjtzSkFFVSxTQUFTO2tCQUFqQixLQUFLO1lBQ0csSUFBSTtrQkFBWixLQUFLO1lBQ0csZ0JBQWdCO2tCQUF4QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgTmdab25lLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgUE9QT1ZFUl9DT05GSUcsIFBvcG92ZXJDb25maWcgfSBmcm9tICcuLi9wb3BvdmVyLnRva2VuJztcbmltcG9ydCB7IFBvcG92ZXJCb3VuZHMsIFBvcG92ZXJDb250ZXh0TWVudVBvc2l0aW9uLCBQb3BvdmVyTWVudVR5cGUgfSBmcm9tICcuLi9wb3BvdmVyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBQb3BvdmVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3BvcG92ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBQb3BvdmVyQXBwZW5kT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy9wb3BvdmVyLWFwcGVuZC1vcHRpb25zLm1vZGVsJztcbmltcG9ydCB7IEJhc2VQb3BvdmVyRGlyZWN0aXZlIH0gZnJvbSAnLi9iYXNlLXBvcG92ZXInO1xuaW1wb3J0IHsgUG9wb3Zlck1lbnVDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL3BvcG92ZXItbWVudS9wb3BvdmVyLW1lbnUuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3BvcHB5TWVudV0nLFxuICBleHBvcnRBczogJ3BvcHB5TWVudScsXG59KVxuZXhwb3J0IGNsYXNzIFBvcG92ZXJNZW51RGlyZWN0aXZlIGV4dGVuZHMgQmFzZVBvcG92ZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgcG9wcHlNZW51OiBQb3BvdmVyTWVudUNvbXBvbmVudDtcbiAgQElucHV0KCkgdHlwZTogUG9wb3Zlck1lbnVUeXBlID0gJ21lbnUnO1xuICBASW5wdXQoKSBjbG9zZU9uQ2xpY2tJdGVtOiBib29sZWFuID0gdHJ1ZTtcblxuICBwcml2YXRlIGNvbnRleHRNZW51UG9zaXRpb246IFBvcG92ZXJDb250ZXh0TWVudVBvc2l0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCByZWFkb25seSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgcG9wb3ZlclNlcnZpY2U6IFBvcG92ZXJTZXJ2aWNlLFxuICAgIHB1YmxpYyByZWFkb25seSBob3N0RWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmVcbiAgKSB7XG4gICAgc3VwZXIoY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBwb3BvdmVyU2VydmljZSwgaG9zdEVsZW1lbnQsIG5nWm9uZSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucG9wcHlNZW51KSB7XG4gICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnRyaWdnZXIgIT09ICdtYW51YWwnICYmIHRoaXMudHlwZSA9PT0gJ21lbnUnKSB7XG4gICAgICAgICAgdGhpcy5saXN0ZW5FdmVudHNGb3JDbGlja1RyaWdnZXIoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdjb250ZXh0Jykge1xuICAgICAgICAgIHRoaXMubGlzdGVuRXZlbnRzRm9yQ29udGV4dFRyaWdnZXIoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb3BlbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jYW5BcHBlbmQoKSkge1xuICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5hcHBlbmQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIE5PVEU6IEl0IHNob3VsZCBiZSByZW1vdmVkIGFmdGVyIHVwZ3JhZGUgdG8gbmcgOSwgYmVjYXVzZSBRdWVyeUxpc3Qgc2hvdWxkIGVtaXQgY2hhbmdlc1xuICAvLyB3aGVuIGVsZW1lbnRzIGlzIHJlbW92ZWRcbiAgdXBkYXRlQ29udGVudFBvc2l0aW9uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBvcG92ZXJDb21wb25lbnRSZWYpIHtcbiAgICAgIHRoaXMucG9wb3ZlckNvbXBvbmVudFJlZi5pbnN0YW5jZS5jb21wb25lbnRTdHlsZXMudXBkYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGdldFBvcG92ZXJDb21wb25lbnRJbmplY3RvcigpOiBJbmplY3RvciB7XG4gICAgY29uc3QgcHJvdmlkZXJWYWx1ZXM6IFBvcG92ZXJDb25maWcgPSB7XG4gICAgICBib3VuZHM6IHRoaXMuZ2V0Qm91bmRzKCksXG4gICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICB0cmlnZ2VyRWxlbWVudDogdGhpcy5ob3N0RWxlbWVudCxcbiAgICAgIHRyaWdnZXJEaXJlY3RpdmU6IHRoaXMsXG4gICAgICBjbG9zZU9uQ2xpY2tPdXRzaWRlOiB0aGlzLmNsb3NlT25DbGlja091dHNpZGUsXG4gICAgICBjbG9zZU9uQ2xpY2tJdGVtOiB0aGlzLmNsb3NlT25DbGlja0l0ZW0sXG4gICAgICBtZW51UmVmOiB0aGlzLnBvcHB5TWVudSxcbiAgICAgIGlubmVyQ2xhc3M6IHRoaXMuaW5uZXJDbGFzcyxcbiAgICAgIHBvc2l0aW9uOiB0aGlzLnBvc2l0aW9uLFxuICAgIH07XG5cbiAgICByZXR1cm4gSW5qZWN0b3IuY3JlYXRlKFtcbiAgICAgIHtcbiAgICAgICAgcHJvdmlkZTogUE9QT1ZFUl9DT05GSUcsXG4gICAgICAgIHVzZVZhbHVlOiBwcm92aWRlclZhbHVlcyxcbiAgICAgIH0sXG4gICAgXSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY2FuQXBwZW5kKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICAhdGhpcy5wb3BvdmVyQ29tcG9uZW50UmVmIHx8XG4gICAgICAodGhpcy5wb3BvdmVyQ29tcG9uZW50UmVmICYmIHRoaXMudHlwZSA9PT0gJ2NvbnRleHQnKSB8fFxuICAgICAgKHRoaXMucG9wb3ZlckNvbXBvbmVudFJlZiAmJiB0aGlzLmNsb3NlT25UcmlnZ2VyQWdhaW4pXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuRXZlbnRzRm9yQ2xpY2tUcmlnZ2VyKCk6IHZvaWQge1xuICAgIGZyb21FdmVudCh0aGlzLmhvc3RFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdjbGljaycpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuRXZlbnRzRm9yQ29udGV4dFRyaWdnZXIoKTogdm9pZCB7XG4gICAgZnJvbUV2ZW50KHRoaXMuaG9zdEVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2NvbnRleHRtZW51JylcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMuY29udGV4dE1lbnVQb3NpdGlvbiA9IHtcbiAgICAgICAgICB0b3A6IGV2ZW50LmNsaWVudFksXG4gICAgICAgICAgbGVmdDogZXZlbnQuY2xpZW50WCxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwZW5kKCk6IHZvaWQge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBuZXcgUG9wb3ZlckFwcGVuZE9wdGlvbnMoe1xuICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5hcHBlbmRUb0xheWVyKG9wdGlvbnMpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRCb3VuZHMoKTogUG9wb3ZlckJvdW5kcyB7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ2NvbnRleHQnKSB7XG4gICAgICByZXR1cm4geyB0b3A6IHRoaXMuY29udGV4dE1lbnVQb3NpdGlvbi50b3AsIGxlZnQ6IHRoaXMuY29udGV4dE1lbnVQb3NpdGlvbi5sZWZ0IH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmhvc3RFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgfVxuICB9XG59XG4iXX0=