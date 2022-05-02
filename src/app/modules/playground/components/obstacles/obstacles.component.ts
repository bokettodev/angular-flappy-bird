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
import { COMMON_CHECKER_FREQUENCY_MILLISECONDS } from '@modules/playground/constants';
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

    interval(COMMON_CHECKER_FREQUENCY_MILLISECONDS)
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
