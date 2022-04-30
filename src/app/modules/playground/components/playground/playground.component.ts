import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { COMMON_CHECKER_FREQUENCY_MILLISECONDS } from '@modules/playground/constants';
import { PlaygroundStoreService } from '@modules/playground/services';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { interval, SubscriptionLike } from 'rxjs';
import { BirdComponent } from '../bird/bird.component';
import { GroundComponent } from '../ground/ground.component';

@UntilDestroy()
@Component({
  selector: 'fb-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundComponent implements OnInit {
  @ViewChild('groundComponent', { static: true }) groundComponent!: GroundComponent;
  @ViewChild('birdComponent', { static: true }) birdComponent!: BirdComponent;

  private groundTouchListenerSub?: SubscriptionLike;

  constructor(
    private readonly cdRef: ChangeDetectorRef,
    private readonly playgroundStoreService: PlaygroundStoreService,
  ) {}

  ngOnInit(): void {
    this.initListeners();
    this.runGroundTouchListener();
  }

  @HostListener('click')
  flyUp(): void {
    this.playgroundStoreService.flyUp();
  }

  private runGroundTouchListener(): void {
    this.destroyGroundTouchListener();

    this.groundTouchListenerSub = interval(COMMON_CHECKER_FREQUENCY_MILLISECONDS)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        const groundRect = this.groundComponent.elementRef.nativeElement.getBoundingClientRect();
        const birdRect = this.birdComponent.elementRef.nativeElement.getBoundingClientRect();
        const isBirdTouchedGround = birdRect.bottom >= groundRect.top;

        if (isBirdTouchedGround) {
          this.playgroundStoreService.setIsPlaying({ isPlaying: false });
          this.cdRef.markForCheck();
        }
      });
  }

  private destroyGroundTouchListener(): void {
    this.groundTouchListenerSub?.unsubscribe();
  }

  private initListeners(): void {
    this.playgroundStoreService.isPlaying$.subscribe((isPlaying) => {
      if (isPlaying) {
        this.runGroundTouchListener();
      } else {
        this.destroyGroundTouchListener();
      }
    });
  }
}
