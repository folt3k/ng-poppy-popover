import { ElementRef } from '@angular/core';
import { PopoverService } from '../services/popover.service';
import * as i0 from "@angular/core";
export declare class PopoverRemoveOnClickDirective {
    private host;
    private popoverService;
    onClick(): void;
    constructor(host: ElementRef, popoverService: PopoverService);
    remove(): void;
    static ɵfac: i0.ɵɵFactoryDef<PopoverRemoveOnClickDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDefWithMeta<PopoverRemoveOnClickDirective, "[poppyRemoveOnClick]", never, {}, {}, never>;
}
