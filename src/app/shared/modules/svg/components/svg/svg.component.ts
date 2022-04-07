import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'fb-svg',
  template: `
    <!-- <svg-icon
      src="assets/images/{{ src }}.svg"
      [svgStyle]="{ color, height, width }"
    ></svg-icon> -->
  `,
  styleUrls: ['./svg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgComponent {
  @Input() src?: string;

  constructor(
    @Attribute('color') public color: string,
    @Attribute('height') public height: string,
    @Attribute('width') public width: string,
  ) {}
}
