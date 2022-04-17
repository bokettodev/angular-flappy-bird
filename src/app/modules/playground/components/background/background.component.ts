import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { PlaygroundStoreService } from '@modules/playground/services';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'fb-background',
  template: ``,
  styleUrls: ['./background.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackgroundComponent implements OnInit {
  @Input()
  @HostBinding('style.--background-image-width-pixels')
  backgroundImageWidthPixels = 138;

  @Input()
  @HostBinding('style.--background-image-height-pixels')
  backgroundImageHeightPixels = 84;

  @HostBinding('style.--speed-pixels-per-second')
  speedPixelsPerSecond = 0;

  @HostBinding('style.--ground-height')
  groundHeight = '0';

  constructor(private readonly playgroundStoreService: PlaygroundStoreService) {}

  ngOnInit(): void {
    this.initListeners();
  }

  private initListeners(): void {
    this.playgroundStoreService.backgroundSpeedPixelsPerSecond$
      .pipe(untilDestroyed(this))
      .subscribe((speedPixelsPerSecond) => {
        this.speedPixelsPerSecond = speedPixelsPerSecond;
      });

    this.playgroundStoreService.groundHeight$
      .pipe(untilDestroyed(this))
      .subscribe((groundHeight) => {
        this.groundHeight = groundHeight;
      });
  }
}
