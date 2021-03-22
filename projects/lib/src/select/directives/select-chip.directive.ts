import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[poppy-chip]',
  exportAs: 'poppyChip'
})
export class SelectChipDirective {
  constructor(public template: TemplateRef<any>) {}
}
