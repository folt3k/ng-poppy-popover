import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopoverContentComponent } from './components/popover-content/popover-content.component';
import { LayerModule } from '../layer/layer.module';
import { PopoverMenuComponent } from './components/popover-menu/popover-menu.component';
import { PopoverSelectComponent } from './components/popover-select/popover-select.component';
import {
  TooltipDirective,
  PopoverDirective,
  PopoverChipDirective,
  PopoverChipRemoveDirective,
  PopoverMenuDirective,
  PopoverMenuItemDirective,
  PopoverOptionDirective,
  PopoverRemoveOnClickDirective,
} from './directives';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    PopoverDirective,
    PopoverMenuDirective,
    PopoverContentComponent,
    PopoverMenuItemDirective,
    PopoverMenuComponent,
    PopoverSelectComponent,
    PopoverChipDirective,
    PopoverChipRemoveDirective,
    PopoverRemoveOnClickDirective,
    PopoverOptionDirective,
    TooltipDirective,
  ],
  imports: [CommonModule, BrowserAnimationsModule, LayerModule],
  exports: [
    PopoverDirective,
    PopoverMenuDirective,
    PopoverMenuItemDirective,
    PopoverMenuComponent,
    PopoverSelectComponent,
    PopoverChipDirective,
    PopoverChipRemoveDirective,
    PopoverRemoveOnClickDirective,
    PopoverOptionDirective,
    TooltipDirective,
  ],
})
export class PopoverModule {}
