import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type,
} from '@angular/core';
import { LayerComponent } from './layer.component';
import { ActiveLayer } from './layer.interface';
import { LayerAppendOptions } from './layer.model';
import { LAYER_CONFIG } from './layer.token';

@Injectable({
  providedIn: 'root',
})
export class LayerService {
  private activeLayers: ActiveLayer<any>[] = [];

  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly appRef: ApplicationRef
  ) {}

  appendToBody<T>(component: Type<T>, options: LayerAppendOptions, injector?): ComponentRef<T> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(LayerComponent);
    const componentRef = componentFactory.create(
      Injector.create([
        {
          provide: LAYER_CONFIG,
          useValue: options,
        },
      ])
    );

    componentRef.changeDetectorRef.detectChanges();

    const appendComponentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const appendComponentRef = componentRef.instance.container.createComponent(
      appendComponentFactory,
      null,
      injector
    );

    this.activeLayers.push({
      ref: componentRef,
      appendComponentRef,
      options,
    });

    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<unknown>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    return appendComponentRef;
  }

  removeFromBody<T>(componentRef: ComponentRef<T>): void {
    const layers = this.activeLayers.filter((layer) => layer.appendComponentRef === componentRef);

    layers.forEach((layer) => {
      const delayClose = layer.options.delayClose;
      if (delayClose !== null) {
        setTimeout(() => {
          this.removeLayer<T>(layer);
        }, delayClose);
      } else {
        this.removeLayer<T>(layer);
      }
    });

    this.activeLayers = this.activeLayers.filter((layer) => layer.appendComponentRef !== componentRef);
  }

  private removeLayer<T>(layer: ActiveLayer<T>): void {
    this.appRef.detachView(layer.ref.hostView);
    layer.ref.changeDetectorRef.detectChanges();
    layer.ref.destroy();
  }
}
