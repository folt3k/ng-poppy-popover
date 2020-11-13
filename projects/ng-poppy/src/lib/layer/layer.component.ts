import {
  Component,
  HostBinding,
  Inject,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';

import { LAYER_CONFIG, LayerConfig } from './layer.token';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'poppy-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LayerComponent {
  @ViewChild('container', { read: ViewContainerRef}) container: ViewContainerRef;

  constructor(@Inject(LAYER_CONFIG) private config: LayerConfig) {}

  @HostBinding('class.poppy-layer--overlay') get overlay(): boolean {
    return this.config.overlay;
  }
}
