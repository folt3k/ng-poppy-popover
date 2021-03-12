import { EventEmitter, Input, Output, Directive, } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "../services/popover.service";
export class BasePopoverDirective {
    constructor(componentFactoryResolver, popoverService, hostElement, ngZone) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.popoverService = popoverService;
        this.hostElement = hostElement;
        this.ngZone = ngZone;
        this.trigger = 'click';
        // Options
        this.delayClose = null;
        this.closeOnTriggerAgain = undefined;
        this.closeOnClickOutside = true;
        this.hideOnScroll = false;
        this.position = 'bottom';
        // Emitters
        this.afterClose = new EventEmitter();
        this.afterShow = new EventEmitter();
        this.type = 'popover';
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        this.setOptions();
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.unsubscribe();
    }
    close() {
        if (this.popoverComponentRef) {
            this.remove(this.popoverComponentRef);
        }
    }
    appendToLayer(options) {
        const injector = this.getPopoverComponentInjector();
        const opts = Object.assign(Object.assign({}, options), { delayClose: this.delayClose, closeOnTriggerAgain: this.closeOnTriggerAgain, hideOnScroll: this.hideOnScroll });
        this.popoverComponentRef = this.popoverService.append(injector, this, opts);
    }
    remove(popoverRef) {
        this.ngZone.run(() => {
            this.popoverService.remove(popoverRef);
        });
    }
    setOptions() {
        if (this.closeOnTriggerAgain === undefined) {
            this.closeOnTriggerAgain = !(this.type === 'tooltip' ||
                this.trigger === 'hover' ||
                this.type === 'context');
        }
    }
}
BasePopoverDirective.ɵfac = function BasePopoverDirective_Factory(t) { return new (t || BasePopoverDirective)(i0.ɵɵdirectiveInject(i0.ComponentFactoryResolver), i0.ɵɵdirectiveInject(i1.PopoverService), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.NgZone)); };
BasePopoverDirective.ɵdir = i0.ɵɵdefineDirective({ type: BasePopoverDirective, inputs: { trigger: "trigger", delayClose: "delayClose", closeOnTriggerAgain: "closeOnTriggerAgain", closeOnClickOutside: "closeOnClickOutside", hideOnScroll: "hideOnScroll", innerClass: "innerClass", position: "position" }, outputs: { afterClose: "afterClose", afterShow: "afterShow" } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(BasePopoverDirective, [{
        type: Directive
    }], function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.PopoverService }, { type: i0.ElementRef }, { type: i0.NgZone }]; }, { trigger: [{
            type: Input
        }], delayClose: [{
            type: Input
        }], closeOnTriggerAgain: [{
            type: Input
        }], closeOnClickOutside: [{
            type: Input
        }], hideOnScroll: [{
            type: Input
        }], innerClass: [{
            type: Input
        }], position: [{
            type: Input
        }], afterClose: [{
            type: Output
        }], afterShow: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1wb3BvdmVyLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2ZvbHRpL1Byb2plY3RzL25nLXBvcHB5L3Byb2plY3RzL2xpYi9zcmMvIiwic291cmNlcyI6WyJsaWIvcG9wb3Zlci9kaXJlY3RpdmVzL2Jhc2UtcG9wb3Zlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0wsWUFBWSxFQUVaLEtBQUssRUFFTCxNQUFNLEVBR04sU0FBUyxHQUVWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7OztBQU8vQixNQUFNLE9BQWdCLG9CQUFvQjtJQWlCeEMsWUFDcUIsd0JBQWtELEVBQ2xELGNBQThCLEVBQ2pDLFdBQXVCLEVBQ3BCLE1BQWM7UUFIZCw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUNqQyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUNwQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBcEIxQixZQUFPLEdBQW1CLE9BQU8sQ0FBQztRQUMzQyxVQUFVO1FBQ0QsZUFBVSxHQUFXLElBQUksQ0FBQztRQUMxQix3QkFBbUIsR0FBRyxTQUFTLENBQUM7UUFDaEMsd0JBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQzNCLGlCQUFZLEdBQVksS0FBSyxDQUFDO1FBRTlCLGFBQVEsR0FBb0IsUUFBUSxDQUFDO1FBQzlDLFdBQVc7UUFDRCxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNoQyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUcvQixTQUFJLEdBQWdCLFNBQVMsQ0FBQztRQUM5QixhQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQU9oQyxDQUFDO0lBRUosUUFBUTtRQUNOLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBUU0sS0FBSztRQUNWLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7U0FDdkM7SUFDSCxDQUFDO0lBRVMsYUFBYSxDQUFDLE9BQTZCO1FBQ25ELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1FBQ3BELE1BQU0sSUFBSSxtQ0FDTCxPQUFPLEtBQ1YsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQzNCLG1CQUFtQixFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFDN0MsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLEdBQ2hDLENBQUM7UUFFRixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRVMsTUFBTSxDQUFDLFVBQWlEO1FBQ2hFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRTtZQUNuQixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxVQUFVO1FBQ2hCLElBQUksSUFBSSxDQUFDLG1CQUFtQixLQUFLLFNBQVMsRUFBRTtZQUMxQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsQ0FBQyxDQUMxQixJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVM7Z0JBQ3ZCLElBQUksQ0FBQyxPQUFPLEtBQUssT0FBTztnQkFDeEIsSUFBSSxDQUFDLElBQUksS0FBSyxTQUFTLENBQ3hCLENBQUM7U0FDSDtJQUNILENBQUM7O3dGQXZFbUIsb0JBQW9CO3lEQUFwQixvQkFBb0I7a0RBQXBCLG9CQUFvQjtjQUR6QyxTQUFTO3NKQUVDLE9BQU87a0JBQWYsS0FBSztZQUVHLFVBQVU7a0JBQWxCLEtBQUs7WUFDRyxtQkFBbUI7a0JBQTNCLEtBQUs7WUFDRyxtQkFBbUI7a0JBQTNCLEtBQUs7WUFDRyxZQUFZO2tCQUFwQixLQUFLO1lBQ0csVUFBVTtrQkFBbEIsS0FBSztZQUNHLFFBQVE7a0JBQWhCLEtBQUs7WUFFSSxVQUFVO2tCQUFuQixNQUFNO1lBQ0csU0FBUztrQkFBbEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQ29tcG9uZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIEVsZW1lbnRSZWYsXG4gIE5nWm9uZSxcbiAgRGlyZWN0aXZlLFxuICBPbkluaXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUG9wb3ZlckNvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL3BvcG92ZXItY29udGVudC9wb3BvdmVyLWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgUG9wb3ZlclNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9wb3BvdmVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgUG9wb3ZlckFwcGVuZE9wdGlvbnMgfSBmcm9tICcuLi9tb2RlbHMvcG9wb3Zlci1hcHBlbmQtb3B0aW9ucy5tb2RlbCc7XG5pbXBvcnQgeyBQb3BvdmVyUG9zaXRpb24sIFBvcG92ZXJUcmlnZ2VyLCBQb3BvdmVyVHlwZSB9IGZyb20gJy4uL3BvcG92ZXIuaW50ZXJmYWNlJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQmFzZVBvcG92ZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHRyaWdnZXI6IFBvcG92ZXJUcmlnZ2VyID0gJ2NsaWNrJztcbiAgLy8gT3B0aW9uc1xuICBASW5wdXQoKSBkZWxheUNsb3NlOiBudW1iZXIgPSBudWxsO1xuICBASW5wdXQoKSBjbG9zZU9uVHJpZ2dlckFnYWluID0gdW5kZWZpbmVkO1xuICBASW5wdXQoKSBjbG9zZU9uQ2xpY2tPdXRzaWRlID0gdHJ1ZTtcbiAgQElucHV0KCkgaGlkZU9uU2Nyb2xsOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGlubmVyQ2xhc3M6IHN0cmluZztcbiAgQElucHV0KCkgcG9zaXRpb246IFBvcG92ZXJQb3NpdGlvbiA9ICdib3R0b20nO1xuICAvLyBFbWl0dGVyc1xuICBAT3V0cHV0KCkgYWZ0ZXJDbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGFmdGVyU2hvdyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwb3BvdmVyQ29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8UG9wb3ZlckNvbnRlbnRDb21wb25lbnQ+O1xuICBwcm90ZWN0ZWQgdHlwZTogUG9wb3ZlclR5cGUgPSAncG9wb3Zlcic7XG4gIHByb3RlY3RlZCBkZXN0cm95JCA9IG5ldyBTdWJqZWN0KCk7XG5cbiAgcHJvdGVjdGVkIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCByZWFkb25seSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgcG9wb3ZlclNlcnZpY2U6IFBvcG92ZXJTZXJ2aWNlLFxuICAgIHB1YmxpYyByZWFkb25seSBob3N0RWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmVcbiAgKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc2V0T3B0aW9ucygpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5kZXN0cm95JC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95JC51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHVibGljIGFic3RyYWN0IG9wZW4oKTogdm9pZDtcblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgZ2V0UG9wb3ZlckNvbXBvbmVudEluamVjdG9yKCk6IEluamVjdG9yO1xuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBjYW5BcHBlbmQoKTogYm9vbGVhbjtcblxuICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucG9wb3ZlckNvbXBvbmVudFJlZikge1xuICAgICAgdGhpcy5yZW1vdmUodGhpcy5wb3BvdmVyQ29tcG9uZW50UmVmKTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgYXBwZW5kVG9MYXllcihvcHRpb25zOiBQb3BvdmVyQXBwZW5kT3B0aW9ucyk6IHZvaWQge1xuICAgIGNvbnN0IGluamVjdG9yID0gdGhpcy5nZXRQb3BvdmVyQ29tcG9uZW50SW5qZWN0b3IoKTtcbiAgICBjb25zdCBvcHRzOiBQb3BvdmVyQXBwZW5kT3B0aW9ucyA9IHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBkZWxheUNsb3NlOiB0aGlzLmRlbGF5Q2xvc2UsXG4gICAgICBjbG9zZU9uVHJpZ2dlckFnYWluOiB0aGlzLmNsb3NlT25UcmlnZ2VyQWdhaW4sXG4gICAgICBoaWRlT25TY3JvbGw6IHRoaXMuaGlkZU9uU2Nyb2xsLFxuICAgIH07XG5cbiAgICB0aGlzLnBvcG92ZXJDb21wb25lbnRSZWYgPSB0aGlzLnBvcG92ZXJTZXJ2aWNlLmFwcGVuZChpbmplY3RvciwgdGhpcywgb3B0cyk7XG4gIH1cblxuICBwcm90ZWN0ZWQgcmVtb3ZlKHBvcG92ZXJSZWY6IENvbXBvbmVudFJlZjxQb3BvdmVyQ29udGVudENvbXBvbmVudD4pOiB2b2lkIHtcbiAgICB0aGlzLm5nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgdGhpcy5wb3BvdmVyU2VydmljZS5yZW1vdmUocG9wb3ZlclJlZik7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHNldE9wdGlvbnMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2xvc2VPblRyaWdnZXJBZ2FpbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmNsb3NlT25UcmlnZ2VyQWdhaW4gPSAhKFxuICAgICAgICB0aGlzLnR5cGUgPT09ICd0b29sdGlwJyB8fFxuICAgICAgICB0aGlzLnRyaWdnZXIgPT09ICdob3ZlcicgfHxcbiAgICAgICAgdGhpcy50eXBlID09PSAnY29udGV4dCdcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG4iXX0=