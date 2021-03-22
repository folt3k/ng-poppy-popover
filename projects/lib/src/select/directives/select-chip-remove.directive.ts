import { Directive, Input, HostListener } from '@angular/core';
import { SelectComponent } from '../select.component';

@Directive({
  selector: '[poppyChipRemove]',
})
export class SelectChipRemoveDirective {
  @Input() poppyChipRemove: any;

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    this.remove(event);
  }

  constructor(private selectComponentRef: SelectComponent) {}

  remove(event: Event): void {
    if (this.selectComponentRef) {
      this.selectComponentRef.closeChip(this.poppyChipRemove, event);
    }
  }
}
