import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[poppy-option]',
  exportAs: 'poppyOption',
})
export class SelectOptionDirective {
  constructor(public template: TemplateRef<any>) {}
}
