import { Directive, ElementRef, HostListener } from '@angular/core';
import { PopoverService } from '../services/popover.service';
@Directive({
  selector: '[poppyRemoveOnClick]',
})
export class PopoverRemoveOnClickDirective {
  @HostListener('click', ['$event'])
  onClick(): void {
    this.remove();
  }

  constructor(private host: ElementRef, private popoverService: PopoverService) {}

  remove(): void {
    setTimeout(() => {
      const parentElement = this.host.nativeElement.closest('poppy-popover');
      this.popoverService.removeByNativeElementRef(parentElement);
    });
  }
}
