import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SelectComponent } from './select.component';
import { SharedModule } from '../../shared/shared.module';
import { BasicUsageComponent } from './examples/basic-usage/basic-usage.component';

@NgModule({
  declarations: [SelectComponent, BasicUsageComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  exports: [SelectComponent],
})
export class SelectModule {}
