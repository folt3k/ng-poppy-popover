import { NgZone } from '@angular/core';
import { IPopoverEventService } from '../popover.interface';
import { ActivePopover } from '../models/popover-active.model';
import * as i0 from "@angular/core";
export declare type PopoverEventType = 'click-outside' | 'resize' | 'capture-scroll';
export declare class PopoverEventsService implements IPopoverEventService {
    private ngZone;
    private registeredEvents;
    constructor(ngZone: NgZone);
    register(type: PopoverEventType, activePopover: ActivePopover, callback: (event: Event) => void | any): void;
    unregister(type: PopoverEventType, activePopover: ActivePopover): void;
    subscribe(type: PopoverEventType, popover: ActivePopover): void;
    unsubscribe(type: PopoverEventType, popover: ActivePopover): void;
    private getEventObservable;
    static ɵfac: i0.ɵɵFactoryDef<PopoverEventsService, never>;
    static ɵprov: i0.ɵɵInjectableDef<PopoverEventsService>;
}
