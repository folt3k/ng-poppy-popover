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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1wb3BvdmVyLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2ZvbHRpL1Byb2plY3RzL25nLXBvcHB5L3Byb2plY3RzL25nLXBvcHB5L3NyYy8iLCJzb3VyY2VzIjpbImxpYi9wb3BvdmVyL2RpcmVjdGl2ZXMvYmFzZS1wb3BvdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFHTCxZQUFZLEVBRVosS0FBSyxFQUVMLE1BQU0sRUFHTixTQUFTLEdBRVYsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7O0FBTy9CLE1BQU0sT0FBZ0Isb0JBQW9CO0lBaUJ4QyxZQUNxQix3QkFBa0QsRUFDbEQsY0FBOEIsRUFDakMsV0FBdUIsRUFDcEIsTUFBYztRQUhkLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQ2pDLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3BCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFwQjFCLFlBQU8sR0FBbUIsT0FBTyxDQUFDO1FBQzNDLFVBQVU7UUFDRCxlQUFVLEdBQVcsSUFBSSxDQUFDO1FBQzFCLHdCQUFtQixHQUFHLFNBQVMsQ0FBQztRQUNoQyx3QkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDM0IsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFFOUIsYUFBUSxHQUFvQixRQUFRLENBQUM7UUFDOUMsV0FBVztRQUNELGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hDLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRy9CLFNBQUksR0FBZ0IsU0FBUyxDQUFDO1FBQzlCLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBT2hDLENBQUM7SUFFSixRQUFRO1FBQ04sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFRTSxLQUFLO1FBQ1YsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7WUFDNUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztTQUN2QztJQUNILENBQUM7SUFFUyxhQUFhLENBQUMsT0FBNkI7UUFDbkQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7UUFDcEQsTUFBTSxJQUFJLG1DQUNMLE9BQU8sS0FDVixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFDM0IsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixFQUM3QyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksR0FDaEMsQ0FBQztRQUVGLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFUyxNQUFNLENBQUMsVUFBaUQ7UUFDaEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO1lBQ25CLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLFVBQVU7UUFDaEIsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEtBQUssU0FBUyxFQUFFO1lBQzFDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLENBQzFCLElBQUksQ0FBQyxJQUFJLEtBQUssU0FBUztnQkFDdkIsSUFBSSxDQUFDLE9BQU8sS0FBSyxPQUFPO2dCQUN4QixJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FDeEIsQ0FBQztTQUNIO0lBQ0gsQ0FBQzs7d0ZBdkVtQixvQkFBb0I7eURBQXBCLG9CQUFvQjtrREFBcEIsb0JBQW9CO2NBRHpDLFNBQVM7c0pBRUMsT0FBTztrQkFBZixLQUFLO1lBRUcsVUFBVTtrQkFBbEIsS0FBSztZQUNHLG1CQUFtQjtrQkFBM0IsS0FBSztZQUNHLG1CQUFtQjtrQkFBM0IsS0FBSztZQUNHLFlBQVk7a0JBQXBCLEtBQUs7WUFDRyxVQUFVO2tCQUFsQixLQUFLO1lBQ0csUUFBUTtrQkFBaEIsS0FBSztZQUVJLFVBQVU7a0JBQW5CLE1BQU07WUFDRyxTQUFTO2tCQUFsQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBDb21wb25lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5qZWN0b3IsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgRWxlbWVudFJlZixcbiAgTmdab25lLFxuICBEaXJlY3RpdmUsXG4gIE9uSW5pdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQb3BvdmVyQ29udGVudENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvcG9wb3Zlci1jb250ZW50L3BvcG92ZXItY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQgeyBQb3BvdmVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3BvcG92ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBQb3BvdmVyQXBwZW5kT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy9wb3BvdmVyLWFwcGVuZC1vcHRpb25zLm1vZGVsJztcbmltcG9ydCB7IFBvcG92ZXJQb3NpdGlvbiwgUG9wb3ZlclRyaWdnZXIsIFBvcG92ZXJUeXBlIH0gZnJvbSAnLi4vcG9wb3Zlci5pbnRlcmZhY2UnO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlUG9wb3ZlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgQElucHV0KCkgdHJpZ2dlcjogUG9wb3ZlclRyaWdnZXIgPSAnY2xpY2snO1xuICAvLyBPcHRpb25zXG4gIEBJbnB1dCgpIGRlbGF5Q2xvc2U6IG51bWJlciA9IG51bGw7XG4gIEBJbnB1dCgpIGNsb3NlT25UcmlnZ2VyQWdhaW4gPSB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIGNsb3NlT25DbGlja091dHNpZGUgPSB0cnVlO1xuICBASW5wdXQoKSBoaWRlT25TY3JvbGw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgaW5uZXJDbGFzczogc3RyaW5nO1xuICBASW5wdXQoKSBwb3NpdGlvbjogUG9wb3ZlclBvc2l0aW9uID0gJ2JvdHRvbSc7XG4gIC8vIEVtaXR0ZXJzXG4gIEBPdXRwdXQoKSBhZnRlckNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYWZ0ZXJTaG93ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHBvcG92ZXJDb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxQb3BvdmVyQ29udGVudENvbXBvbmVudD47XG4gIHByb3RlY3RlZCB0eXBlOiBQb3BvdmVyVHlwZSA9ICdwb3BvdmVyJztcbiAgcHJvdGVjdGVkIGRlc3Ryb3kkID0gbmV3IFN1YmplY3QoKTtcblxuICBwcm90ZWN0ZWQgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByb3RlY3RlZCByZWFkb25seSBwb3BvdmVyU2VydmljZTogUG9wb3ZlclNlcnZpY2UsXG4gICAgcHVibGljIHJlYWRvbmx5IGhvc3RFbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByb3RlY3RlZCByZWFkb25seSBuZ1pvbmU6IE5nWm9uZVxuICApIHt9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXRPcHRpb25zKCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3kkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3kkLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwdWJsaWMgYWJzdHJhY3Qgb3BlbigpOiB2b2lkO1xuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBnZXRQb3BvdmVyQ29tcG9uZW50SW5qZWN0b3IoKTogSW5qZWN0b3I7XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGNhbkFwcGVuZCgpOiBib29sZWFuO1xuXG4gIHB1YmxpYyBjbG9zZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wb3BvdmVyQ29tcG9uZW50UmVmKSB7XG4gICAgICB0aGlzLnJlbW92ZSh0aGlzLnBvcG92ZXJDb21wb25lbnRSZWYpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBhcHBlbmRUb0xheWVyKG9wdGlvbnM6IFBvcG92ZXJBcHBlbmRPcHRpb25zKTogdm9pZCB7XG4gICAgY29uc3QgaW5qZWN0b3IgPSB0aGlzLmdldFBvcG92ZXJDb21wb25lbnRJbmplY3RvcigpO1xuICAgIGNvbnN0IG9wdHM6IFBvcG92ZXJBcHBlbmRPcHRpb25zID0ge1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIGRlbGF5Q2xvc2U6IHRoaXMuZGVsYXlDbG9zZSxcbiAgICAgIGNsb3NlT25UcmlnZ2VyQWdhaW46IHRoaXMuY2xvc2VPblRyaWdnZXJBZ2FpbixcbiAgICAgIGhpZGVPblNjcm9sbDogdGhpcy5oaWRlT25TY3JvbGwsXG4gICAgfTtcblxuICAgIHRoaXMucG9wb3ZlckNvbXBvbmVudFJlZiA9IHRoaXMucG9wb3ZlclNlcnZpY2UuYXBwZW5kKGluamVjdG9yLCB0aGlzLCBvcHRzKTtcbiAgfVxuXG4gIHByb3RlY3RlZCByZW1vdmUocG9wb3ZlclJlZjogQ29tcG9uZW50UmVmPFBvcG92ZXJDb250ZW50Q29tcG9uZW50Pik6IHZvaWQge1xuICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICB0aGlzLnBvcG92ZXJTZXJ2aWNlLnJlbW92ZShwb3BvdmVyUmVmKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0T3B0aW9ucygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jbG9zZU9uVHJpZ2dlckFnYWluID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuY2xvc2VPblRyaWdnZXJBZ2FpbiA9ICEoXG4gICAgICAgIHRoaXMudHlwZSA9PT0gJ3Rvb2x0aXAnIHx8XG4gICAgICAgIHRoaXMudHJpZ2dlciA9PT0gJ2hvdmVyJyB8fFxuICAgICAgICB0aGlzLnR5cGUgPT09ICdjb250ZXh0J1xuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==