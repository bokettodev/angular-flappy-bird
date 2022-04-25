import { animate, AnimationMetadata, style } from '@angular/animations';

export const TRANSLATE_X_ANIMATION: AnimationMetadata[] = [
  style({ transform: `*` }),
  animate(`{{ duration }} {{ timing }}`, style({ transform: `translateX({{ to }})` })),
];
