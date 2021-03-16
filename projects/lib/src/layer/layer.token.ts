import { InjectionToken } from '@angular/core';

export const LAYER_CONFIG = new InjectionToken<LayerConfig>('layer-token');

export interface LayerConfig {
  overlay?: boolean;
}
