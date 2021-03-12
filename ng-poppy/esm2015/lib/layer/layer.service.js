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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIvaG9tZS9mb2x0aS9Qcm9qZWN0cy9uZy1wb3BweS9wcm9qZWN0cy9uZy1wb3BweS9zcmMvIiwic291cmNlcyI6WyJsaWIvbGF5ZXIvbGF5ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBS0wsVUFBVSxFQUNWLFFBQVEsR0FFVCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFHbkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFLN0MsTUFBTSxPQUFPLFlBQVk7SUFHdkIsWUFDbUIsd0JBQWtELEVBQ2xELE1BQXNCO1FBRHRCLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFKakMsaUJBQVksR0FBdUIsRUFBRSxDQUFDO0lBSzNDLENBQUM7SUFFSixZQUFZLENBQUksU0FBa0IsRUFBRSxPQUEyQixFQUFFLFFBQVM7UUFDeEUsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDL0YsTUFBTSxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxDQUMxQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQ2Q7Z0JBQ0UsT0FBTyxFQUFFLFlBQVk7Z0JBQ3JCLFFBQVEsRUFBRSxPQUFPO2FBQ2xCO1NBQ0YsQ0FBQyxDQUNILENBQUM7UUFFRixZQUFZLENBQUMsaUJBQWlCLENBQUMsYUFBYSxFQUFFLENBQUM7UUFFL0MsTUFBTSxzQkFBc0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDaEcsTUFBTSxrQkFBa0IsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQ3hFLHNCQUFzQixFQUN0QixJQUFJLEVBQ0osUUFBUSxDQUNULENBQUM7UUFFRixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztZQUNyQixHQUFHLEVBQUUsWUFBWTtZQUNqQixrQkFBa0I7WUFDbEIsT0FBTztTQUNSLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5QyxNQUFNLE9BQU8sR0FBSSxZQUFZLENBQUMsUUFBcUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFnQixDQUFDO1FBQ2hHLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRW5DLE9BQU8sa0JBQWtCLENBQUM7SUFDNUIsQ0FBQztJQUVELGNBQWMsQ0FBSSxZQUE2QjtRQUM3QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLGtCQUFrQixLQUFLLFlBQVksQ0FBQyxDQUFDO1FBRTlGLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN2QixNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztZQUM1QyxJQUFJLFVBQVUsS0FBSyxJQUFJLEVBQUU7Z0JBQ3ZCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBSSxLQUFLLENBQUMsQ0FBQztnQkFDN0IsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQ2hCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxXQUFXLENBQUksS0FBSyxDQUFDLENBQUM7YUFDNUI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsS0FBSyxZQUFZLENBQUMsQ0FBQztJQUNyRyxDQUFDO0lBRU8sV0FBVyxDQUFJLEtBQXFCO1FBQzFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsS0FBSyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUM1QyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3RCLENBQUM7O3dFQTlEVSxZQUFZO29EQUFaLFlBQVksV0FBWixZQUFZLG1CQUZYLE1BQU07a0RBRVAsWUFBWTtjQUh4QixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBcHBsaWNhdGlvblJlZixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICBDb21wb25lbnRSZWYsXG4gIEVtYmVkZGVkVmlld1JlZixcbiAgSW5qZWN0YWJsZSxcbiAgSW5qZWN0b3IsXG4gIFR5cGUsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTGF5ZXJDb21wb25lbnQgfSBmcm9tICcuL2xheWVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBY3RpdmVMYXllciB9IGZyb20gJy4vbGF5ZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IExheWVyQXBwZW5kT3B0aW9ucyB9IGZyb20gJy4vbGF5ZXIubW9kZWwnO1xuaW1wb3J0IHsgTEFZRVJfQ09ORklHIH0gZnJvbSAnLi9sYXllci50b2tlbic7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBMYXllclNlcnZpY2Uge1xuICBwcml2YXRlIGFjdGl2ZUxheWVyczogQWN0aXZlTGF5ZXI8YW55PltdID0gW107XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSBjb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIHJlYWRvbmx5IGFwcFJlZjogQXBwbGljYXRpb25SZWZcbiAgKSB7fVxuXG4gIGFwcGVuZFRvQm9keTxUPihjb21wb25lbnQ6IFR5cGU8VD4sIG9wdGlvbnM6IExheWVyQXBwZW5kT3B0aW9ucywgaW5qZWN0b3I/KTogQ29tcG9uZW50UmVmPFQ+IHtcbiAgICBjb25zdCBjb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoTGF5ZXJDb21wb25lbnQpO1xuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IGNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKFxuICAgICAgSW5qZWN0b3IuY3JlYXRlKFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IExBWUVSX0NPTkZJRyxcbiAgICAgICAgICB1c2VWYWx1ZTogb3B0aW9ucyxcbiAgICAgICAgfSxcbiAgICAgIF0pXG4gICAgKTtcblxuICAgIGNvbXBvbmVudFJlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG5cbiAgICBjb25zdCBhcHBlbmRDb21wb25lbnRGYWN0b3J5ID0gdGhpcy5jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoY29tcG9uZW50KTtcbiAgICBjb25zdCBhcHBlbmRDb21wb25lbnRSZWYgPSBjb21wb25lbnRSZWYuaW5zdGFuY2UuY29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChcbiAgICAgIGFwcGVuZENvbXBvbmVudEZhY3RvcnksXG4gICAgICBudWxsLFxuICAgICAgaW5qZWN0b3JcbiAgICApO1xuXG4gICAgdGhpcy5hY3RpdmVMYXllcnMucHVzaCh7XG4gICAgICByZWY6IGNvbXBvbmVudFJlZixcbiAgICAgIGFwcGVuZENvbXBvbmVudFJlZixcbiAgICAgIG9wdGlvbnMsXG4gICAgfSk7XG5cbiAgICB0aGlzLmFwcFJlZi5hdHRhY2hWaWV3KGNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XG4gICAgY29uc3QgZG9tRWxlbSA9IChjb21wb25lbnRSZWYuaG9zdFZpZXcgYXMgRW1iZWRkZWRWaWV3UmVmPHVua25vd24+KS5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkb21FbGVtKTtcblxuICAgIHJldHVybiBhcHBlbmRDb21wb25lbnRSZWY7XG4gIH1cblxuICByZW1vdmVGcm9tQm9keTxUPihjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxUPik6IHZvaWQge1xuICAgIGNvbnN0IGxheWVycyA9IHRoaXMuYWN0aXZlTGF5ZXJzLmZpbHRlcigobGF5ZXIpID0+IGxheWVyLmFwcGVuZENvbXBvbmVudFJlZiA9PT0gY29tcG9uZW50UmVmKTtcblxuICAgIGxheWVycy5mb3JFYWNoKChsYXllcikgPT4ge1xuICAgICAgY29uc3QgZGVsYXlDbG9zZSA9IGxheWVyLm9wdGlvbnMuZGVsYXlDbG9zZTtcbiAgICAgIGlmIChkZWxheUNsb3NlICE9PSBudWxsKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMucmVtb3ZlTGF5ZXI8VD4obGF5ZXIpO1xuICAgICAgICB9LCBkZWxheUNsb3NlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGF5ZXI8VD4obGF5ZXIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5hY3RpdmVMYXllcnMgPSB0aGlzLmFjdGl2ZUxheWVycy5maWx0ZXIoKGxheWVyKSA9PiBsYXllci5hcHBlbmRDb21wb25lbnRSZWYgIT09IGNvbXBvbmVudFJlZik7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUxheWVyPFQ+KGxheWVyOiBBY3RpdmVMYXllcjxUPik6IHZvaWQge1xuICAgIHRoaXMuYXBwUmVmLmRldGFjaFZpZXcobGF5ZXIucmVmLmhvc3RWaWV3KTtcbiAgICBsYXllci5yZWYuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIGxheWVyLnJlZi5kZXN0cm95KCk7XG4gIH1cbn1cbiJdfQ==