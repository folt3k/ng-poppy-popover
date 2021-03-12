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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvZm9sdGkvUHJvamVjdHMvbmctcG9wcHkvcHJvamVjdHMvbmctcG9wcHkvc3JjLyIsInNvdXJjZXMiOlsibGliL3BvcG92ZXIvZGlyZWN0aXZlcy9wb3BvdmVyLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBR0wsU0FBUyxFQUVULFFBQVEsRUFDUixLQUFLLEdBR04sTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDL0UsT0FBTyxFQUFFLGNBQWMsRUFBaUIsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBTXRELE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxvQkFBb0I7SUFHeEQsWUFDcUIsd0JBQWtELEVBQ2xELGNBQThCLEVBQ2pDLFdBQXVCLEVBQ3BCLE1BQWM7UUFFakMsS0FBSyxDQUFDLHdCQUF3QixFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFMbEQsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUEwQjtRQUNsRCxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDakMsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFDcEIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUduQyxDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtnQkFD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LENBQUMsbUJBQW1CLENBQUMsQ0FBQzt5QkFDdkM7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7aUJBQ047WUFDSCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLENBQUMsQ0FBQztRQUVMLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7WUFDekMsSUFBSSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7YUFDdkM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxNQUFNO1FBQ1osTUFBTSxPQUFPLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQztZQUN2QyxJQUFJLEVBQUUsU0FBUztZQUNmLFdBQVcsRUFBRSxJQUFJLENBQUMsT0FBTztTQUMxQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlCLENBQUM7O2dGQXpJVSxnQkFBZ0I7cURBQWhCLGdCQUFnQjtrREFBaEIsZ0JBQWdCO2NBSjVCLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixRQUFRLEVBQUUsY0FBYzthQUN6QjtzSkFFVSxZQUFZO2tCQUFwQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEluamVjdG9yLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBUZW1wbGF0ZVJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmcm9tRXZlbnQsIG1lcmdlLCB0aW1lciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgdGFrZVVudGlsLCBkZWJvdW5jZVRpbWUsIHRhcCwgc3dpdGNoTWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgUE9QT1ZFUl9DT05GSUcsIFBvcG92ZXJDb25maWcgfSBmcm9tICcuLi9wb3BvdmVyLnRva2VuJztcbmltcG9ydCB7IFBvcG92ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcG9wb3Zlci5zZXJ2aWNlJztcbmltcG9ydCB7IFBvcG92ZXJBcHBlbmRPcHRpb25zIH0gZnJvbSAnLi4vbW9kZWxzL3BvcG92ZXItYXBwZW5kLW9wdGlvbnMubW9kZWwnO1xuaW1wb3J0IHsgQmFzZVBvcG92ZXJEaXJlY3RpdmUgfSBmcm9tICcuL2Jhc2UtcG9wb3Zlcic7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1twb3BweVBvcG92ZXJdJyxcbiAgZXhwb3J0QXM6ICdwb3BweVBvcG92ZXInLFxufSlcbmV4cG9ydCBjbGFzcyBQb3BvdmVyRGlyZWN0aXZlIGV4dGVuZHMgQmFzZVBvcG92ZXJEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgQElucHV0KCkgcG9wcHlQb3BvdmVyOiBUZW1wbGF0ZVJlZjxIVE1MRWxlbWVudD4gfCBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IGNvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByb3RlY3RlZCByZWFkb25seSBwb3BvdmVyU2VydmljZTogUG9wb3ZlclNlcnZpY2UsXG4gICAgcHVibGljIHJlYWRvbmx5IGhvc3RFbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByb3RlY3RlZCByZWFkb25seSBuZ1pvbmU6IE5nWm9uZVxuICApIHtcbiAgICBzdXBlcihjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHBvcG92ZXJTZXJ2aWNlLCBob3N0RWxlbWVudCwgbmdab25lKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wb3BweVBvcG92ZXIpIHtcbiAgICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlciA9PT0gJ2NsaWNrJykge1xuICAgICAgICAgIHRoaXMubGlzdGVuRXZlbnRzRm9yQ2xpY2tUcmlnZ2VyKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50cmlnZ2VyID09PSAnaG92ZXInKSB7XG4gICAgICAgICAgdGhpcy5saXN0ZW5FdmVudHNGb3JIb3ZlclRyaWdnZXIoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgb3BlbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jYW5BcHBlbmQoKSkge1xuICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5hcHBlbmQoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBnZXRQb3BvdmVyQ29tcG9uZW50SW5qZWN0b3IoKTogSW5qZWN0b3Ige1xuICAgIGNvbnN0IHByb3ZpZGVyVmFsdWVzOiBQb3BvdmVyQ29uZmlnID0ge1xuICAgICAgYm91bmRzOiB0aGlzLmhvc3RFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICB0eXBlOiB0aGlzLnR5cGUsXG4gICAgICB0cmlnZ2VyOiB0aGlzLnRyaWdnZXIsXG4gICAgICB0cmlnZ2VyRWxlbWVudDogdGhpcy5ob3N0RWxlbWVudCxcbiAgICAgIHRyaWdnZXJEaXJlY3RpdmU6IHRoaXMsXG4gICAgICBjb250ZW50OiB0aGlzLnBvcHB5UG9wb3ZlcixcbiAgICAgIGNsb3NlT25DbGlja091dHNpZGU6IHRoaXMuY2xvc2VPbkNsaWNrT3V0c2lkZSxcbiAgICAgIGlubmVyQ2xhc3M6IHRoaXMuaW5uZXJDbGFzcyxcbiAgICAgIHBvc2l0aW9uOiB0aGlzLnBvc2l0aW9uLFxuICAgIH07XG5cbiAgICByZXR1cm4gSW5qZWN0b3IuY3JlYXRlKFtcbiAgICAgIHtcbiAgICAgICAgcHJvdmlkZTogUE9QT1ZFUl9DT05GSUcsXG4gICAgICAgIHVzZVZhbHVlOiBwcm92aWRlclZhbHVlcyxcbiAgICAgIH0sXG4gICAgXSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgY2FuQXBwZW5kKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5wb3BvdmVyQ29tcG9uZW50UmVmIHx8ICh0aGlzLnBvcG92ZXJDb21wb25lbnRSZWYgJiYgdGhpcy5jbG9zZU9uVHJpZ2dlckFnYWluKTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuRXZlbnRzRm9yQ2xpY2tUcmlnZ2VyKCk6IHZvaWQge1xuICAgIGZyb21FdmVudCh0aGlzLmhvc3RFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdjbGljaycpXG4gICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgbGlzdGVuRXZlbnRzRm9ySG92ZXJUcmlnZ2VyKCk6IHZvaWQge1xuICAgIGxldCBwb3BvdmVySG92ZXJlZCA9IGZhbHNlO1xuICAgIGxldCBob3N0SG92ZXJlZCA9IGZhbHNlO1xuICAgIGxldCBpc01vdXNlTGVmdEJlZm9yZURlbGF5VGltZVBhc3QgPSBmYWxzZTtcblxuICAgIG1lcmdlKFxuICAgICAgZnJvbUV2ZW50KHRoaXMuaG9zdEVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ21vdXNlZW50ZXInKSxcbiAgICAgIGZyb21FdmVudCh0aGlzLmhvc3RFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdjbGljaycpXG4gICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICBmcm9tRXZlbnQodGhpcy5ob3N0RWxlbWVudC5uYXRpdmVFbGVtZW50LCAnbW91c2VsZWF2ZScpXG4gICAgICAgICAgICAucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCksIHRha2VVbnRpbCh0aGlzLmFmdGVyQ2xvc2UpLCBkZWJvdW5jZVRpbWUoMjAwKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICBob3N0SG92ZXJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICBpc01vdXNlTGVmdEJlZm9yZURlbGF5VGltZVBhc3QgPSB0cnVlO1xuICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpc01vdXNlTGVmdEJlZm9yZURlbGF5VGltZVBhc3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgICAgICAgaWYgKCFwb3BvdmVySG92ZXJlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKHRoaXMucG9wb3ZlckNvbXBvbmVudFJlZik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KSxcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IHRpbWVyKDMwMCkpXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgY29uc3QgaXNIb3N0RWxlbWVudFN0aWxsSW5ET00gPSBkb2N1bWVudC5ib2R5LmNvbnRhaW5zKHRoaXMuaG9zdEVsZW1lbnQubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIHBvcG92ZXJIb3ZlcmVkID0gZmFsc2U7XG4gICAgICAgIGhvc3RIb3ZlcmVkID0gdHJ1ZTtcblxuICAgICAgICBpZiAoaXNIb3N0RWxlbWVudFN0aWxsSW5ET00gJiYgIWlzTW91c2VMZWZ0QmVmb3JlRGVsYXlUaW1lUGFzdCkge1xuICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMucG9wb3ZlckNvbXBvbmVudFJlZikge1xuICAgICAgICAgICAgZnJvbUV2ZW50KHRoaXMucG9wb3ZlckNvbXBvbmVudFJlZi5pbnN0YW5jZS5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdtb3VzZWVudGVyJylcbiAgICAgICAgICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuYWZ0ZXJDbG9zZSkpXG4gICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHBvcG92ZXJIb3ZlcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGZyb21FdmVudCh0aGlzLnBvcG92ZXJDb21wb25lbnRSZWYuaW5zdGFuY2UuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnbW91c2VsZWF2ZScpXG4gICAgICAgICAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmFmdGVyQ2xvc2UpKVxuICAgICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICBwb3BvdmVySG92ZXJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmICghaG9zdEhvdmVyZWQpIHtcbiAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKHRoaXMucG9wb3ZlckNvbXBvbmVudFJlZik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDApO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLmRlc3Ryb3kkLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGlmICh0aGlzLnBvcG92ZXJDb21wb25lbnRSZWYpIHtcbiAgICAgICAgdGhpcy5yZW1vdmUodGhpcy5wb3BvdmVyQ29tcG9uZW50UmVmKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXBwZW5kKCk6IHZvaWQge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBuZXcgUG9wb3ZlckFwcGVuZE9wdGlvbnMoe1xuICAgICAgdHlwZTogJ3BvcG92ZXInLFxuICAgICAgdHJpZ2dlcmVkQnk6IHRoaXMudHJpZ2dlcixcbiAgICB9KTtcblxuICAgIHRoaXMuYXBwZW5kVG9MYXllcihvcHRpb25zKTtcbiAgfVxufVxuIl19