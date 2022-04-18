import { animate, AnimationMetadata, style, transition, trigger } from '@angular/animations';

export const TRANSLATE_X_ANIMATION: AnimationMetadata[] = [
  style({ transform: `translateX({{ from }})` }),
  animate(`{{ duration }} linear`, style({ transform: `translateX({{ to }})` })),
];

export const TRANSLATE_X_ON_ENTER_ANIMATION_TRIGGER = trigger('translateXOnEnterAnimation', [
  transition(':enter', TRANSLATE_X_ANIMATION),
]);
