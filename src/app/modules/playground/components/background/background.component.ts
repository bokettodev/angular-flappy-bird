import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'fb-background',
  template: ``,
  styleUrls: ['./background.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackgroundComponent {
  @Input()
  @HostBinding('style.--background-image-width-pixels')
  backgroundImageWidthPixels = 138;

  @Input()
  @HostBinding('style.--background-image-height-pixels')
  backgroundImageHeightPixels = 84;

  @Input()
  @HostBinding('style.--speed-pixels-per-second')
  speedPixelsPerSecond = 10;
}
