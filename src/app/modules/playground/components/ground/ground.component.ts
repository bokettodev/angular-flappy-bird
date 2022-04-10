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
  @Input() @HostBinding('style.--height') height = '22%';
  @Input() @HostBinding('style.--boundaryHeight') boundaryHeight = '1.5rem';
}
