import { animate, style, transition, trigger } from '@angular/animations';

export const TRANSLATE_X_ON_ENTER_ANIMATION = trigger('translateXOnEnterAnimation', [
  transition(':enter', [
    style({ transform: 'translateX({{ from }})' }),
    animate(`{{ duration }} linear`, style({ transform: 'translateX({{ to }})' })),
  ]),
]);
