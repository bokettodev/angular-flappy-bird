import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'fb-ground',
  template: ``,
  styleUrls: ['./ground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroundComponent {
  @Input()
  @HostBinding('style.--height')
  height = '22%';

  @Input()
  @HostBinding('style.--ground-image-width-pixels')
  groundImageWidthPixels = 24;

  @Input()
  @HostBinding('style.--ground-image-height-pixels')
  groundImageHeightPixels = 22;

  @Input()
  @HostBinding('style.--speed-pixels-per-second')
  speedPixelsPerSecond = 50;
}
