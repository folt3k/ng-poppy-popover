import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipComponent } from './tooltip.component';
import { BasicUsageComponent } from './examples/basic-usage/basic-usage.component';
import { SharedModule } from '../../shared/shared.module';
import { TemplateComponent } from './examples/template/template.component';

@NgModule({
  declarations: [TooltipComponent, BasicUsageComponent, TemplateComponent],
  imports: [CommonModule, SharedModule],
  exports: [TooltipComponent],
})
export class TooltipModule {}
