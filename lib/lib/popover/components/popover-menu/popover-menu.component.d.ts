import { QueryList, TemplateRef } from '@angular/core';
import { PopoverMenuItemDirective } from '../../directives/popover-menu-item.directive';
import * as i0 from "@angular/core";
export declare class PopoverMenuComponent {
    menuItems: QueryList<PopoverMenuItemDirective>;
    templateRef: TemplateRef<any>;
    constructor();
    static ɵfac: i0.ɵɵFactoryDef<PopoverMenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDefWithMeta<PopoverMenuComponent, "poppy-menu", ["poppyMenu"], {}, {}, ["menuItems"], ["*"]>;
}
