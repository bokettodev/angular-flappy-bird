import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule],
  selector: 'fb-root',
  standalone: true,
  styleUrls: ['./app.component.scss'],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {}
