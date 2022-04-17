import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';
import { TRANSLATE_X_ON_ENTER_ANIMATION } from '@shared/animations';
import { TranslateXOnEnterAnimationParams } from '@shared/interfaces';

@Component({
  selector: 'fb-pipes',
  template: `
    <div class="pipe">
      <div class="pipe__head"></div>
      <div class="pipe__body"></div>
    </div>

    <div class="pipe">
      <div class="pipe__head"></div>
      <div class="pipe__body"></div>
    </div>
  `,
  styleUrls: ['./pipes.component.scss'],
  animations: [TRANSLATE_X_ON_ENTER_ANIMATION],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PipesComponent {
  @Input()
  @HostBinding('style.--pipe-head-width-pixels')
  pipeHeadWidthPixels = 52;

  @Input()
  @HostBinding('style.--pipe-head-height-pixels')
  pipeHeadHeightPixels = 24;

  @Input()
  speedPixelsPerSecond = 50;

  @Input()
  parentWidthPx = 0;

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  @HostBinding('@translateXOnEnterAnimation')
  get hostAnimationParams(): TranslateXOnEnterAnimationParams {
    const durationSeconds =
      (this.parentWidthPx + this.pipeHeadWidthPixels * 2) /
      this.speedPixelsPerSecond;

    return {
      value: true,
      params: {
        duration: `${durationSeconds}s`,
        from: '100%',
        to: `-${this.parentWidthPx + this.pipeHeadWidthPixels}px`,
      },
    };
  }

  @HostListener('@translateXOnEnterAnimation.done')
  destroyHost(): void {
    this.elementRef.nativeElement.remove();
  }
}
