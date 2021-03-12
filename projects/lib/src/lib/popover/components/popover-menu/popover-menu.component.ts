import { QueryList, ContentChildren, Component, TemplateRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { PopoverMenuItemDirective } from '../../directives/popover-menu-item.directive';

@Component({
  selector: 'poppy-menu',
  exportAs: 'poppyMenu',
  templateUrl: './popover-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverMenuComponent {
  @ContentChildren(PopoverMenuItemDirective) menuItems: QueryList<PopoverMenuItemDirective>;
  @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

  constructor() {}
}
