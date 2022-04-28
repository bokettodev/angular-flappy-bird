import { AnimationPlayer } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  OnInit,
} from '@angular/core';
import { PlaygroundStoreService } from '@modules/playground/services';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { randomInteger } from '@shared/functions';
import { TranslateAnimationParams } from '@shared/interfaces';
import { AnimationService } from '@shared/services/animation.service';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PipesComponent implements OnInit {
  @HostBinding('style.--top-pipe-height')
  topPipeHeight!: string;

  @HostBinding('style.--bottom-pipe-height')
  bottomPipeHeight!: string;

  @HostBinding('style.--pipe-head-width-pixels')
  readonly pipeHeadWidthPixels = 52;

  @HostBinding('style.--pipe-head-height-pixels')
  readonly pipeHeadHeightPixels = 24;

  private isPlaying = false;
  private translateXAnimation?: AnimationPlayer;

  constructor(
    public readonly elementRef: ElementRef<HTMLElement>,
    private readonly cdRef: ChangeDetectorRef,
    private readonly playgroundStoreService: PlaygroundStoreService,
    private readonly animationService: AnimationService,
  ) {}

  ngOnInit(): void {
    this.initListeners();
  }

  private initPipesHeights({
    pipesVerticalIndentPixels,
  }: {
    pipesVerticalIndentPixels: number;
  }): void {
    const pipesVerticalIndentPercentage = Math.ceil(
      (pipesVerticalIndentPixels / this.elementRef.nativeElement.clientHeight) * 100,
    );

    const topPipeHeightPercentage = randomInteger(10, 70);
    const bottomPipeHeightPercentage =
      100 - topPipeHeightPercentage - pipesVerticalIndentPercentage;

    this.topPipeHeight = `${topPipeHeightPercentage}%`;
    this.bottomPipeHeight = `${bottomPipeHeightPercentage}%`;
  }

  private initListeners(): void {
    this.playgroundStoreService.pipesVerticalIndentPixels$
      .pipe(untilDestroyed(this))
      .subscribe((pipesVerticalIndentPixels) => {
        this.initPipesHeights({ pipesVerticalIndentPixels });
        this.cdRef.detectChanges();
      });

    this.playgroundStoreService.isPlaying$.pipe(untilDestroyed(this)).subscribe((isPlaying) => {
      this.isPlaying = isPlaying;
      this.toggleAnimationState({ isPlaying });
      this.cdRef.detectChanges();
    });

    this.playgroundStoreService.objectsSpeedPixelsPerSecond$
      .pipe(untilDestroyed(this))
      .subscribe((speedPixelsPerSecond) => {
        this.setTranslateXAnimation({ speedPixelsPerSecond });
        this.toggleAnimationState({ isPlaying: this.isPlaying });
        this.cdRef.detectChanges();
      });
  }

  private setTranslateXAnimation({ speedPixelsPerSecond }: { speedPixelsPerSecond: number }): void {
    this.translateXAnimation?.destroy();

    const parentWidthPx = this.elementRef.nativeElement.parentElement?.clientWidth || 0;
    const durationSeconds = (parentWidthPx + this.pipeHeadWidthPixels * 2) / speedPixelsPerSecond;

    const params: TranslateAnimationParams = {
      duration: `${durationSeconds}s`,
      timing: 'linear',
      to: `-${parentWidthPx + this.pipeHeadWidthPixels}px`,
    };

    this.translateXAnimation = this.animationService
      .translateXAnimation()
      .create(this.elementRef.nativeElement, { params });

    this.translateXAnimation.onDone(() => {
      this.elementRef.nativeElement.remove();
    });
  }

  private toggleAnimationState({ isPlaying }: { isPlaying: boolean }): void {
    if (isPlaying) {
      this.translateXAnimation?.play();
    } else {
      this.translateXAnimation?.pause();
    }
  }
}
