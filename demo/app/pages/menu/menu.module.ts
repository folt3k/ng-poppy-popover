import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu.component';
import { SharedModule } from '../../shared/shared.module';
import { BasicUsageComponent } from './examples/basic-usage/basic-usage.component';
import { NestedMenuComponent } from './examples/nested-menu/nested-menu.component';
import { ContextMenuComponent } from './examples/context-menu/context-menu.component';

@NgModule({
  declarations: [MenuComponent, BasicUsageComponent, NestedMenuComponent, ContextMenuComponent],
  imports: [CommonModule, SharedModule],
  exports: [MenuComponent],
})
export class MenuModule {}
