import { animate, state, style, transition, trigger } from '@angular/animations';

export const fadeInAnimation = trigger('fadeIn', [
  state(
    'open',
    style({
      transform: 'translateY(0px)',
      opacity: 1,
    })
  ),
  state(
    'close',
    style({
      transform: 'translateY(-6px)',
      opacity: 0.5,
    })
  ),
  transition('close => open', [animate('0.15s')]),
]);
