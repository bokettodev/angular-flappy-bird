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
  @HostBinding('style.--groundImageWidthPixels')
  groundImageWidthPixels = 24;

  @Input()
  @HostBinding('style.--groundImageHeightPixels')
  groundImageHeightPixels = 22;

  @Input()
  @HostBinding('style.--speedPixelsPerSecond')
  speedPixelsPerSecond = 50;
}
