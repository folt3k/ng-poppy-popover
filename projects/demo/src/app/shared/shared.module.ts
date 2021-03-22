import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverModule, SelectModule } from 'lib';

import { CodeSnippetComponent } from './code-snippet/code-snippet.component';
import { DemoWidgetComponent } from './demo-widget/demo-widget.component';

@NgModule({
  declarations: [CodeSnippetComponent, DemoWidgetComponent],
  imports: [CommonModule, PopoverModule, SelectModule],
  exports: [CodeSnippetComponent, DemoWidgetComponent, PopoverModule, SelectModule],
})
export class SharedModule {}
