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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1yZW1vdmUtb24tY2xpY2suZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2ZvbHRpL1Byb2plY3RzL25nLXBvcHB5L3Byb2plY3RzL25nLXBvcHB5L3NyYy8iLCJzb3VyY2VzIjpbImxpYi9wb3BvdmVyL2RpcmVjdGl2ZXMvcG9wb3Zlci1yZW1vdmUtb24tY2xpY2suZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWMsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFLcEUsTUFBTSxPQUFPLDZCQUE2QjtJQU14QyxZQUFvQixJQUFnQixFQUFVLGNBQThCO1FBQXhELFNBQUksR0FBSixJQUFJLENBQVk7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7SUFBRyxDQUFDO0lBSmhGLE9BQU87UUFDTCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEIsQ0FBQztJQUlELE1BQU07UUFDSixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxjQUFjLENBQUMsd0JBQXdCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzswR0FiVSw2QkFBNkI7a0VBQTdCLDZCQUE2QjtnSEFBN0IsbUJBQWU7O2tEQUFmLDZCQUE2QjtjQUh6QyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjthQUNqQzswRkFHQyxPQUFPO2tCQUROLFlBQVk7bUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBvcG92ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvcG9wb3Zlci5zZXJ2aWNlJztcbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1twb3BweVJlbW92ZU9uQ2xpY2tdJyxcbn0pXG5leHBvcnQgY2xhc3MgUG9wb3ZlclJlbW92ZU9uQ2xpY2tEaXJlY3RpdmUge1xuICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gIG9uQ2xpY2soKTogdm9pZCB7XG4gICAgdGhpcy5yZW1vdmUoKTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgaG9zdDogRWxlbWVudFJlZiwgcHJpdmF0ZSBwb3BvdmVyU2VydmljZTogUG9wb3ZlclNlcnZpY2UpIHt9XG5cbiAgcmVtb3ZlKCk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgY29uc3QgcGFyZW50RWxlbWVudCA9IHRoaXMuaG9zdC5uYXRpdmVFbGVtZW50LmNsb3Nlc3QoJ3BvcHB5LWNvbnRlbnQnKTtcbiAgICAgIHRoaXMucG9wb3ZlclNlcnZpY2UucmVtb3ZlQnlOYXRpdmVFbGVtZW50UmVmKHBhcmVudEVsZW1lbnQpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=