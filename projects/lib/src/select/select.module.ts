import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectComponent } from './select.component';
import { SelectChipDirective, SelectChipRemoveDirective, SelectOptionDirective } from './directives';
import { PopoverModule } from '../popover/popover.module';

@NgModule({
  declarations: [SelectComponent, SelectOptionDirective, SelectChipDirective, SelectChipRemoveDirective],
  imports: [CommonModule, PopoverModule],
  exports: [SelectComponent, SelectOptionDirective, SelectChipDirective, SelectChipRemoveDirective],
})
export class SelectModule {}
