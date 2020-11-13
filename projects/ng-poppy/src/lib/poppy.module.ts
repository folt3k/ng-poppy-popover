import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopoverModule } from './popover/popover.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, PopoverModule],
  exports: [PopoverModule],
})
export class PoppyModule {}
