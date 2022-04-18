import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { PlaygroundStoreService } from '@modules/playground/services';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TRANSLATE_X_ON_ENTER_ANIMATION } from '@shared/animations';
import { TranslateXOnEnterAnimationParams } from '@shared/interfaces';

@UntilDestroy()
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
export class PipesComponent implements OnInit {
  @Input()
  @HostBinding('style.--pipe-head-width-pixels')
  pipeHeadWidthPixels = 52;

  @Input()
  @HostBinding('style.--pipe-head-height-pixels')
  pipeHeadHeightPixels = 24;

  @Input()
  parentWidthPx = 0;

  speedPixelsPerSecond = 0;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly cdRef: ChangeDetectorRef,
    private readonly playgroundStoreService: PlaygroundStoreService,
  ) {}

  @HostBinding('@translateXOnEnterAnimation')
  get hostAnimationParams(): TranslateXOnEnterAnimationParams {
    const durationSeconds =
      (this.parentWidthPx + this.pipeHeadWidthPixels * 2) / this.speedPixelsPerSecond;

    return {
      value: true,
      params: {
        duration: `${durationSeconds}s`,
        from: '100%',
        to: `-${this.parentWidthPx + this.pipeHeadWidthPixels}px`,
      },
    };
  }

  ngOnInit(): void {
    this.initListeners();
  }

  @HostListener('@translateXOnEnterAnimation.done')
  destroyHost(): void {
    this.elementRef.nativeElement.remove();
  }

  private initListeners(): void {
    this.playgroundStoreService.objectsSpeedPixelsPerSecond$
      .pipe(untilDestroyed(this))
      .subscribe((speedPixelsPerSecond) => {
        this.speedPixelsPerSecond = speedPixelsPerSecond;
        this.cdRef.detectChanges();
      });
  }
}
