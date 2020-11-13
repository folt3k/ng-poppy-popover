import { ILayerAppendOptions } from './layer.interface';

export class LayerAppendOptions {
  delayClose: number;
  overlay: boolean;

  constructor(options: ILayerAppendOptions = {}) {
    this.delayClose = Number.isInteger(options.delayClose) ? options.delayClose : null;
    this.overlay = !!options.overlay;
  }
}
