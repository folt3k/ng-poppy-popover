import { Directive, Input, HostListener } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../components/popover-select/popover-select.component";
export class PopoverChipRemoveDirective {
    constructor(selectComponentRef) {
        this.selectComponentRef = selectComponentRef;
    }
    onClick(event) {
        this.remove(event);
    }
    remove(event) {
        if (this.selectComponentRef) {
            this.selectComponentRef.closeChip(this.poppyChipRemove, event);
        }
    }
}
PopoverChipRemoveDirective.ɵfac = function PopoverChipRemoveDirective_Factory(t) { return new (t || PopoverChipRemoveDirective)(i0.ɵɵdirectiveInject(i1.PopoverSelectComponent)); };
PopoverChipRemoveDirective.ɵdir = i0.ɵɵdefineDirective({ type: PopoverChipRemoveDirective, selectors: [["", "poppyChipRemove", ""]], hostBindings: function PopoverChipRemoveDirective_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function PopoverChipRemoveDirective_click_HostBindingHandler($event) { return ctx.onClick($event); });
    } }, inputs: { poppyChipRemove: "poppyChipRemove" } });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(PopoverChipRemoveDirective, [{
        type: Directive,
        args: [{
                selector: '[poppyChipRemove]'
            }]
    }], function () { return [{ type: i1.PopoverSelectComponent }]; }, { poppyChipRemove: [{
            type: Input
        }], onClick: [{
            type: HostListener,
            args: ['click', ['$event']]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1jaGlwLXJlbW92ZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvZm9sdGkvUHJvamVjdHMvbmctcG9wcHkvcHJvamVjdHMvbmctcG9wcHkvc3JjLyIsInNvdXJjZXMiOlsibGliL3BvcG92ZXIvZGlyZWN0aXZlcy9wb3BvdmVyLWNoaXAtcmVtb3ZlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQU0vRCxNQUFNLE9BQU8sMEJBQTBCO0lBUXJDLFlBQW9CLGtCQUEwQztRQUExQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQXdCO0lBQUcsQ0FBQztJQUpsRSxPQUFPLENBQUMsS0FBWTtRQUNsQixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFJRCxNQUFNLENBQUMsS0FBWTtRQUNqQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtZQUMzQixJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDaEU7SUFDSCxDQUFDOztvR0FkVSwwQkFBMEI7K0RBQTFCLDBCQUEwQjs2R0FBMUIsbUJBQWU7O2tEQUFmLDBCQUEwQjtjQUh0QyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLG1CQUFtQjthQUM5Qjt5RUFFVSxlQUFlO2tCQUF2QixLQUFLO1lBR04sT0FBTztrQkFETixZQUFZO21CQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgSW5wdXQsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUG9wb3ZlclNlbGVjdENvbXBvbmVudCB9IGZyb20gJy4uL2NvbXBvbmVudHMvcG9wb3Zlci1zZWxlY3QvcG9wb3Zlci1zZWxlY3QuY29tcG9uZW50JztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3BvcHB5Q2hpcFJlbW92ZV0nXG59KVxuZXhwb3J0IGNsYXNzIFBvcG92ZXJDaGlwUmVtb3ZlRGlyZWN0aXZlIHtcbiAgQElucHV0KCkgcG9wcHlDaGlwUmVtb3ZlOiBhbnk7XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICBvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgIHRoaXMucmVtb3ZlKGV2ZW50KTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2VsZWN0Q29tcG9uZW50UmVmOiBQb3BvdmVyU2VsZWN0Q29tcG9uZW50KSB7fVxuXG4gIHJlbW92ZShldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zZWxlY3RDb21wb25lbnRSZWYpIHtcbiAgICAgIHRoaXMuc2VsZWN0Q29tcG9uZW50UmVmLmNsb3NlQ2hpcCh0aGlzLnBvcHB5Q2hpcFJlbW92ZSwgZXZlbnQpO1xuICAgIH1cbiAgfVxufVxuIl19