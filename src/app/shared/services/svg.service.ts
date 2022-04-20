import { Injectable } from '@angular/core';
import { DomService, HttpService } from '@shared/services';
import { Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SvgService {
  private readonly svgs = new Map<string, string>();

  constructor(private readonly httpService: HttpService, private readonly domService: DomService) {}

  getSvg(icon: string): Observable<string> {
    if (!icon) {
      return of('');
    }

    const targetSvg = this.svgs.get(icon);
    if (targetSvg) {
      return of(targetSvg);
    }

    return this.httpService
      .get<string>({
        urlHost: this.domService.window.origin,
        urlPath: `assets/images/svg/${icon}.svg`,
        httpClientOptions: { responseType: 'text' },
      })
      .pipe(tap((svg) => this.svgs.set(icon, svg)));
  }
}
