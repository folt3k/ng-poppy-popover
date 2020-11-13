import { Injectable, NgZone } from '@angular/core';
import { IPopoverEventService } from '../popover.interface';
import { Subscription, Observable, merge, fromEvent } from 'rxjs';
import { ActivePopover } from '../models/popover-active.model';
import { tap } from 'rxjs/operators';

export type PopoverEventType = 'click-outside' | 'resize' | 'capture-scroll';

interface PopoverRegisteredEvent {
  sub: Subscription;
  popover: ActivePopover;
  type: PopoverEventType;
  callback?: (args?) => void | any;
}

@Injectable({ providedIn: 'root' })
export class PopoverEventsService implements IPopoverEventService {
  private registeredEvents: PopoverRegisteredEvent[] = [];

  constructor(private ngZone: NgZone) {}

  register(
    type: PopoverEventType,
    activePopover: ActivePopover,
    callback: (event: Event) => void | any
  ): void {
    let sub: Subscription;

    this.ngZone.runOutsideAngular(() => {
      const obs: Observable<Event> = this.getEventObservable(type);
      sub = obs.subscribe((event) => {
        callback(event);
      });
    });

    this.registeredEvents.push({ popover: activePopover, type, sub, callback });
  }

  unregister(type: PopoverEventType, activePopover: ActivePopover): void {
    this.registeredEvents
      .filter((event) => event.type === type)
      .forEach((event) => {
        if (event.popover === activePopover) {
          event.sub.unsubscribe();
        }
      });
    this.registeredEvents = this.registeredEvents.filter((event) =>
      event.type === type ? event.popover !== activePopover : true
    );
  }

  subscribe(type: PopoverEventType, popover: ActivePopover): void {
    const obs: Observable<Event> = this.getEventObservable(type);

    this.registeredEvents
      .filter((event) => event.type === type && event.popover === popover && event.sub?.closed)
      .forEach((event) => {
        event.sub = obs.subscribe((e) => event.callback(e));
      });
  }

  unsubscribe(type: PopoverEventType, popover: ActivePopover): void {
    this.registeredEvents
      .filter((event) => event.type === type && event.popover === popover)
      .forEach((event) => {
        event.sub.unsubscribe();
      });
  }

  private getEventObservable(type: PopoverEventType): Observable<Event> {
    switch (type) {
      case 'click-outside':
        return merge(fromEvent(document, 'click'), fromEvent(document, 'contextmenu'))
          .pipe
          // tap(() => console.log('listen for click outside..'))
          ();
      case 'capture-scroll':
        return fromEvent<MouseEvent>(document, 'scroll').pipe(
          tap(() => {
            // console.log('Capturing scroll event..');
          })
        );
      case 'resize':
        return fromEvent<MouseEvent>(window, 'resize').pipe(
          tap(() => {
            // console.log('Resize event..');
          })
        );
    }
  }
}
