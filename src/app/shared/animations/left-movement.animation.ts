import { animate, style, transition, trigger } from '@angular/animations';

export const LEFT_MOVEMENT_ANIMATION = trigger('leftMovementAnimation', [
  transition(':enter', [
    style({ left: '{{ leftStart }}' }),
    animate(`{{ duration }} linear`, style({ left: '{{ leftEnd }}' })),
  ]),
]);
