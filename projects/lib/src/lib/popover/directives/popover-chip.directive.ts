import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[poppy-chip]',
  exportAs: 'poppyChip'
})
export class PopoverChipDirective {
  constructor(public template: TemplateRef<any>) {}
}
