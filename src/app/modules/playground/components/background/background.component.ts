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
  @HostBinding('style.--backgroundImageWidthPixels')
  backgroundImageWidthPixels = 138;

  @Input()
  @HostBinding('style.--backgroundImageHeightPixels')
  backgroundImageHeightPixels = 84;

  @Input()
  @HostBinding('style.--speedPixelsPerSecond')
  speedPixelsPerSecond = 10;
}
