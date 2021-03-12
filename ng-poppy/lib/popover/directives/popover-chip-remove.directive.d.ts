import { PopoverSelectComponent } from '../components/popover-select/popover-select.component';
import * as i0 from "@angular/core";
export declare class PopoverChipRemoveDirective {
    private selectComponentRef;
    poppyChipRemove: any;
    onClick(event: Event): void;
    constructor(selectComponentRef: PopoverSelectComponent);
    remove(event: Event): void;
    static ɵfac: i0.ɵɵFactoryDef<PopoverChipRemoveDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<PopoverChipRemoveDirective, "[poppyChipRemove]", never, { "poppyChipRemove": "poppyChipRemove"; }, {}, never>;
}
