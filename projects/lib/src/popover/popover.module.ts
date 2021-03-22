import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopoverContentComponent } from './components/popover-content/popover-content.component';
import { LayerModule } from '../layer/layer.module';
import { PopoverMenuComponent } from './components/popover-menu/popover-menu.component';
import {
  TooltipDirective,
  PopoverDirective,
  PopoverMenuDirective,
  PopoverMenuItemDirective,
  PopoverRemoveOnClickDirective,
} from './directives';

@NgModule({
  declarations: [
    PopoverDirective,
    PopoverMenuDirective,
    PopoverContentComponent,
    PopoverMenuItemDirective,
    PopoverMenuComponent,
    PopoverRemoveOnClickDirective,
    TooltipDirective,
  ],
  imports: [CommonModule, LayerModule],
  exports: [
    PopoverDirective,
    PopoverMenuDirective,
    PopoverMenuItemDirective,
    PopoverMenuComponent,
    PopoverRemoveOnClickDirective,
    TooltipDirective,
  ],
})
export class PopoverModule {}
