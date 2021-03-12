import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverModule } from 'lib';

import { CodeSnippetComponent } from './code-snippet/code-snippet.component';
import { DemoWidgetComponent } from './demo-widget/demo-widget.component';

@NgModule({
  declarations: [CodeSnippetComponent, DemoWidgetComponent],
  imports: [CommonModule, PopoverModule],
  exports: [CodeSnippetComponent, DemoWidgetComponent, PopoverModule],
})
export class SharedModule {}
