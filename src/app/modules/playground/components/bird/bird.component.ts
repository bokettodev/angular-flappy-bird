import { AnimationPlayer } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { PlaygroundStoreService } from '@modules/playground/services';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateAnimationParams } from '@shared/interfaces';
import { AnimationService, DomService } from '@shared/services';

@UntilDestroy()
@Component({
  selector: 'fb-bird',
  template: ``,
  styleUrls: ['./bird.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BirdComponent implements OnInit, OnDestroy {
  @HostBinding('style.--animation-play-state')
  animationPlayState: AnimationPlayState = 'paused';

  @HostBinding('style.--ground-height')
  groundHeight?: string;

  @HostBinding('style.--bird-width-pixels')
  readonly birdWidthPixels = 34;

  @HostBinding('style.--bird-height-pixels')
  readonly birdHeightPixels = 24;

  isPlaying = false;
  private translateYAnimation?: AnimationPlayer;

  constructor(
    private readonly animationService: AnimationService,
    private readonly cdRef: ChangeDetectorRef,
    private readonly domService: DomService,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly playgroundStoreService: PlaygroundStoreService,
  ) {}

  ngOnInit(): void {
    this.initListeners();

    const toPixels = 600;
    const pixelsPerSecond = 300;
    const durationSeconds = toPixels / pixelsPerSecond;

    this.setTranslateYAnimation({
      duration: `${durationSeconds}s`,
      timing: 'linear',
      to: `${toPixels}px`,
    });

    setInterval(() => {
      this.setTranslateYAnimation({
        duration: `${durationSeconds}s`,
        timing: 'linear',
        to: `-${toPixels / 2}px`,
      });

      setTimeout(() => {
        this.setTranslateYAnimation({
          duration: `${durationSeconds}s`,
          timing: 'linear',
          to: `${toPixels / 2}px`,
        });
      }, 1000);
    }, 2000);
  }

  ngOnDestroy(): void {
    this.destroyAnimationPlayer();
  }

  private initListeners(): void {
    this.playgroundStoreService.groundHeight$
      .pipe(untilDestroyed(this))
      .subscribe((groundHeight) => {
        this.groundHeight = groundHeight;
        this.cdRef.detectChanges();
      });

    this.playgroundStoreService.isPlaying$.pipe(untilDestroyed(this)).subscribe((isPlaying) => {
      this.isPlaying = isPlaying;
      this.animationPlayState = this.isPlaying ? 'running' : 'paused';

      if (this.isPlaying) {
        this.translateYAnimation?.play();
      } else {
        this.translateYAnimation?.pause();
      }

      this.cdRef.detectChanges();
    });
  }

  private setTranslateYAnimation(params: TranslateAnimationParams): void {
    this.fixBirdTopPosition();
    this.destroyAnimationPlayer();

    this.translateYAnimation = this.animationService
      .translateYAnimation()
      .create(this.elementRef.nativeElement, { params });

    if (!this.isPlaying) {
      return;
    }
    this.translateYAnimation.play();
  }

  private destroyAnimationPlayer(): void {
    if (!this.translateYAnimation) {
      return;
    }
    this.translateYAnimation?.destroy();
    this.translateYAnimation = undefined;
  }

  private fixBirdTopPosition(): void {
    const { top } = this.elementRef.nativeElement.getBoundingClientRect();
    this.domService.renderer.setStyle(this.elementRef.nativeElement, 'top', `${top}px`);
  }
}
