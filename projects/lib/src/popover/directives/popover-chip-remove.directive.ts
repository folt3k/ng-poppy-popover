import { Directive, Input, HostListener } from '@angular/core';
import { PopoverSelectComponent } from '../components/popover-select/popover-select.component';

@Directive({
  selector: '[poppyChipRemove]'
})
export class PopoverChipRemoveDirective {
  @Input() poppyChipRemove: any;

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    this.remove(event);
  }

  constructor(private selectComponentRef: PopoverSelectComponent) {}

  remove(event: Event): void {
    if (this.selectComponentRef) {
      this.selectComponentRef.closeChip(this.poppyChipRemove, event);
    }
  }
}
