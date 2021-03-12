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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1jaGlwLXJlbW92ZS5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvZm9sdGkvUHJvamVjdHMvbmctcG9wcHkvcHJvamVjdHMvbGliL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9wb3BvdmVyL2RpcmVjdGl2ZXMvcG9wb3Zlci1jaGlwLXJlbW92ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFNL0QsTUFBTSxPQUFPLDBCQUEwQjtJQVFyQyxZQUFvQixrQkFBMEM7UUFBMUMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUF3QjtJQUFHLENBQUM7SUFKbEUsT0FBTyxDQUFDLEtBQVk7UUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBSUQsTUFBTSxDQUFDLEtBQVk7UUFDakIsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7WUFDM0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ2hFO0lBQ0gsQ0FBQzs7b0dBZFUsMEJBQTBCOytEQUExQiwwQkFBMEI7NkdBQTFCLG1CQUFlOztrREFBZiwwQkFBMEI7Y0FIdEMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7YUFDOUI7eUVBRVUsZUFBZTtrQkFBdkIsS0FBSztZQUdOLE9BQU87a0JBRE4sWUFBWTttQkFBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBIb3N0TGlzdGVuZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBvcG92ZXJTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL3BvcG92ZXItc2VsZWN0L3BvcG92ZXItc2VsZWN0LmNvbXBvbmVudCc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1twb3BweUNoaXBSZW1vdmVdJ1xufSlcbmV4cG9ydCBjbGFzcyBQb3BvdmVyQ2hpcFJlbW92ZURpcmVjdGl2ZSB7XG4gIEBJbnB1dCgpIHBvcHB5Q2hpcFJlbW92ZTogYW55O1xuXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgb25DbGljayhldmVudDogRXZlbnQpIHtcbiAgICB0aGlzLnJlbW92ZShldmVudCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNlbGVjdENvbXBvbmVudFJlZjogUG9wb3ZlclNlbGVjdENvbXBvbmVudCkge31cblxuICByZW1vdmUoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2VsZWN0Q29tcG9uZW50UmVmKSB7XG4gICAgICB0aGlzLnNlbGVjdENvbXBvbmVudFJlZi5jbG9zZUNoaXAodGhpcy5wb3BweUNoaXBSZW1vdmUsIGV2ZW50KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==