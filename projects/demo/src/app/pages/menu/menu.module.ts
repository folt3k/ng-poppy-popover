import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu.component';
import { SharedModule } from '../../shared/shared.module';
import { BasicUsageComponent } from './examples/basic-usage/basic-usage.component';

@NgModule({
  declarations: [MenuComponent, BasicUsageComponent],
  imports: [CommonModule, SharedModule],
  exports: [MenuComponent],
})
export class MenuModule {}
