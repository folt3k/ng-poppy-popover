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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2ZvbHRpL1Byb2plY3RzL25nLXBvcHB5L3Byb2plY3RzL2xpYi9zcmMvIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvbGF5ZXIuY29tcG9uZW50LnRzIiwibGliL2xheWVyL2xheWVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsV0FBVyxFQUNYLE1BQU0sRUFDTixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNsQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsWUFBWSxFQUFlLE1BQU0sZUFBZSxDQUFDOzs7QUFTMUQsTUFBTSxPQUFPLGNBQWM7SUFHekIsWUFBMEMsTUFBbUI7UUFBbkIsV0FBTSxHQUFOLE1BQU0sQ0FBYTtJQUFHLENBQUM7SUFFakUsSUFBK0MsT0FBTztRQUNwRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQzdCLENBQUM7OzRFQVBVLGNBQWMsdUJBR0wsWUFBWTttREFIckIsY0FBYztrQ0FDTyxnQkFBZ0I7Ozs7Ozs7UUNuQmxELGlDQUF3Qzs7a0REa0IzQixjQUFjO2NBUDFCLFNBQVM7ZUFBQztnQkFDVCw4Q0FBOEM7Z0JBQzlDLFFBQVEsRUFBRSxhQUFhO2dCQUN2QixXQUFXLEVBQUUsd0JBQXdCO2dCQUNyQyxTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztnQkFDckMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7YUFDdEM7O3NCQUljLE1BQU07dUJBQUMsWUFBWTt3QkFGbUIsU0FBUztrQkFBM0QsU0FBUzttQkFBQyxXQUFXLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUM7WUFJRixPQUFPO2tCQUFyRCxXQUFXO21CQUFDLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSG9zdEJpbmRpbmcsXG4gIEluamVjdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTEFZRVJfQ09ORklHLCBMYXllckNvbmZpZyB9IGZyb20gJy4vbGF5ZXIudG9rZW4nO1xuXG5AQ29tcG9uZW50KHtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOmNvbXBvbmVudC1zZWxlY3RvclxuICBzZWxlY3RvcjogJ3BvcHB5LWxheWVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2xheWVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbGF5ZXIuY29tcG9uZW50LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgTGF5ZXJDb21wb25lbnQge1xuICBAVmlld0NoaWxkKCdjb250YWluZXInLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWZ9KSBjb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChMQVlFUl9DT05GSUcpIHByaXZhdGUgY29uZmlnOiBMYXllckNvbmZpZykge31cblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnBvcHB5LWxheWVyLS1vdmVybGF5JykgZ2V0IG92ZXJsYXkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnLm92ZXJsYXk7XG4gIH1cbn1cbiIsIjxuZy1jb250YWluZXIgI2NvbnRhaW5lcj48L25nLWNvbnRhaW5lcj5cbiJdfQ==