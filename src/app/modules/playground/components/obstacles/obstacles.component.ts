import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { PlaygroundStoreService } from '@modules/playground/services';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, delay, of, SubscriptionLike } from 'rxjs';
import { PipesComponent } from '../pipes/pipes.component';

@UntilDestroy()
@Component({
  selector: 'fb-obstacles',
  template: `
    <ng-container #pipesContainerRef></ng-container>
  `,
  styleUrls: ['./obstacles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObstaclesComponent implements OnInit {
  @HostBinding('style.--ground-height')
  groundHeight = '0';

  private objectsSpeedPixelsPerSecond?: number;
  private pipesHorizontalIndentPixels?: number;
  private pipesGeneratorSub?: SubscriptionLike;
  private lastPipesCreatedAt?: Date;
  private pipesGeneratorIntervalMillisecondsAfterPause = 0;

  intervalValue$ = new BehaviorSubject(1);

  @ViewChild('pipesContainerRef', { read: ViewContainerRef, static: true })
  private readonly pipesContainerRef!: ViewContainerRef;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly cdRef: ChangeDetectorRef,
    private readonly playgroundStoreService: PlaygroundStoreService,
  ) {}

  @HostBinding('style.--host-width-px')
  get hostWidthPx(): number {
    return this.elementRef.nativeElement.clientWidth;
  }

  ngOnInit(): void {
    this.initListeners();
  }

  private get pipesGeneratorIntervalMilliseconds(): number {
    if (!this.objectsSpeedPixelsPerSecond || !this.pipesHorizontalIndentPixels) {
      return 0;
    }
    const indentWithPipeWidth = this.pipesHorizontalIndentPixels + 52;
    const pipesGeneratorIntervalSeconds = indentWithPipeWidth / this.objectsSpeedPixelsPerSecond;
    return pipesGeneratorIntervalSeconds * 1000;
  }

  private initListeners(): void {
    this.playgroundStoreService.objectsSpeedPixelsPerSecond$
      .pipe(untilDestroyed(this))
      .subscribe((objectsSpeedPixelsPerSecond) => {
        this.objectsSpeedPixelsPerSecond = objectsSpeedPixelsPerSecond;
        this.cdRef.detectChanges();
      });

    this.playgroundStoreService.pipesHorizontalIndentPixels$
      .pipe(untilDestroyed(this))
      .subscribe((pipesHorizontalIndentPixels) => {
        this.pipesHorizontalIndentPixels = pipesHorizontalIndentPixels;
        this.cdRef.detectChanges();
      });

    this.playgroundStoreService.groundHeight$
      .pipe(untilDestroyed(this))
      .subscribe((groundHeight) => {
        this.groundHeight = groundHeight;
        this.cdRef.detectChanges();
      });

    this.playgroundStoreService.isPlaying$.pipe(untilDestroyed(this)).subscribe((isPlaying) => {
      if (isPlaying) {
        this.runPipesGenerator();
      } else {
        this.stopPipesGenerator();
      }
    });
  }

  private runPipesGenerator(): void {
    this.pipesGeneratorSub?.unsubscribe();
    this.pipesGeneratorSub = of(true)
      .pipe(
        delay(
          this.pipesGeneratorIntervalMillisecondsAfterPause ||
            this.pipesGeneratorIntervalMilliseconds,
        ),
        untilDestroyed(this),
      )
      .subscribe(() => {
        const pipesComponentRef = this.pipesContainerRef.createComponent(PipesComponent);
        pipesComponentRef.instance.parentWidthPx = this.elementRef.nativeElement.clientWidth;

        this.pipesGeneratorIntervalMillisecondsAfterPause = 0;
        this.lastPipesCreatedAt = new Date();
        this.cdRef.detectChanges();

        this.runPipesGenerator();
      });
  }

  private stopPipesGenerator(): void {
    if (this.lastPipesCreatedAt) {
      const pipesGeneratorIntervalMilliseconds = Math.abs(
        this.lastPipesCreatedAt.getTime() - new Date().getTime(),
      );

      this.pipesGeneratorIntervalMillisecondsAfterPause =
        this.pipesGeneratorIntervalMilliseconds - pipesGeneratorIntervalMilliseconds;
    }

    this.pipesGeneratorSub?.unsubscribe();
  }
}
