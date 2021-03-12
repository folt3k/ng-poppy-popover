import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Type } from '@angular/core';
import { LayerAppendOptions } from './layer.model';
import * as i0 from "@angular/core";
export declare class LayerService {
    private readonly componentFactoryResolver;
    private readonly appRef;
    private activeLayers;
    constructor(componentFactoryResolver: ComponentFactoryResolver, appRef: ApplicationRef);
    appendToBody<T>(component: Type<T>, options: LayerAppendOptions, injector?: any): ComponentRef<T>;
    removeFromBody<T>(componentRef: ComponentRef<T>): void;
    private removeLayer;
    static ɵfac: i0.ɵɵFactoryDef<LayerService, never>;
    static ɵprov: i0.ɵɵInjectableDef<LayerService>;
}
