import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/playground/playground.component').then(
        (c) => c.PlaygroundComponent
      ),
  },
];
