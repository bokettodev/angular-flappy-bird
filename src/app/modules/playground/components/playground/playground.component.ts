import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { CheckerFrequencyMs } from '@modules/playground/enums';
import { PlaygroundStoreService } from '@modules/playground/services';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { interval, SubscriptionLike } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'fb-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundComponent implements OnInit {
  private groundCollisionListenerSub?: SubscriptionLike;
  private pipesCollisionListenerSub?: SubscriptionLike;

  constructor(
    private readonly cdRef: ChangeDetectorRef,
    private readonly playgroundStoreService: PlaygroundStoreService,
  ) {}

  ngOnInit(): void {
    this.initListeners();
  }

  @HostListener('click')
  flyUp(): void {
    this.playgroundStoreService.flyUp();
  }

  private runGroundCollisionListener(): void {
    this.destroyGroundCollisionListener();

    this.groundCollisionListenerSub = interval(CheckerFrequencyMs.BirdCollideWithGround)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        if (
          !this.playgroundStoreService.groundElement ||
          !this.playgroundStoreService.birdElement
        ) {
          return;
        }
        const birdRect = this.playgroundStoreService.birdElement.getBoundingClientRect();
        const groundRect = this.playgroundStoreService.groundElement.getBoundingClientRect();
        const didBirdCollideWithGround = birdRect.bottom >= groundRect.top;

        if (didBirdCollideWithGround) {
          this.playgroundStoreService.setIsPlaying({ isPlaying: false });
          this.cdRef.markForCheck();
        }
      });
  }

  private destroyGroundCollisionListener(): void {
    this.groundCollisionListenerSub?.unsubscribe();
  }

  private runPipesCollisionListener(): void {
    this.destroyPipesCollisionListener();

    this.pipesCollisionListenerSub = interval(CheckerFrequencyMs.BirdCollideWithPipe)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        if (
          !this.playgroundStoreService.nearestPipesElement?.firstElementChild ||
          !this.playgroundStoreService.nearestPipesElement?.lastElementChild ||
          !this.playgroundStoreService.birdElement
        ) {
          return;
        }
        const birdRect = this.playgroundStoreService.birdElement.getBoundingClientRect();
        const topPipeRect =
          this.playgroundStoreService.nearestPipesElement.firstElementChild.getBoundingClientRect();
        const bottomPipeRect =
          this.playgroundStoreService.nearestPipesElement.lastElementChild.getBoundingClientRect();

        const didBirdCollideWithTopPipe =
          birdRect.right > topPipeRect.left &&
          birdRect.right < topPipeRect.right &&
          birdRect.top < topPipeRect.bottom;

        const didBirdCollideWithBottomPipe =
          birdRect.right > bottomPipeRect.left &&
          birdRect.right < bottomPipeRect.right &&
          birdRect.bottom > bottomPipeRect.top;

        if (didBirdCollideWithTopPipe || didBirdCollideWithBottomPipe) {
          this.playgroundStoreService.setIsPlaying({ isPlaying: false });
          this.cdRef.detectChanges();
        }
      });
  }

  private destroyPipesCollisionListener(): void {
    this.pipesCollisionListenerSub?.unsubscribe();
  }

  private initListeners(): void {
    this.playgroundStoreService.isPlaying$.subscribe((isPlaying) => {
      if (isPlaying) {
        this.runGroundCollisionListener();
        this.runPipesCollisionListener();
      } else {
        this.destroyGroundCollisionListener();
        this.destroyPipesCollisionListener();
      }
    });
  }
}
