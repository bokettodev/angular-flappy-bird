import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { SvgService } from '@shared/services';
import { SubscriptionLike } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'fb-svg',
  template: `
    <div #svgContainerRef></div>
    <ng-content></ng-content>
  `,
  styleUrls: ['./svg.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgComponent implements OnChanges {
  @Input() @HostBinding('style.--color') color?: string;
  @Input() @HostBinding('style.--color-on-hover') colorOnHover?: string;
  @Input() @HostBinding('style.--size') size?: string;
  @Input() @HostBinding('style.--width') width?: string;
  @Input() @HostBinding('style.--height') height?: string;
  @Input() icon?: string;

  @ViewChild('svgContainerRef', { static: true })
  private readonly svgContainerRef!: ElementRef<HTMLElement>;

  private svgDownloadSub?: SubscriptionLike;

  constructor(private readonly svgService: SvgService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['icon']) {
      this.downloadAndInjectSvg();
    }
  }

  private downloadAndInjectSvg(): void {
    if (!this.icon) {
      return;
    }
    this.svgDownloadSub?.unsubscribe();
    this.svgDownloadSub = this.svgService
      .getSvg(this.icon)
      .pipe(untilDestroyed(this))
      .subscribe((svg) => {
        this.svgContainerRef.nativeElement.innerHTML = svg;
      });
  }
}
