import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  HostBinding,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CheckerFrequencyMs } from '@modules/playground/enums';
import { PlaygroundStoreService } from '@modules/playground/services';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { interval } from 'rxjs';
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
  groundHeight?: string;

  private isPlaying = false;
  private pipesHorizontalIndentPixels!: number;
  private lastPipesComponentRef?: ComponentRef<PipesComponent>;
  private birdWidthPixels!: number;

  @ViewChild('pipesContainerRef', { read: ViewContainerRef, static: true })
  private readonly pipesContainerRef!: ViewContainerRef;

  constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly cdRef: ChangeDetectorRef,
    private readonly playgroundStoreService: PlaygroundStoreService,
  ) {
    this.playgroundStoreService.obstaclesElement = this.elementRef.nativeElement;
  }

  @HostBinding('style.--host-width-px')
  get hostWidthPx(): number {
    return this.elementRef.nativeElement.clientWidth;
  }

  ngOnInit(): void {
    this.initListeners();
  }

  private initListeners(): void {
    this.playgroundStoreService.birdWidthPixels$
      .pipe(untilDestroyed(this))
      .subscribe((birdWidthPixels) => {
        this.birdWidthPixels = birdWidthPixels;
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
      this.isPlaying = isPlaying;
      this.cdRef.detectChanges();
    });

    this.runNearestPipesSetter();
    this.runPipesGenerator();
  }

  private runNearestPipesSetter(): void {
    interval(CheckerFrequencyMs.NearestPipesSetter)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        if (!this.isPlaying) {
          return;
        }

        if (!this.playgroundStoreService.nearestPipesElement) {
          this.playgroundStoreService.nearestPipesElement = this.elementRef.nativeElement
            .firstElementChild as HTMLElement;
          return;
        }

        const nearestPipesRect =
          this.playgroundStoreService.nearestPipesElement.getBoundingClientRect();
        const activeZoneEnd = this.hostWidthPx / 2 - this.birdWidthPixels / 2;

        if (
          activeZoneEnd > nearestPipesRect.right ||
          !this.playgroundStoreService.nearestPipesElement
        ) {
          this.playgroundStoreService.nearestPipesElement = this.playgroundStoreService
            .nearestPipesElement.nextElementSibling as HTMLElement;
        }
      });
  }

  private runPipesGenerator(): void {
    interval(CheckerFrequencyMs.PipesGenerator)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        if (!this.isPlaying) {
          return;
        }
        if (!this.lastPipesComponentRef) {
          this.generatePipesCouple();
          return;
        }

        const pipesElement = this.lastPipesComponentRef.instance.elementRef.nativeElement;
        const lastPipesRightIndentPixels =
          this.hostWidthPx - pipesElement.getBoundingClientRect().right + pipesElement.clientWidth;

        if (lastPipesRightIndentPixels >= this.pipesHorizontalIndentPixels) {
          this.generatePipesCouple();
        }
      });
  }

  private generatePipesCouple(): void {
    this.lastPipesComponentRef = this.pipesContainerRef.createComponent(PipesComponent);
    this.cdRef.detectChanges();
  }
}
