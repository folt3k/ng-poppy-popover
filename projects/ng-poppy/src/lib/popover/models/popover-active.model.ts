import { ComponentRef } from '@angular/core';

import { PopoverType } from '../popover.interface';
import { PopoverContentComponent } from '../components/popover-content/popover-content.component';
import { BasePopoverDirective } from '../directives/base-popover';

export class ActivePopover {
  isMenuParent: boolean;
  isSuperparent: boolean;
  isSubmenu: boolean;

  constructor(
    public popoverRef: ComponentRef<PopoverContentComponent>,
    public parentPopoverRef: ComponentRef<PopoverContentComponent>,
    public superParentPopoverRef: ComponentRef<PopoverContentComponent>,
    public directiveRef: BasePopoverDirective,
    public type: PopoverType,
    public deepLevel: number
  ) {
    this.isMenuParent = type === 'menu';
    this.isSubmenu = type === 'submenu';
    this.isSuperparent = this.popoverRef === this.superParentPopoverRef;
  }
}
