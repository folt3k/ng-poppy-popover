import { ContentChildren, Component, TemplateRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { PopoverMenuItemDirective } from '../../directives/popover-menu-item.directive';
import * as i0 from "@angular/core";
function PopoverMenuComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵprojection(0);
} }
const _c0 = ["*"];
export class PopoverMenuComponent {
    constructor() { }
}
PopoverMenuComponent.ɵfac = function PopoverMenuComponent_Factory(t) { return new (t || PopoverMenuComponent)(); };
PopoverMenuComponent.ɵcmp = i0.ɵɵdefineComponent({ type: PopoverMenuComponent, selectors: [["poppy-menu"]], contentQueries: function PopoverMenuComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        i0.ɵɵcontentQuery(dirIndex, PopoverMenuItemDirective, false);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.menuItems = _t);
    } }, viewQuery: function PopoverMenuComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(TemplateRef, true);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.templateRef = _t.first);
    } }, exportAs: ["poppyMenu"], ngContentSelectors: _c0, decls: 1, vars: 0, template: function PopoverMenuComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵprojectionDef();
        i0.ɵɵtemplate(0, PopoverMenuComponent_ng_template_0_Template, 1, 0, "ng-template");
    } }, encapsulation: 2, changeDetection: 0 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(PopoverMenuComponent, [{
        type: Component,
        args: [{
                selector: 'poppy-menu',
                exportAs: 'poppyMenu',
                templateUrl: './popover-menu.component.html',
                changeDetection: ChangeDetectionStrategy.OnPush,
            }]
    }], function () { return []; }, { menuItems: [{
            type: ContentChildren,
            args: [PopoverMenuItemDirective]
        }], templateRef: [{
            type: ViewChild,
            args: [TemplateRef]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9mb2x0aS9Qcm9qZWN0cy9uZy1wb3BweS9wcm9qZWN0cy9saWIvc3JjLyIsInNvdXJjZXMiOlsibGliL3BvcG92ZXIvY29tcG9uZW50cy9wb3BvdmVyLW1lbnUvcG9wb3Zlci1tZW51LmNvbXBvbmVudC50cyIsImxpYi9wb3BvdmVyL2NvbXBvbmVudHMvcG9wb3Zlci1tZW51L3BvcG92ZXItbWVudS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWEsZUFBZSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZILE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDhDQUE4QyxDQUFDOzs7SUNBdEYsa0JBQVk7OztBRFFkLE1BQU0sT0FBTyxvQkFBb0I7SUFJL0IsZ0JBQWUsQ0FBQzs7d0ZBSkwsb0JBQW9CO3lEQUFwQixvQkFBb0I7b0NBQ2Qsd0JBQXdCOzs7Ozt1QkFDOUIsV0FBVzs7Ozs7O1FDWHhCLGtGQUNFOztrRERRVyxvQkFBb0I7Y0FOaEMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxZQUFZO2dCQUN0QixRQUFRLEVBQUUsV0FBVztnQkFDckIsV0FBVyxFQUFFLCtCQUErQjtnQkFDNUMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07YUFDaEQ7c0NBRTRDLFNBQVM7a0JBQW5ELGVBQWU7bUJBQUMsd0JBQXdCO1lBQ2pCLFdBQVc7a0JBQWxDLFNBQVM7bUJBQUMsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFF1ZXJ5TGlzdCwgQ29udGVudENoaWxkcmVuLCBDb21wb25lbnQsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQb3BvdmVyTWVudUl0ZW1EaXJlY3RpdmUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3BvcG92ZXItbWVudS1pdGVtLmRpcmVjdGl2ZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3BvcHB5LW1lbnUnLFxuICBleHBvcnRBczogJ3BvcHB5TWVudScsXG4gIHRlbXBsYXRlVXJsOiAnLi9wb3BvdmVyLW1lbnUuY29tcG9uZW50Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbn0pXG5leHBvcnQgY2xhc3MgUG9wb3Zlck1lbnVDb21wb25lbnQge1xuICBAQ29udGVudENoaWxkcmVuKFBvcG92ZXJNZW51SXRlbURpcmVjdGl2ZSkgbWVudUl0ZW1zOiBRdWVyeUxpc3Q8UG9wb3Zlck1lbnVJdGVtRGlyZWN0aXZlPjtcbiAgQFZpZXdDaGlsZChUZW1wbGF0ZVJlZikgdGVtcGxhdGVSZWY6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgY29uc3RydWN0b3IoKSB7fVxufVxuIiwiPG5nLXRlbXBsYXRlPlxuICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L25nLXRlbXBsYXRlPiJdfQ==