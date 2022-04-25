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
import { TranslateAnimationParams } from '@shared/interfaces';
import { AnimationService, DomService } from '@shared/services';

@UntilDestroy()
@Component({
  selector: 'fb-bird',
  template: ``,
  styleUrls: ['./bird.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BirdComponent implements OnInit {
  @HostBinding('style.--animation-play-state')
  animationPlayState: AnimationPlayState = 'paused';

  @HostBinding('style.--ground-height')
  groundHeight?: string;

  @HostBinding('style.--bird-width-pixels')
  readonly birdWidthPixels = 34;

  @HostBinding('style.--bird-height-pixels')
  readonly birdHeightPixels = 24;

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

    const toPixels = 300;
    const pixelsPerSecond = 100;
    const durationSeconds = toPixels / pixelsPerSecond;

    this.setTranslateYAnimation({
      duration: `${durationSeconds}s`,
      timing: 'linear',
      to: `${toPixels}px`,
    });

    setTimeout(() => {
      this.setTranslateYAnimation({
        duration: `${durationSeconds}s`,
        timing: 'linear',
        to: `-${toPixels}px`,
      });
    }, 2000);
  }

  private initListeners(): void {
    this.playgroundStoreService.groundHeight$
      .pipe(untilDestroyed(this))
      .subscribe((groundHeight) => {
        this.groundHeight = groundHeight;
        this.cdRef.detectChanges();
      });

    this.playgroundStoreService.isPlaying$.pipe(untilDestroyed(this)).subscribe((isPlaying) => {
      this.animationPlayState = isPlaying ? 'running' : 'paused';
      this.cdRef.detectChanges();
    });
  }

  private setTranslateYAnimation({
    duration,
    timing,
    to,
  }: {
    duration: string;
    timing: string;
    to: string;
  }): void {
    this.translateYAnimation?.destroy();
    const params: TranslateAnimationParams = { duration, timing, to };

    this.translateYAnimation = this.animationService
      .translateYAnimation()
      .create(this.elementRef.nativeElement, { params });

    this.translateYAnimation.onDone(() => {
      const { top } = this.elementRef.nativeElement.getBoundingClientRect();
      this.domService.renderer.setStyle(this.elementRef.nativeElement, 'top', `${top}px`);
    });

    this.translateYAnimation.onDestroy(() => {
      this.translateYAnimation = undefined;

      const { top } = this.elementRef.nativeElement.getBoundingClientRect();
      this.domService.renderer.setStyle(this.elementRef.nativeElement, 'top', `${top}px`);
    });

    this.translateYAnimation.play();
  }
}
