import { AnimationPlayer } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { PlaygroundStoreService } from '@modules/playground/services';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateXAnimationParams } from '@shared/interfaces';
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
  @Input()
  @HostBinding('style.--pipe-head-width-pixels')
  pipeHeadWidthPixels = 52;

  @Input()
  @HostBinding('style.--pipe-head-height-pixels')
  pipeHeadHeightPixels = 24;

  @Input()
  parentWidthPx = 0;

  isPlaying = false;
  translateXAnimation?: AnimationPlayer;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly cdRef: ChangeDetectorRef,
    private readonly playgroundStoreService: PlaygroundStoreService,
    private readonly animationService: AnimationService,
  ) {}

  ngOnInit(): void {
    this.initListeners();
  }

  private initListeners(): void {
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

    const durationSeconds =
      (this.parentWidthPx + this.pipeHeadWidthPixels * 2) / speedPixelsPerSecond;

    const params: TranslateXAnimationParams = {
      duration: `${durationSeconds}s`,
      from: '100%',
      to: `-${this.parentWidthPx + this.pipeHeadWidthPixels}px`,
    };

    this.translateXAnimation = this.animationService
      .translateXAnimation()
      .create(this.elementRef.nativeElement, { params });

    this.translateXAnimation?.onDone(() => {
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
