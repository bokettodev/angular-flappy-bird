import { animate, AnimationMetadata, style } from '@angular/animations';

export const TRANSLATE_Y_ANIMATION: AnimationMetadata[] = [
  style({ transform: `*` }),
  animate(`{{ duration }} {{ timing }}`, style({ transform: `translateY({{ to }})` })),
];
