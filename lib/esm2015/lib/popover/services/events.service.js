import { Injectable } from '@angular/core';
import { merge, fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class PopoverEventsService {
    constructor(ngZone) {
        this.ngZone = ngZone;
        this.registeredEvents = [];
    }
    register(type, activePopover, callback) {
        let sub;
        this.ngZone.runOutsideAngular(() => {
            const obs = this.getEventObservable(type);
            sub = obs.subscribe((event) => {
                callback(event);
            });
        });
        this.registeredEvents.push({ popover: activePopover, type, sub, callback });
    }
    unregister(type, activePopover) {
        this.registeredEvents
            .filter((event) => event.type === type)
            .forEach((event) => {
            if (event.popover === activePopover) {
                event.sub.unsubscribe();
            }
        });
        this.registeredEvents = this.registeredEvents.filter((event) => event.type === type ? event.popover !== activePopover : true);
    }
    subscribe(type, popover) {
        const obs = this.getEventObservable(type);
        this.registeredEvents
            .filter((event) => { var _a; return event.type === type && event.popover === popover && ((_a = event.sub) === null || _a === void 0 ? void 0 : _a.closed); })
            .forEach((event) => {
            event.sub = obs.subscribe((e) => event.callback(e));
        });
    }
    unsubscribe(type, popover) {
        this.registeredEvents
            .filter((event) => event.type === type && event.popover === popover)
            .forEach((event) => {
            event.sub.unsubscribe();
        });
    }
    getEventObservable(type) {
        switch (type) {
            case 'click-outside':
                return merge(fromEvent(document, 'click'), fromEvent(document, 'contextmenu'))
                    .pipe();
            case 'capture-scroll':
                return fromEvent(document, 'scroll').pipe(tap(() => {
                    // console.log('Capturing scroll event..');
                }));
            case 'resize':
                return fromEvent(window, 'resize').pipe(tap(() => {
                    // console.log('Resize event..');
                }));
        }
    }
}
PopoverEventsService.ɵfac = function PopoverEventsService_Factory(t) { return new (t || PopoverEventsService)(i0.ɵɵinject(i0.NgZone)); };
PopoverEventsService.ɵprov = i0.ɵɵdefineInjectable({ token: PopoverEventsService, factory: PopoverEventsService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(PopoverEventsService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i0.NgZone }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvZm9sdGkvUHJvamVjdHMvbmctcG9wcHkvcHJvamVjdHMvbGliL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9wb3BvdmVyL3NlcnZpY2VzL2V2ZW50cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQVUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxFQUE0QixLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRWxFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFZckMsTUFBTSxPQUFPLG9CQUFvQjtJQUcvQixZQUFvQixNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUYxQixxQkFBZ0IsR0FBNkIsRUFBRSxDQUFDO0lBRW5CLENBQUM7SUFFdEMsUUFBUSxDQUNOLElBQXNCLEVBQ3RCLGFBQTRCLEVBQzVCLFFBQXNDO1FBRXRDLElBQUksR0FBaUIsQ0FBQztRQUV0QixJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtZQUNqQyxNQUFNLEdBQUcsR0FBc0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdELEdBQUcsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQzVCLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBc0IsRUFBRSxhQUE0QjtRQUM3RCxJQUFJLENBQUMsZ0JBQWdCO2FBQ2xCLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUM7YUFDdEMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDakIsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLGFBQWEsRUFBRTtnQkFDbkMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUN6QjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUM3RCxLQUFLLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxhQUFhLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDN0QsQ0FBQztJQUNKLENBQUM7SUFFRCxTQUFTLENBQUMsSUFBc0IsRUFBRSxPQUFzQjtRQUN0RCxNQUFNLEdBQUcsR0FBc0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTdELElBQUksQ0FBQyxnQkFBZ0I7YUFDbEIsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsV0FBQyxPQUFBLEtBQUssQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssT0FBTyxXQUFJLEtBQUssQ0FBQyxHQUFHLDBDQUFFLE1BQU0sQ0FBQSxDQUFBLEVBQUEsQ0FBQzthQUN4RixPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNqQixLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxXQUFXLENBQUMsSUFBc0IsRUFBRSxPQUFzQjtRQUN4RCxJQUFJLENBQUMsZ0JBQWdCO2FBQ2xCLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxPQUFPLENBQUM7YUFDbkUsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDakIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFTyxrQkFBa0IsQ0FBQyxJQUFzQjtRQUMvQyxRQUFRLElBQUksRUFBRTtZQUNaLEtBQUssZUFBZTtnQkFDbEIsT0FBTyxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsRUFBRSxTQUFTLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO3FCQUMzRSxJQUFJLEVBRUgsQ0FBQztZQUNQLEtBQUssZ0JBQWdCO2dCQUNuQixPQUFPLFNBQVMsQ0FBYSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUNuRCxHQUFHLENBQUMsR0FBRyxFQUFFO29CQUNQLDJDQUEyQztnQkFDN0MsQ0FBQyxDQUFDLENBQ0gsQ0FBQztZQUNKLEtBQUssUUFBUTtnQkFDWCxPQUFPLFNBQVMsQ0FBYSxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUNqRCxHQUFHLENBQUMsR0FBRyxFQUFFO29CQUNQLGlDQUFpQztnQkFDbkMsQ0FBQyxDQUFDLENBQ0gsQ0FBQztTQUNMO0lBQ0gsQ0FBQzs7d0ZBekVVLG9CQUFvQjs0REFBcEIsb0JBQW9CLFdBQXBCLG9CQUFvQixtQkFEUCxNQUFNO2tEQUNuQixvQkFBb0I7Y0FEaEMsVUFBVTtlQUFDLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSVBvcG92ZXJFdmVudFNlcnZpY2UgfSBmcm9tICcuLi9wb3BvdmVyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24sIE9ic2VydmFibGUsIG1lcmdlLCBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEFjdGl2ZVBvcG92ZXIgfSBmcm9tICcuLi9tb2RlbHMvcG9wb3Zlci1hY3RpdmUubW9kZWwnO1xuaW1wb3J0IHsgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5leHBvcnQgdHlwZSBQb3BvdmVyRXZlbnRUeXBlID0gJ2NsaWNrLW91dHNpZGUnIHwgJ3Jlc2l6ZScgfCAnY2FwdHVyZS1zY3JvbGwnO1xuXG5pbnRlcmZhY2UgUG9wb3ZlclJlZ2lzdGVyZWRFdmVudCB7XG4gIHN1YjogU3Vic2NyaXB0aW9uO1xuICBwb3BvdmVyOiBBY3RpdmVQb3BvdmVyO1xuICB0eXBlOiBQb3BvdmVyRXZlbnRUeXBlO1xuICBjYWxsYmFjaz86IChhcmdzPykgPT4gdm9pZCB8IGFueTtcbn1cblxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcbmV4cG9ydCBjbGFzcyBQb3BvdmVyRXZlbnRzU2VydmljZSBpbXBsZW1lbnRzIElQb3BvdmVyRXZlbnRTZXJ2aWNlIHtcbiAgcHJpdmF0ZSByZWdpc3RlcmVkRXZlbnRzOiBQb3BvdmVyUmVnaXN0ZXJlZEV2ZW50W10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG5nWm9uZTogTmdab25lKSB7fVxuXG4gIHJlZ2lzdGVyKFxuICAgIHR5cGU6IFBvcG92ZXJFdmVudFR5cGUsXG4gICAgYWN0aXZlUG9wb3ZlcjogQWN0aXZlUG9wb3ZlcixcbiAgICBjYWxsYmFjazogKGV2ZW50OiBFdmVudCkgPT4gdm9pZCB8IGFueVxuICApOiB2b2lkIHtcbiAgICBsZXQgc3ViOiBTdWJzY3JpcHRpb247XG5cbiAgICB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICBjb25zdCBvYnM6IE9ic2VydmFibGU8RXZlbnQ+ID0gdGhpcy5nZXRFdmVudE9ic2VydmFibGUodHlwZSk7XG4gICAgICBzdWIgPSBvYnMuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgICBjYWxsYmFjayhldmVudCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMucmVnaXN0ZXJlZEV2ZW50cy5wdXNoKHsgcG9wb3ZlcjogYWN0aXZlUG9wb3ZlciwgdHlwZSwgc3ViLCBjYWxsYmFjayB9KTtcbiAgfVxuXG4gIHVucmVnaXN0ZXIodHlwZTogUG9wb3ZlckV2ZW50VHlwZSwgYWN0aXZlUG9wb3ZlcjogQWN0aXZlUG9wb3Zlcik6IHZvaWQge1xuICAgIHRoaXMucmVnaXN0ZXJlZEV2ZW50c1xuICAgICAgLmZpbHRlcigoZXZlbnQpID0+IGV2ZW50LnR5cGUgPT09IHR5cGUpXG4gICAgICAuZm9yRWFjaCgoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LnBvcG92ZXIgPT09IGFjdGl2ZVBvcG92ZXIpIHtcbiAgICAgICAgICBldmVudC5zdWIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgdGhpcy5yZWdpc3RlcmVkRXZlbnRzID0gdGhpcy5yZWdpc3RlcmVkRXZlbnRzLmZpbHRlcigoZXZlbnQpID0+XG4gICAgICBldmVudC50eXBlID09PSB0eXBlID8gZXZlbnQucG9wb3ZlciAhPT0gYWN0aXZlUG9wb3ZlciA6IHRydWVcbiAgICApO1xuICB9XG5cbiAgc3Vic2NyaWJlKHR5cGU6IFBvcG92ZXJFdmVudFR5cGUsIHBvcG92ZXI6IEFjdGl2ZVBvcG92ZXIpOiB2b2lkIHtcbiAgICBjb25zdCBvYnM6IE9ic2VydmFibGU8RXZlbnQ+ID0gdGhpcy5nZXRFdmVudE9ic2VydmFibGUodHlwZSk7XG5cbiAgICB0aGlzLnJlZ2lzdGVyZWRFdmVudHNcbiAgICAgIC5maWx0ZXIoKGV2ZW50KSA9PiBldmVudC50eXBlID09PSB0eXBlICYmIGV2ZW50LnBvcG92ZXIgPT09IHBvcG92ZXIgJiYgZXZlbnQuc3ViPy5jbG9zZWQpXG4gICAgICAuZm9yRWFjaCgoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQuc3ViID0gb2JzLnN1YnNjcmliZSgoZSkgPT4gZXZlbnQuY2FsbGJhY2soZSkpO1xuICAgICAgfSk7XG4gIH1cblxuICB1bnN1YnNjcmliZSh0eXBlOiBQb3BvdmVyRXZlbnRUeXBlLCBwb3BvdmVyOiBBY3RpdmVQb3BvdmVyKTogdm9pZCB7XG4gICAgdGhpcy5yZWdpc3RlcmVkRXZlbnRzXG4gICAgICAuZmlsdGVyKChldmVudCkgPT4gZXZlbnQudHlwZSA9PT0gdHlwZSAmJiBldmVudC5wb3BvdmVyID09PSBwb3BvdmVyKVxuICAgICAgLmZvckVhY2goKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldEV2ZW50T2JzZXJ2YWJsZSh0eXBlOiBQb3BvdmVyRXZlbnRUeXBlKTogT2JzZXJ2YWJsZTxFdmVudD4ge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnY2xpY2stb3V0c2lkZSc6XG4gICAgICAgIHJldHVybiBtZXJnZShmcm9tRXZlbnQoZG9jdW1lbnQsICdjbGljaycpLCBmcm9tRXZlbnQoZG9jdW1lbnQsICdjb250ZXh0bWVudScpKVxuICAgICAgICAgIC5waXBlXG4gICAgICAgICAgLy8gdGFwKCgpID0+IGNvbnNvbGUubG9nKCdsaXN0ZW4gZm9yIGNsaWNrIG91dHNpZGUuLicpKVxuICAgICAgICAgICgpO1xuICAgICAgY2FzZSAnY2FwdHVyZS1zY3JvbGwnOlxuICAgICAgICByZXR1cm4gZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KGRvY3VtZW50LCAnc2Nyb2xsJykucGlwZShcbiAgICAgICAgICB0YXAoKCkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0NhcHR1cmluZyBzY3JvbGwgZXZlbnQuLicpO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICBjYXNlICdyZXNpemUnOlxuICAgICAgICByZXR1cm4gZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KHdpbmRvdywgJ3Jlc2l6ZScpLnBpcGUoXG4gICAgICAgICAgdGFwKCgpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdSZXNpemUgZXZlbnQuLicpO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgfVxuICB9XG59XG4iXX0=