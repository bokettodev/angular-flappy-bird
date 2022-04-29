import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { PlaygroundStoreService } from '@modules/playground/services';

@Component({
  selector: 'fb-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaygroundComponent {
  constructor(private readonly playgroundStoreService: PlaygroundStoreService) {}

  @HostListener('click')
  flyUp(): void {
    this.playgroundStoreService.flyUp();
  }
}
