import { Injectable, Injector, } from '@angular/core';
import { LayerComponent } from './layer.component';
import { LAYER_CONFIG } from './layer.token';
import * as i0 from "@angular/core";
export class LayerService {
    constructor(componentFactoryResolver, appRef) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.activeLayers = [];
    }
    appendToBody(component, options, injector) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LayerComponent);
        const componentRef = componentFactory.create(Injector.create([
            {
                provide: LAYER_CONFIG,
                useValue: options,
            },
        ]));
        componentRef.changeDetectorRef.detectChanges();
        const appendComponentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
        const appendComponentRef = componentRef.instance.container.createComponent(appendComponentFactory, null, injector);
        this.activeLayers.push({
            ref: componentRef,
            appendComponentRef,
            options,
        });
        this.appRef.attachView(componentRef.hostView);
        const domElem = componentRef.hostView.rootNodes[0];
        document.body.appendChild(domElem);
        return appendComponentRef;
    }
    removeFromBody(componentRef) {
        const layers = this.activeLayers.filter((layer) => layer.appendComponentRef === componentRef);
        layers.forEach((layer) => {
            const delayClose = layer.options.delayClose;
            if (delayClose !== null) {
                setTimeout(() => {
                    this.removeLayer(layer);
                }, delayClose);
            }
            else {
                this.removeLayer(layer);
            }
        });
        this.activeLayers = this.activeLayers.filter((layer) => layer.appendComponentRef !== componentRef);
    }
    removeLayer(layer) {
        this.appRef.detachView(layer.ref.hostView);
        layer.ref.changeDetectorRef.detectChanges();
        layer.ref.destroy();
    }
}
LayerService.ɵfac = function LayerService_Factory(t) { return new (t || LayerService)(i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i0.ApplicationRef)); };
LayerService.ɵprov = i0.ɵɵdefineInjectable({ token: LayerService, factory: LayerService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(LayerService, [{
        type: Injectable,
        args: [{
                providedIn: 'root',
            }]
    }], function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.ApplicationRef }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9mb2x0aS9Qcm9qZWN0cy9uZy1wb3BweS9wcm9qZWN0cy9saWIvc3JjLyIsInNvdXJjZXMiOlsibGliL2xheWVyL2xheWVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUtMLFVBQVUsRUFDVixRQUFRLEdBRVQsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBR25ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBSzdDLE1BQU0sT0FBTyxZQUFZO0lBR3ZCLFlBQ21CLHdCQUFrRCxFQUNsRCxNQUFzQjtRQUR0Qiw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQTBCO1FBQ2xELFdBQU0sR0FBTixNQUFNLENBQWdCO1FBSmpDLGlCQUFZLEdBQXVCLEVBQUUsQ0FBQztJQUszQyxDQUFDO0lBRUosWUFBWSxDQUFJLFNBQWtCLEVBQUUsT0FBMkIsRUFBRSxRQUFTO1FBQ3hFLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQy9GLE1BQU0sWUFBWSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FDMUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztZQUNkO2dCQUNFLE9BQU8sRUFBRSxZQUFZO2dCQUNyQixRQUFRLEVBQUUsT0FBTzthQUNsQjtTQUNGLENBQUMsQ0FDSCxDQUFDO1FBRUYsWUFBWSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxDQUFDO1FBRS9DLE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hHLE1BQU0sa0JBQWtCLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUN4RSxzQkFBc0IsRUFDdEIsSUFBSSxFQUNKLFFBQVEsQ0FDVCxDQUFDO1FBRUYsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7WUFDckIsR0FBRyxFQUFFLFlBQVk7WUFDakIsa0JBQWtCO1lBQ2xCLE9BQU87U0FDUixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsTUFBTSxPQUFPLEdBQUksWUFBWSxDQUFDLFFBQXFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBZ0IsQ0FBQztRQUNoRyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVuQyxPQUFPLGtCQUFrQixDQUFDO0lBQzVCLENBQUM7SUFFRCxjQUFjLENBQUksWUFBNkI7UUFDN0MsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsS0FBSyxZQUFZLENBQUMsQ0FBQztRQUU5RixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDdkIsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7WUFDNUMsSUFBSSxVQUFVLEtBQUssSUFBSSxFQUFFO2dCQUN2QixVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNkLElBQUksQ0FBQyxXQUFXLENBQUksS0FBSyxDQUFDLENBQUM7Z0JBQzdCLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQzthQUNoQjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsV0FBVyxDQUFJLEtBQUssQ0FBQyxDQUFDO2FBQzVCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEtBQUssWUFBWSxDQUFDLENBQUM7SUFDckcsQ0FBQztJQUVPLFdBQVcsQ0FBSSxLQUFxQjtRQUMxQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLEtBQUssQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDNUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN0QixDQUFDOzt3RUE5RFUsWUFBWTtvREFBWixZQUFZLFdBQVosWUFBWSxtQkFGWCxNQUFNO2tEQUVQLFlBQVk7Y0FIeEIsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQXBwbGljYXRpb25SZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQ29tcG9uZW50UmVmLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIEluamVjdGFibGUsXG4gIEluamVjdG9yLFxuICBUeXBlLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IExheWVyQ29tcG9uZW50IH0gZnJvbSAnLi9sYXllci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWN0aXZlTGF5ZXIgfSBmcm9tICcuL2xheWVyLmludGVyZmFjZSc7XG5pbXBvcnQgeyBMYXllckFwcGVuZE9wdGlvbnMgfSBmcm9tICcuL2xheWVyLm1vZGVsJztcbmltcG9ydCB7IExBWUVSX0NPTkZJRyB9IGZyb20gJy4vbGF5ZXIudG9rZW4nO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTGF5ZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBhY3RpdmVMYXllcnM6IEFjdGl2ZUxheWVyPGFueT5bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSByZWFkb25seSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmXG4gICkge31cblxuICBhcHBlbmRUb0JvZHk8VD4oY29tcG9uZW50OiBUeXBlPFQ+LCBvcHRpb25zOiBMYXllckFwcGVuZE9wdGlvbnMsIGluamVjdG9yPyk6IENvbXBvbmVudFJlZjxUPiB7XG4gICAgY29uc3QgY29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KExheWVyQ29tcG9uZW50KTtcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSBjb21wb25lbnRGYWN0b3J5LmNyZWF0ZShcbiAgICAgIEluamVjdG9yLmNyZWF0ZShbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBMQVlFUl9DT05GSUcsXG4gICAgICAgICAgdXNlVmFsdWU6IG9wdGlvbnMsXG4gICAgICAgIH0sXG4gICAgICBdKVxuICAgICk7XG5cbiAgICBjb21wb25lbnRSZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuXG4gICAgY29uc3QgYXBwZW5kQ29tcG9uZW50RmFjdG9yeSA9IHRoaXMuY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KGNvbXBvbmVudCk7XG4gICAgY29uc3QgYXBwZW5kQ29tcG9uZW50UmVmID0gY29tcG9uZW50UmVmLmluc3RhbmNlLmNvbnRhaW5lci5jcmVhdGVDb21wb25lbnQoXG4gICAgICBhcHBlbmRDb21wb25lbnRGYWN0b3J5LFxuICAgICAgbnVsbCxcbiAgICAgIGluamVjdG9yXG4gICAgKTtcblxuICAgIHRoaXMuYWN0aXZlTGF5ZXJzLnB1c2goe1xuICAgICAgcmVmOiBjb21wb25lbnRSZWYsXG4gICAgICBhcHBlbmRDb21wb25lbnRSZWYsXG4gICAgICBvcHRpb25zLFxuICAgIH0pO1xuXG4gICAgdGhpcy5hcHBSZWYuYXR0YWNoVmlldyhjb21wb25lbnRSZWYuaG9zdFZpZXcpO1xuICAgIGNvbnN0IGRvbUVsZW0gPSAoY29tcG9uZW50UmVmLmhvc3RWaWV3IGFzIEVtYmVkZGVkVmlld1JlZjx1bmtub3duPikucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZG9tRWxlbSk7XG5cbiAgICByZXR1cm4gYXBwZW5kQ29tcG9uZW50UmVmO1xuICB9XG5cbiAgcmVtb3ZlRnJvbUJvZHk8VD4oY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8VD4pOiB2b2lkIHtcbiAgICBjb25zdCBsYXllcnMgPSB0aGlzLmFjdGl2ZUxheWVycy5maWx0ZXIoKGxheWVyKSA9PiBsYXllci5hcHBlbmRDb21wb25lbnRSZWYgPT09IGNvbXBvbmVudFJlZik7XG5cbiAgICBsYXllcnMuZm9yRWFjaCgobGF5ZXIpID0+IHtcbiAgICAgIGNvbnN0IGRlbGF5Q2xvc2UgPSBsYXllci5vcHRpb25zLmRlbGF5Q2xvc2U7XG4gICAgICBpZiAoZGVsYXlDbG9zZSAhPT0gbnVsbCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLnJlbW92ZUxheWVyPFQ+KGxheWVyKTtcbiAgICAgICAgfSwgZGVsYXlDbG9zZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbW92ZUxheWVyPFQ+KGxheWVyKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYWN0aXZlTGF5ZXJzID0gdGhpcy5hY3RpdmVMYXllcnMuZmlsdGVyKChsYXllcikgPT4gbGF5ZXIuYXBwZW5kQ29tcG9uZW50UmVmICE9PSBjb21wb25lbnRSZWYpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVMYXllcjxUPihsYXllcjogQWN0aXZlTGF5ZXI8VD4pOiB2b2lkIHtcbiAgICB0aGlzLmFwcFJlZi5kZXRhY2hWaWV3KGxheWVyLnJlZi5ob3N0Vmlldyk7XG4gICAgbGF5ZXIucmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICBsYXllci5yZWYuZGVzdHJveSgpO1xuICB9XG59XG4iXX0=