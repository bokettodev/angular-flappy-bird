import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent, appRoutes } from '@app';
import { environment } from '@environments/environment.prod';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(RouterModule.forRoot(appRoutes))],
}).catch((err) => console.error(err));
