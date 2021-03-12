import { Directive, HostListener } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../services/popover.service";
export class PopoverRemoveOnClickDirective {
    constructor(host, popoverService) {
        this.host = host;
        this.popoverService = popoverService;
    }
    onClick() {
        this.remove();
    }
    remove() {
        setTimeout(() => {
            const parentElement = this.host.nativeElement.closest('poppy-content');
            this.popoverService.removeByNativeElementRef(parentElement);
        });
    }
}
PopoverRemoveOnClickDirective.ɵfac = function PopoverRemoveOnClickDirective_Factory(t) { return new (t || PopoverRemoveOnClickDirective)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1.PopoverService)); };
PopoverRemoveOnClickDirective.ɵdir = i0.ɵɵdefineDirective({ type: PopoverRemoveOnClickDirective, selectors: [["", "poppyRemoveOnClick", ""]], hostBindings: function PopoverRemoveOnClickDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function PopoverRemoveOnClickDirective_click_HostBindingHandler($event) { return ctx.onClick($event); });
    } } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(PopoverRemoveOnClickDirective, [{
        type: Directive,
        args: [{
                selector: '[poppyRemoveOnClick]',
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i1.PopoverService }]; }, { onClick: [{
            type: HostListener,
            args: ['click', ['$event']]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1yZW1vdmUtb24tY2xpY2suZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2ZvbHRpL1Byb2plY3RzL25nLXBvcHB5L3Byb2plY3RzL2xpYi9zcmMvIiwic291cmNlcyI6WyJsaWIvcG9wb3Zlci9kaXJlY3RpdmVzL3BvcG92ZXItcmVtb3ZlLW9uLWNsaWNrLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFjLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBS3BFLE1BQU0sT0FBTyw2QkFBNkI7SUFNeEMsWUFBb0IsSUFBZ0IsRUFBVSxjQUE4QjtRQUF4RCxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQWdCO0lBQUcsQ0FBQztJQUpoRixPQUFPO1FBQ0wsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFJRCxNQUFNO1FBQ0osVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN2RSxJQUFJLENBQUMsY0FBYyxDQUFDLHdCQUF3QixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzlELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7MEdBYlUsNkJBQTZCO2tFQUE3Qiw2QkFBNkI7Z0hBQTdCLG1CQUFlOztrREFBZiw2QkFBNkI7Y0FIekMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7YUFDakM7MEZBR0MsT0FBTztrQkFETixZQUFZO21CQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQb3BvdmVyU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL3BvcG92ZXIuc2VydmljZSc7XG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbcG9wcHlSZW1vdmVPbkNsaWNrXScsXG59KVxuZXhwb3J0IGNsYXNzIFBvcG92ZXJSZW1vdmVPbkNsaWNrRGlyZWN0aXZlIHtcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBvbkNsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMucmVtb3ZlKCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGhvc3Q6IEVsZW1lbnRSZWYsIHByaXZhdGUgcG9wb3ZlclNlcnZpY2U6IFBvcG92ZXJTZXJ2aWNlKSB7fVxuXG4gIHJlbW92ZSgpOiB2b2lkIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnN0IHBhcmVudEVsZW1lbnQgPSB0aGlzLmhvc3QubmF0aXZlRWxlbWVudC5jbG9zZXN0KCdwb3BweS1jb250ZW50Jyk7XG4gICAgICB0aGlzLnBvcG92ZXJTZXJ2aWNlLnJlbW92ZUJ5TmF0aXZlRWxlbWVudFJlZihwYXJlbnRFbGVtZW50KTtcbiAgICB9KTtcbiAgfVxufVxuIl19