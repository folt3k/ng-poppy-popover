import { Component, HostBinding, Inject, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { LAYER_CONFIG } from './layer.token';
import * as i0 from "@angular/core";
const _c0 = ["container"];
export class LayerComponent {
    constructor(config) {
        this.config = config;
    }
    get overlay() {
        return this.config.overlay;
    }
}
LayerComponent.ɵfac = function LayerComponent_Factory(t) { return new (t || LayerComponent)(i0.ɵɵdirectiveInject(LAYER_CONFIG)); };
LayerComponent.ɵcmp = i0.ɵɵdefineComponent({ type: LayerComponent, selectors: [["poppy-layer"]], viewQuery: function LayerComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, true, ViewContainerRef);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.container = _t.first);
    } }, hostVars: 2, hostBindings: function LayerComponent_HostBindings(rf, ctx) { if (rf & 2) {
        i0.ɵɵclassProp("poppy-layer--overlay", ctx.overlay);
    } }, decls: 2, vars: 0, consts: [["container", ""]], template: function LayerComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementContainer(0, null, 0);
    } }, styles: ["poppy-layer{bottom:0;display:block;left:0;position:fixed;right:0;top:0;visibility:hidden;z-index:10000}.poppy-layer--overlay{background:rgba(0,0,0,.42);overflow-y:auto;visibility:visible}"], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(LayerComponent, [{
        type: Component,
        args: [{
                // tslint:disable-next-line:component-selector
                selector: 'poppy-layer',
                templateUrl: './layer.component.html',
                styleUrls: ['./layer.component.scss'],
                encapsulation: ViewEncapsulation.None,
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: Inject,
                args: [LAYER_CONFIG]
            }] }]; }, { container: [{
            type: ViewChild,
            args: ['container', { read: ViewContainerRef }]
        }], overlay: [{
            type: HostBinding,
            args: ['class.poppy-layer--overlay']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2ZvbHRpL1Byb2plY3RzL25nLXBvcHB5L3Byb2plY3RzL25nLXBvcHB5L3NyYy8iLCJzb3VyY2VzIjpbImxpYi9sYXllci9sYXllci5jb21wb25lbnQudHMiLCJsaWIvbGF5ZXIvbGF5ZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxXQUFXLEVBQ1gsTUFBTSxFQUNOLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxZQUFZLEVBQWUsTUFBTSxlQUFlLENBQUM7OztBQVMxRCxNQUFNLE9BQU8sY0FBYztJQUd6QixZQUEwQyxNQUFtQjtRQUFuQixXQUFNLEdBQU4sTUFBTSxDQUFhO0lBQUcsQ0FBQztJQUVqRSxJQUErQyxPQUFPO1FBQ3BELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDN0IsQ0FBQzs7NEVBUFUsY0FBYyx1QkFHTCxZQUFZO21EQUhyQixjQUFjO2tDQUNPLGdCQUFnQjs7Ozs7OztRQ25CbEQsaUNBQXdDOztrRERrQjNCLGNBQWM7Y0FQMUIsU0FBUztlQUFDO2dCQUNULDhDQUE4QztnQkFDOUMsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFdBQVcsRUFBRSx3QkFBd0I7Z0JBQ3JDLFNBQVMsRUFBRSxDQUFDLHdCQUF3QixDQUFDO2dCQUNyQyxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTthQUN0Qzs7c0JBSWMsTUFBTTt1QkFBQyxZQUFZO3dCQUZtQixTQUFTO2tCQUEzRCxTQUFTO21CQUFDLFdBQVcsRUFBRSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBQztZQUlGLE9BQU87a0JBQXJELFdBQVc7bUJBQUMsNEJBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBIb3N0QmluZGluZyxcbiAgSW5qZWN0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBMQVlFUl9DT05GSUcsIExheWVyQ29uZmlnIH0gZnJvbSAnLi9sYXllci50b2tlbic7XG5cbkBDb21wb25lbnQoe1xuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6Y29tcG9uZW50LXNlbGVjdG9yXG4gIHNlbGVjdG9yOiAncG9wcHktbGF5ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vbGF5ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9sYXllci5jb21wb25lbnQuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBMYXllckNvbXBvbmVudCB7XG4gIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicsIHsgcmVhZDogVmlld0NvbnRhaW5lclJlZn0pIGNvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KExBWUVSX0NPTkZJRykgcHJpdmF0ZSBjb25maWc6IExheWVyQ29uZmlnKSB7fVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MucG9wcHktbGF5ZXItLW92ZXJsYXknKSBnZXQgb3ZlcmxheSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcub3ZlcmxheTtcbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAjY29udGFpbmVyPjwvbmctY29udGFpbmVyPlxuIl19