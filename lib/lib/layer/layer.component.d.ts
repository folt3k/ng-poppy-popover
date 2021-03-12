import { ViewContainerRef } from '@angular/core';
import { LayerConfig } from './layer.token';
import * as i0 from "@angular/core";
export declare class LayerComponent {
    private config;
    container: ViewContainerRef;
    constructor(config: LayerConfig);
    get overlay(): boolean;
    static ɵfac: i0.ɵɵFactoryDef<LayerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<LayerComponent, "poppy-layer", never, {}, {}, never, never>;
}
