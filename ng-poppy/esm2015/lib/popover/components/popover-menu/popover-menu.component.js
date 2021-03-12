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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1tZW51LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9mb2x0aS9Qcm9qZWN0cy9uZy1wb3BweS9wcm9qZWN0cy9uZy1wb3BweS9zcmMvIiwic291cmNlcyI6WyJsaWIvcG9wb3Zlci9jb21wb25lbnRzL3BvcG92ZXItbWVudS9wb3BvdmVyLW1lbnUuY29tcG9uZW50LnRzIiwibGliL3BvcG92ZXIvY29tcG9uZW50cy9wb3BvdmVyLW1lbnUvcG9wb3Zlci1tZW51LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBYSxlQUFlLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkgsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sOENBQThDLENBQUM7OztJQ0F0RixrQkFBWTs7O0FEUWQsTUFBTSxPQUFPLG9CQUFvQjtJQUkvQixnQkFBZSxDQUFDOzt3RkFKTCxvQkFBb0I7eURBQXBCLG9CQUFvQjtvQ0FDZCx3QkFBd0I7Ozs7O3VCQUM5QixXQUFXOzs7Ozs7UUNYeEIsa0ZBQ0U7O2tERFFXLG9CQUFvQjtjQU5oQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLFlBQVk7Z0JBQ3RCLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixXQUFXLEVBQUUsK0JBQStCO2dCQUM1QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTthQUNoRDtzQ0FFNEMsU0FBUztrQkFBbkQsZUFBZTttQkFBQyx3QkFBd0I7WUFDakIsV0FBVztrQkFBbEMsU0FBUzttQkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUXVlcnlMaXN0LCBDb250ZW50Q2hpbGRyZW4sIENvbXBvbmVudCwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBvcG92ZXJNZW51SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcG9wb3Zlci1tZW51LWl0ZW0uZGlyZWN0aXZlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncG9wcHktbWVudScsXG4gIGV4cG9ydEFzOiAncG9wcHlNZW51JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3BvcG92ZXItbWVudS5jb21wb25lbnQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBQb3BvdmVyTWVudUNvbXBvbmVudCB7XG4gIEBDb250ZW50Q2hpbGRyZW4oUG9wb3Zlck1lbnVJdGVtRGlyZWN0aXZlKSBtZW51SXRlbXM6IFF1ZXJ5TGlzdDxQb3BvdmVyTWVudUl0ZW1EaXJlY3RpdmU+O1xuICBAVmlld0NoaWxkKFRlbXBsYXRlUmVmKSB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PjtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG59XG4iLCI8bmctdGVtcGxhdGU+XG4gIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvbmctdGVtcGxhdGU+Il19