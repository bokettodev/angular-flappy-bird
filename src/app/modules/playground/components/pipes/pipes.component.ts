import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
} from '@angular/core';
import { LEFT_MOVEMENT_ANIMATION } from '@shared/animations';

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
  animations: [LEFT_MOVEMENT_ANIMATION],
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
  parentWidthPx?: number;

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  @HostBinding('@leftMovementAnimation')
  get hostAnimationParams(): {
    value: boolean;
    params: {
      duration: string;
      leftStart: string;
      leftEnd: string;
    };
  } {
    const durationSeconds =
      (this.parentWidthPx || 0 + this.pipeHeadWidthPixels) /
      this.speedPixelsPerSecond;

    return {
      value: true,
      params: {
        duration: `${durationSeconds}s`,
        leftStart: '100%',
        leftEnd: `-${this.pipeHeadWidthPixels}px`,
      },
    };
  }

  @HostListener('@leftMovementAnimation.done')
  destroyHost(): void {
    this.elementRef.nativeElement.remove();
  }
}
