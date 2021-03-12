import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicUsageComponent } from './examples/basic-usage/basic-usage.component';
import { BasicComponent } from './basic.component';
import { SharedModule } from '../../shared/shared.module';
import { HoverComponent } from './examples/hover/hover.component';
import { ManualComponent } from './examples/manual/manual.component';
import { CustomPositionComponent } from './examples/custom-position/custom-position.component';

@NgModule({
  declarations: [
    BasicUsageComponent,
    BasicComponent,
    HoverComponent,
    ManualComponent,
    CustomPositionComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [BasicComponent],
})
export class BasicModule {}
