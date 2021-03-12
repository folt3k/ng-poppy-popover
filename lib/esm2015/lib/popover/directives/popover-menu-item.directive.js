import { Directive, EventEmitter, Output, Input, HostBinding, } from '@angular/core';
import { fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class PopoverMenuItemDirective {
    constructor(element) {
        this.element = element;
        this.selected = false;
        this.hidden = false;
        this.clicked = new EventEmitter();
    }
    get selectedClass() {
        return this.selected;
    }
    get hiddenClass() {
        return this.hidden;
    }
    ngOnInit() {
        this.clicked$ = fromEvent(this.element.nativeElement, 'click').pipe(tap(() => {
            this.clicked.emit();
        }));
        this.hovered$ = fromEvent(this.element.nativeElement, 'mousemove');
        // this.global$ = fromEvent<MouseEvent>(document, 'click').pipe(tap(() => console.log('clicked window')));
    }
    ngAfterViewInit() {
        this.element.nativeElement.classList.add('popover-menu-item');
    }
}
PopoverMenuItemDirective.ɵfac = function PopoverMenuItemDirective_Factory(t) { return new (t || PopoverMenuItemDirective)(i0.ɵɵdirectiveInject(i0.ElementRef)); };
PopoverMenuItemDirective.ɵdir = i0.ɵɵdefineDirective({ type: PopoverMenuItemDirective, selectors: [["", "poppy-menu-item", ""]], hostVars: 4, hostBindings: function PopoverMenuItemDirective_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("popover-menu-item--selected", ctx.selectedClass)("popover-menu-item--hidden", ctx.hiddenClass);
    } }, inputs: { submenu: "submenu", selected: "selected", hidden: "hidden" }, outputs: { clicked: "clicked" } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(PopoverMenuItemDirective, [{
        type: Directive,
        args: [{
                selector: '[poppy-menu-item]',
            }]
    }], function () { return [{ type: i0.ElementRef }]; }, { submenu: [{
            type: Input
        }], selected: [{
            type: Input
        }], hidden: [{
            type: Input
        }], clicked: [{
            type: Output
        }], selectedClass: [{
            type: HostBinding,
            args: ['class.popover-menu-item--selected']
        }], hiddenClass: [{
            type: HostBinding,
            args: ['class.popover-menu-item--hidden']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1tZW51LWl0ZW0uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2ZvbHRpL1Byb2plY3RzL25nLXBvcHB5L3Byb2plY3RzL2xpYi9zcmMvIiwic291cmNlcyI6WyJsaWIvcG9wb3Zlci9kaXJlY3RpdmVzL3BvcG92ZXItbWVudS1pdGVtLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUVULFlBQVksRUFFWixNQUFNLEVBQ04sS0FBSyxFQUVMLFdBQVcsR0FHWixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsU0FBUyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBRTdDLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFLckMsTUFBTSxPQUFPLHdCQUF3QjtJQW9CbkMsWUFBbUIsT0FBbUI7UUFBbkIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQWxCN0IsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixXQUFNLEdBQVksS0FBSyxDQUFDO1FBQ3ZCLFlBQU8sR0FBdUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQWdCbEIsQ0FBQztJQWQxQyxJQUNJLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQ0ksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBUUQsUUFBUTtRQUNOLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFhLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FDN0UsR0FBRyxDQUFDLEdBQUcsRUFBRTtZQUNQLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUNGLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ25FLDBHQUEwRztJQUM1RyxDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUNoRSxDQUFDOztnR0FsQ1Usd0JBQXdCOzZEQUF4Qix3QkFBd0I7OztrREFBeEIsd0JBQXdCO2NBSHBDLFNBQVM7ZUFBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2FBQzlCOzZEQUVVLE9BQU87a0JBQWYsS0FBSztZQUNHLFFBQVE7a0JBQWhCLEtBQUs7WUFDRyxNQUFNO2tCQUFkLEtBQUs7WUFDSSxPQUFPO2tCQUFoQixNQUFNO1lBR0gsYUFBYTtrQkFEaEIsV0FBVzttQkFBQyxtQ0FBbUM7WUFNNUMsV0FBVztrQkFEZCxXQUFXO21CQUFDLGlDQUFpQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBBZnRlclZpZXdJbml0LFxuICBPdXRwdXQsXG4gIElucHV0LFxuICBUZW1wbGF0ZVJlZixcbiAgSG9zdEJpbmRpbmcsXG4gIE9uSW5pdCxcbiAgT25DaGFuZ2VzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZyb21FdmVudCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgUG9wb3Zlck1lbnVDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL3BvcG92ZXItbWVudS9wb3BvdmVyLW1lbnUuY29tcG9uZW50JztcbmltcG9ydCB7IHRhcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3BvcHB5LW1lbnUtaXRlbV0nLFxufSlcbmV4cG9ydCBjbGFzcyBQb3BvdmVyTWVudUl0ZW1EaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBzdWJtZW51OiBQb3BvdmVyTWVudUNvbXBvbmVudCB8IFRlbXBsYXRlUmVmPGFueT47XG4gIEBJbnB1dCgpIHNlbGVjdGVkOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIGhpZGRlbjogYm9vbGVhbiA9IGZhbHNlO1xuICBAT3V0cHV0KCkgY2xpY2tlZDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MucG9wb3Zlci1tZW51LWl0ZW0tLXNlbGVjdGVkJylcbiAgZ2V0IHNlbGVjdGVkQ2xhc3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQ7XG4gIH1cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnBvcG92ZXItbWVudS1pdGVtLS1oaWRkZW4nKVxuICBnZXQgaGlkZGVuQ2xhc3MoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaGlkZGVuO1xuICB9XG5cbiAgY2xpY2tlZCQ6IE9ic2VydmFibGU8TW91c2VFdmVudD47XG4gIGhvdmVyZWQkOiBPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+O1xuICBnbG9iYWwkOiBPYnNlcnZhYmxlPE1vdXNlRXZlbnQ+O1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY2xpY2tlZCQgPSBmcm9tRXZlbnQ8TW91c2VFdmVudD4odGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdjbGljaycpLnBpcGUoXG4gICAgICB0YXAoKCkgPT4ge1xuICAgICAgICB0aGlzLmNsaWNrZWQuZW1pdCgpO1xuICAgICAgfSlcbiAgICApO1xuICAgIHRoaXMuaG92ZXJlZCQgPSBmcm9tRXZlbnQodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdtb3VzZW1vdmUnKTtcbiAgICAvLyB0aGlzLmdsb2JhbCQgPSBmcm9tRXZlbnQ8TW91c2VFdmVudD4oZG9jdW1lbnQsICdjbGljaycpLnBpcGUodGFwKCgpID0+IGNvbnNvbGUubG9nKCdjbGlja2VkIHdpbmRvdycpKSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncG9wb3Zlci1tZW51LWl0ZW0nKTtcbiAgfVxufVxuIl19