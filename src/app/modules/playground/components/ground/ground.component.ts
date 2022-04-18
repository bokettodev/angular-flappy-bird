import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { PlaygroundStoreService } from '@modules/playground/services';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'fb-ground',
  template: ``,
  styleUrls: ['./ground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroundComponent implements OnInit {
  @Input()
  @HostBinding('style.--ground-image-width-pixels')
  groundImageWidthPixels = 24;

  @Input()
  @HostBinding('style.--ground-image-height-pixels')
  groundImageHeightPixels = 22;

  @HostBinding('style.--height')
  height = '0';

  @HostBinding('style.--speed-pixels-per-second')
  speedPixelsPerSecond = 0;

  @HostBinding('style.--animation-play-state')
  animationPlayState: AnimationPlayState = 'paused';

  constructor(
    private readonly cdRef: ChangeDetectorRef,
    private readonly playgroundStoreService: PlaygroundStoreService,
  ) {}

  ngOnInit(): void {
    this.initListeners();
  }

  private initListeners(): void {
    this.playgroundStoreService.isPlaying$.pipe(untilDestroyed(this)).subscribe((isPlaying) => {
      this.animationPlayState = isPlaying ? 'running' : 'paused';
      this.cdRef.detectChanges();
    });

    this.playgroundStoreService.objectsSpeedPixelsPerSecond$
      .pipe(untilDestroyed(this))
      .subscribe((speedPixelsPerSecond) => {
        this.speedPixelsPerSecond = speedPixelsPerSecond;
        this.cdRef.detectChanges();
      });

    this.playgroundStoreService.groundHeight$
      .pipe(untilDestroyed(this))
      .subscribe((groundHeight) => {
        this.height = groundHeight;
        this.cdRef.detectChanges();
      });
  }
}
