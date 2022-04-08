import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DomService, HttpService } from '@shared/services';

@Component({
  selector: 'fb-svg',
  template: ``,
  styleUrls: ['./svg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgComponent implements OnChanges {
  @Input() @HostBinding('style.--color') color?: string;
  @Input() @HostBinding('style.--width') width?: string;
  @Input() @HostBinding('style.--height') height?: string;
  @Input() icon?: string;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private domService: DomService,
    private httpService: HttpService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['icon']) {
      this.downloadSvg();
    }
  }

  private downloadSvg(): void {
    if (!this.icon) {
      return;
    }

    this.httpService
      .get<string>({
        urlHost: this.domService.window.origin,
        urlPath: `assets/images/svg/${this.icon}.svg`,
        httpClientOptions: { responseType: 'text' },
      })
      .subscribe((svgText) => this.injectSvg(svgText));
  }

  private injectSvg(svgText: string): void {
    this.elementRef.nativeElement.innerHTML = svgText;
  }
}
