import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'fb-obstacles',
  templateUrl: './obstacles.component.html',
  styleUrls: ['./obstacles.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ObstaclesComponent {
  @Input()
  @HostBinding('style.--ground-height')
  groundHeight = '22%';

  @Input()
  @HostBinding('style.--speed-pixels-per-second')
  speedPixelsPerSecond = 50;

  constructor(private readonly elementRef: ElementRef<HTMLElement>) {}

  @HostBinding('style.--host-width-px')
  get hostWidthPx(): number {
    return this.elementRef.nativeElement.clientWidth;
  }
}
