import { Directive, Injector, Input, } from '@angular/core';
import { fromEvent, merge, timer } from 'rxjs';
import { takeUntil, debounceTime, tap, switchMap, take } from 'rxjs/operators';
import { POPOVER_CONFIG } from '../popover.token';
import { PopoverAppendOptions } from '../models/popover-append-options.model';
import { BasePopoverDirective } from './base-popover';
import * as i0 from "@angular/core";
import * as i1 from "../services/popover.service";
export class PopoverDirective extends BasePopoverDirective {
    constructor(componentFactoryResolver, popoverService, hostElement, ngZone) {
        super(componentFactoryResolver, popoverService, hostElement, ngZone);
        this.componentFactoryResolver = componentFactoryResolver;
        this.popoverService = popoverService;
        this.hostElement = hostElement;
        this.ngZone = ngZone;
    }
    ngAfterViewInit() {
        if (this.poppyPopover) {
            this.ngZone.runOutsideAngular(() => {
                if (this.trigger === 'click') {
                    this.listenEventsForClickTrigger();
                }
                if (this.trigger === 'hover') {
                    this.listenEventsForHoverTrigger();
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
    getPopoverComponentInjector() {
        const providerValues = {
            bounds: this.hostElement.nativeElement.getBoundingClientRect(),
            type: this.type,
            trigger: this.trigger,
            triggerElement: this.hostElement,
            triggerDirective: this,
            content: this.poppyPopover,
            closeOnClickOutside: this.closeOnClickOutside,
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
        return !this.popoverComponentRef || (this.popoverComponentRef && this.closeOnTriggerAgain);
    }
    listenEventsForClickTrigger() {
        fromEvent(this.hostElement.nativeElement, 'click')
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
            this.open();
        });
    }
    listenEventsForHoverTrigger() {
        let popoverHovered = false;
        let hostHovered = false;
        let isMouseLeftBeforeDelayTimePast = false;
        merge(fromEvent(this.hostElement.nativeElement, 'mouseenter'), fromEvent(this.hostElement.nativeElement, 'click'))
            .pipe(takeUntil(this.destroy$), tap(() => {
            fromEvent(this.hostElement.nativeElement, 'mouseleave')
                .pipe(takeUntil(this.destroy$), takeUntil(this.afterClose), debounceTime(200))
                .subscribe(() => {
                hostHovered = false;
                isMouseLeftBeforeDelayTimePast = true;
                setTimeout(() => {
                    isMouseLeftBeforeDelayTimePast = false;
                }, 200);
                if (!popoverHovered) {
                    this.remove(this.popoverComponentRef);
                }
            });
        }), switchMap(() => timer(300)))
            .subscribe(() => {
            const isHostElementStillInDOM = document.body.contains(this.hostElement.nativeElement);
            popoverHovered = false;
            hostHovered = true;
            if (isHostElementStillInDOM && !isMouseLeftBeforeDelayTimePast) {
                this.open();
            }
            setTimeout(() => {
                if (this.popoverComponentRef) {
                    fromEvent(this.popoverComponentRef.instance.element.nativeElement, 'mouseenter')
                        .pipe(takeUntil(this.afterClose))
                        .subscribe(() => {
                        popoverHovered = true;
                    });
                    fromEvent(this.popoverComponentRef.instance.element.nativeElement, 'mouseleave')
                        .pipe(takeUntil(this.afterClose))
                        .subscribe(() => {
                        popoverHovered = false;
                        if (!hostHovered) {
                            this.remove(this.popoverComponentRef);
                        }
                    });
                }
            }, 0);
        });
        this.destroy$.pipe(take(1)).subscribe(() => {
            if (this.popoverComponentRef) {
                this.remove(this.popoverComponentRef);
            }
        });
    }
    append() {
        const options = new PopoverAppendOptions({
            type: 'popover',
            triggeredBy: this.trigger,
        });
        this.appendToLayer(options);
    }
}
PopoverDirective.ɵfac = function PopoverDirective_Factory(t) { return new (t || PopoverDirective)(i0.ɵɵdirectiveInject(i0.ComponentFactoryResolver), i0.ɵɵdirectiveInject(i1.PopoverService), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.NgZone)); };
PopoverDirective.ɵdir = i0.ɵɵdefineDirective({ type: PopoverDirective, selectors: [["", "poppyPopover", ""]], inputs: { poppyPopover: "poppyPopover" }, exportAs: ["poppyPopover"], features: [i0.ɵɵInheritDefinitionFeature] });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(PopoverDirective, [{
        type: Directive,
        args: [{
                selector: '[poppyPopover]',
                exportAs: 'poppyPopover',
            }]
    }], function () { return [{ type: i0.ComponentFactoryResolver }, { type: i1.PopoverService }, { type: i0.ElementRef }, { type: i0.NgZone }]; }, { poppyPopover: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvZm9sdGkvUHJvamVjdHMvbmctcG9wcHkvcHJvamVjdHMvbGliL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9wb3BvdmVyL2RpcmVjdGl2ZXMvcG9wb3Zlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUdMLFNBQVMsRUFFVCxRQUFRLEVBQ1IsS0FBSyxHQUdOLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9FLE9BQU8sRUFBRSxjQUFjLEVBQWlCLE1BQU0sa0JBQWtCLENBQUM7QUFFakUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDOUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQU10RCxNQUFNLE9BQU8sZ0JBQWlCLFNBQVEsb0JBQW9CO0lBR3hELFlBQ3FCLHdCQUFrRCxFQUNsRCxjQUE4QixFQUNqQyxXQUF1QixFQUNwQixNQUFjO1FBRWpDLEtBQUssQ0FBQyx3QkFBd0IsRUFBRSxjQUFjLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBTGxELDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQ2pDLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ3BCLFdBQU0sR0FBTixNQUFNLENBQVE7SUFHbkMsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2pDLElB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LG1CQUFtQixDQUFDLENBQUM7eUJBQ3ZDO29CQUNILENBQUMsQ0FBQyxDQUFDO2lCQUNOO1lBQ0gsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ1IsQ0FBQyxDQUFDLENBQUM7UUFFTCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ3pDLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO2dCQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2FBQ3ZDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sTUFBTTtRQUNaLE1BQU0sT0FBTyxHQUFHLElBQUksb0JBQW9CLENBQUM7WUFDdkMsSUFBSSxFQUFFLFNBQVM7WUFDZixXQUFXLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDMUIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5QixDQUFDOztnRkF6SVUsZ0JBQWdCO3FEQUFoQixnQkFBZ0I7a0RBQWhCLGdCQUFnQjtjQUo1QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsUUFBUSxFQUFFLGNBQWM7YUFDekI7c0pBRVUsWUFBWTtrQkFBcEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbmplY3RvcixcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgVGVtcGxhdGVSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZnJvbUV2ZW50LCBtZXJnZSwgdGltZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCwgZGVib3VuY2VUaW1lLCB0YXAsIHN3aXRjaE1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFBPUE9WRVJfQ09ORklHLCBQb3BvdmVyQ29uZmlnIH0gZnJvbSAnLi4vcG9wb3Zlci50b2tlbic7XG5pbXBvcnQgeyBQb3BvdmVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3BvcG92ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBQb3BvdmVyQXBwZW5kT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscy9wb3BvdmVyLWFwcGVuZC1vcHRpb25zLm1vZGVsJztcbmltcG9ydCB7IEJhc2VQb3BvdmVyRGlyZWN0aXZlIH0gZnJvbSAnLi9iYXNlLXBvcG92ZXInO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcG9wcHlQb3BvdmVyXScsXG4gIGV4cG9ydEFzOiAncG9wcHlQb3BvdmVyJyxcbn0pXG5leHBvcnQgY2xhc3MgUG9wb3ZlckRpcmVjdGl2ZSBleHRlbmRzIEJhc2VQb3BvdmVyRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIEBJbnB1dCgpIHBvcHB5UG9wb3ZlcjogVGVtcGxhdGVSZWY8SFRNTEVsZW1lbnQ+IHwgc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCByZWFkb25seSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgcG9wb3ZlclNlcnZpY2U6IFBvcG92ZXJTZXJ2aWNlLFxuICAgIHB1YmxpYyByZWFkb25seSBob3N0RWxlbWVudDogRWxlbWVudFJlZixcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmVcbiAgKSB7XG4gICAgc3VwZXIoY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBwb3BvdmVyU2VydmljZSwgaG9zdEVsZW1lbnQsIG5nWm9uZSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucG9wcHlQb3BvdmVyKSB7XG4gICAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnRyaWdnZXIgPT09ICdjbGljaycpIHtcbiAgICAgICAgICB0aGlzLmxpc3RlbkV2ZW50c0ZvckNsaWNrVHJpZ2dlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlciA9PT0gJ2hvdmVyJykge1xuICAgICAgICAgIHRoaXMubGlzdGVuRXZlbnRzRm9ySG92ZXJUcmlnZ2VyKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG9wZW4oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY2FuQXBwZW5kKCkpIHtcbiAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgIHRoaXMuYXBwZW5kKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgZ2V0UG9wb3ZlckNvbXBvbmVudEluamVjdG9yKCk6IEluamVjdG9yIHtcbiAgICBjb25zdCBwcm92aWRlclZhbHVlczogUG9wb3ZlckNvbmZpZyA9IHtcbiAgICAgIGJvdW5kczogdGhpcy5ob3N0RWxlbWVudC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLFxuICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgdHJpZ2dlcjogdGhpcy50cmlnZ2VyLFxuICAgICAgdHJpZ2dlckVsZW1lbnQ6IHRoaXMuaG9zdEVsZW1lbnQsXG4gICAgICB0cmlnZ2VyRGlyZWN0aXZlOiB0aGlzLFxuICAgICAgY29udGVudDogdGhpcy5wb3BweVBvcG92ZXIsXG4gICAgICBjbG9zZU9uQ2xpY2tPdXRzaWRlOiB0aGlzLmNsb3NlT25DbGlja091dHNpZGUsXG4gICAgICBpbm5lckNsYXNzOiB0aGlzLmlubmVyQ2xhc3MsXG4gICAgICBwb3NpdGlvbjogdGhpcy5wb3NpdGlvbixcbiAgICB9O1xuXG4gICAgcmV0dXJuIEluamVjdG9yLmNyZWF0ZShbXG4gICAgICB7XG4gICAgICAgIHByb3ZpZGU6IFBPUE9WRVJfQ09ORklHLFxuICAgICAgICB1c2VWYWx1ZTogcHJvdmlkZXJWYWx1ZXMsXG4gICAgICB9LFxuICAgIF0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGNhbkFwcGVuZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIXRoaXMucG9wb3ZlckNvbXBvbmVudFJlZiB8fCAodGhpcy5wb3BvdmVyQ29tcG9uZW50UmVmICYmIHRoaXMuY2xvc2VPblRyaWdnZXJBZ2Fpbik7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkV2ZW50c0ZvckNsaWNrVHJpZ2dlcigpOiB2b2lkIHtcbiAgICBmcm9tRXZlbnQodGhpcy5ob3N0RWxlbWVudC5uYXRpdmVFbGVtZW50LCAnY2xpY2snKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGxpc3RlbkV2ZW50c0ZvckhvdmVyVHJpZ2dlcigpOiB2b2lkIHtcbiAgICBsZXQgcG9wb3ZlckhvdmVyZWQgPSBmYWxzZTtcbiAgICBsZXQgaG9zdEhvdmVyZWQgPSBmYWxzZTtcbiAgICBsZXQgaXNNb3VzZUxlZnRCZWZvcmVEZWxheVRpbWVQYXN0ID0gZmFsc2U7XG5cbiAgICBtZXJnZShcbiAgICAgIGZyb21FdmVudCh0aGlzLmhvc3RFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdtb3VzZWVudGVyJyksXG4gICAgICBmcm9tRXZlbnQodGhpcy5ob3N0RWxlbWVudC5uYXRpdmVFbGVtZW50LCAnY2xpY2snKVxuICAgIClcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95JCksXG4gICAgICAgIHRhcCgoKSA9PiB7XG4gICAgICAgICAgZnJvbUV2ZW50KHRoaXMuaG9zdEVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ21vdXNlbGVhdmUnKVxuICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLCB0YWtlVW50aWwodGhpcy5hZnRlckNsb3NlKSwgZGVib3VuY2VUaW1lKDIwMCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgaG9zdEhvdmVyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgaXNNb3VzZUxlZnRCZWZvcmVEZWxheVRpbWVQYXN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaXNNb3VzZUxlZnRCZWZvcmVEZWxheVRpbWVQYXN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgICAgICAgIGlmICghcG9wb3ZlckhvdmVyZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSh0aGlzLnBvcG92ZXJDb21wb25lbnRSZWYpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSksXG4gICAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aW1lcigzMDApKVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGlzSG9zdEVsZW1lbnRTdGlsbEluRE9NID0gZG9jdW1lbnQuYm9keS5jb250YWlucyh0aGlzLmhvc3RFbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICBwb3BvdmVySG92ZXJlZCA9IGZhbHNlO1xuICAgICAgICBob3N0SG92ZXJlZCA9IHRydWU7XG5cbiAgICAgICAgaWYgKGlzSG9zdEVsZW1lbnRTdGlsbEluRE9NICYmICFpc01vdXNlTGVmdEJlZm9yZURlbGF5VGltZVBhc3QpIHtcbiAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLnBvcG92ZXJDb21wb25lbnRSZWYpIHtcbiAgICAgICAgICAgIGZyb21FdmVudCh0aGlzLnBvcG92ZXJDb21wb25lbnRSZWYuaW5zdGFuY2UuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnbW91c2VlbnRlcicpXG4gICAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmFmdGVyQ2xvc2UpKVxuICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBwb3BvdmVySG92ZXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBmcm9tRXZlbnQodGhpcy5wb3BvdmVyQ29tcG9uZW50UmVmLmluc3RhbmNlLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ21vdXNlbGVhdmUnKVxuICAgICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5hZnRlckNsb3NlKSlcbiAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgcG9wb3ZlckhvdmVyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoIWhvc3RIb3ZlcmVkKSB7XG4gICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSh0aGlzLnBvcG92ZXJDb21wb25lbnRSZWYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAwKTtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy5kZXN0cm95JC5waXBlKHRha2UoMSkpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5wb3BvdmVyQ29tcG9uZW50UmVmKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlKHRoaXMucG9wb3ZlckNvbXBvbmVudFJlZik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFwcGVuZCgpOiB2b2lkIHtcbiAgICBjb25zdCBvcHRpb25zID0gbmV3IFBvcG92ZXJBcHBlbmRPcHRpb25zKHtcbiAgICAgIHR5cGU6ICdwb3BvdmVyJyxcbiAgICAgIHRyaWdnZXJlZEJ5OiB0aGlzLnRyaWdnZXIsXG4gICAgfSk7XG5cbiAgICB0aGlzLmFwcGVuZFRvTGF5ZXIob3B0aW9ucyk7XG4gIH1cbn1cbiJdfQ==