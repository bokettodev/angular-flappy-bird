import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NAVIGATOR, WINDOW } from '@shared/tokens';

@Injectable({ providedIn: 'root' })
export class DomService {
  readonly renderer: Renderer2;

  constructor(
    @Inject(DOCUMENT) public readonly document: Document,
    @Inject(NAVIGATOR) public readonly navigator: Navigator,
    @Inject(WINDOW) public readonly window: Window,
    public readonly domSanitizer: DomSanitizer,
    private readonly rendererFactory: RendererFactory2,
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  get body(): HTMLBodyElement {
    return this.document.body as HTMLBodyElement;
  }
}
