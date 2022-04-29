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
import { DomService } from '@shared/services';
import { SubscriptionLike, timer } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'fb-bird',
  template: ``,
  styleUrls: ['./bird.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BirdComponent implements OnInit {
  @HostBinding('style.--animation-play-state')
  animationPlayState?: AnimationPlayState;

  @HostBinding('style.--bird-width-pixels')
  birdWidthPixels?: number;

  @HostBinding('style.--bird-height-pixels')
  birdHeightPixels?: number;

  private isPlaying = false;
  private maxTopPixels?: number;
  private flyUpStepPixels?: number;
  private verticalSpeedPixelsPerSecond?: number;
  private flyDownTimerSub?: SubscriptionLike;

  constructor(
    private readonly cdRef: ChangeDetectorRef,
    private readonly domService: DomService,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly playgroundStoreService: PlaygroundStoreService,
  ) {}

  ngOnInit(): void {
    this.initListeners();
    this.initPosition();
  }

  private get parentHeightPixels(): number {
    return +(this.elementRef.nativeElement.parentElement?.clientHeight?.toFixed() || 0);
  }

  private get birdTopPixels(): number {
    return +this.elementRef.nativeElement.getBoundingClientRect().top.toFixed();
  }

  private initListeners(): void {
    this.playgroundStoreService.groundHeight$.pipe(untilDestroyed(this)).subscribe(() => {
      this.maxTopPixels = +(this.parentHeightPixels * 0.78).toFixed();
      this.cdRef.detectChanges();
    });

    this.playgroundStoreService.birdWidthPixels$
      .pipe(untilDestroyed(this))
      .subscribe((birdWidthPixels) => {
        this.birdWidthPixels = birdWidthPixels;
        this.cdRef.detectChanges();
      });

    this.playgroundStoreService.birdHeightPixels$
      .pipe(untilDestroyed(this))
      .subscribe((birdHeightPixels) => {
        this.birdHeightPixels = birdHeightPixels;
        this.cdRef.detectChanges();
      });

    this.playgroundStoreService.flyUpStepPixels$
      .pipe(untilDestroyed(this))
      .subscribe((flyUpStepPixels) => {
        this.flyUpStepPixels = flyUpStepPixels;
        this.cdRef.detectChanges();
      });

    this.playgroundStoreService.birdVerticalSpeedPixelsPerSecond$
      .pipe(untilDestroyed(this))
      .subscribe((speed) => {
        this.verticalSpeedPixelsPerSecond = speed;
        this.cdRef.detectChanges();
      });

    this.playgroundStoreService.isPlaying$.pipe(untilDestroyed(this)).subscribe((isPlaying) => {
      this.isPlaying = isPlaying;
      this.animationPlayState = this.isPlaying ? 'running' : 'paused';
      this.cdRef.detectChanges();
    });

    this.playgroundStoreService.flyUp$.pipe(untilDestroyed(this)).subscribe(() => this.flyUp());
  }

  private flyUp(): void {
    if (!this.flyUpStepPixels || !this.verticalSpeedPixelsPerSecond) {
      return;
    }
    this.flyDownTimerSub?.unsubscribe();

    const toPixels = this.birdTopPixels - this.flyUpStepPixels;
    const durationSeconds = +(this.flyUpStepPixels / this.verticalSpeedPixelsPerSecond).toFixed(2);

    this.setTranslateYAnimation({
      duration: `${durationSeconds}s`,
      timing: 'linear',
      to: `${toPixels}px`,
    });

    this.flyDownTimerSub = timer(durationSeconds * 1000)
      .pipe(untilDestroyed(this))
      .subscribe(() => this.flyDown());
  }

  private flyDown(): void {
    if (!this.maxTopPixels || !this.verticalSpeedPixelsPerSecond) {
      return;
    }

    const toPixels = this.maxTopPixels;
    const durationSeconds = (
      (toPixels - this.birdTopPixels) /
      this.verticalSpeedPixelsPerSecond
    ).toFixed(2);

    this.setTranslateYAnimation({
      duration: `${durationSeconds}s`,
      timing: 'linear',
      to: `${toPixels}px`,
    });
  }

  private setTranslateYAnimation({ duration, timing, to }: TranslateAnimationParams): void {
    this.domService.renderer.setStyle(
      this.elementRef.nativeElement,
      'transition',
      `transform ${duration} ${timing}`,
    );

    this.domService.renderer.setStyle(
      this.elementRef.nativeElement,
      'transform',
      `translateY(${to})`,
    );
  }

  private initPosition(): void {
    if (!this.birdHeightPixels) {
      return;
    }
    this.domService.renderer.setStyle(
      this.elementRef.nativeElement,
      'transform',
      `translateY(${this.parentHeightPixels / 2 - this.birdHeightPixels / 2}px)`,
    );
  }
}
