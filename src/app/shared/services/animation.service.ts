import { AnimationBuilder, AnimationFactory } from '@angular/animations';
import { Injectable } from '@angular/core';
import { TRANSLATE_X_ANIMATION } from '@shared/animations';

@Injectable({ providedIn: 'root' })
export class AnimationService {
  constructor(private readonly animationBuilder: AnimationBuilder) {}

  translateXAnimation(): AnimationFactory {
    return this.animationBuilder.build(TRANSLATE_X_ANIMATION);
  }
}
