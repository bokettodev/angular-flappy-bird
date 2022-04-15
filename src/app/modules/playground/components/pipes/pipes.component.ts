import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'fb-pipes',
  template: `
    <div class="pipe">
      <div class="pipe__head"></div>
      <div class="pipe__body"></div>
    </div>

    <div class="pipe">
      <div class="pipe__head"></div>
      <div class="pipe__body"></div>
    </div>
  `,
  styleUrls: ['./pipes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PipesComponent {
  @Input()
  @HostBinding('style.--pipe-head-width-pixels')
  pipeHeadWidthPixels = 52;

  @Input()
  @HostBinding('style.--pipe-head-height-pixels')
  pipeHeadHeightPixels = 24;
}
