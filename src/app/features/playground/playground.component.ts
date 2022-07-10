import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
  selector: 'fb-playground',
  standalone: true,
  styleUrls: ['./playground.component.scss'],
  template: ``,
})
export class PlaygroundComponent {}
