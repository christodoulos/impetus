import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { devTools } from '@ngneat/elf-devtools';
import { elfHooks, deepFreeze } from '@ngneat/elf';

devTools();

if (environment.production) {
  enableProdMode();
}
if (!environment.production) {
  elfHooks.registerPreStoreUpdate((currentState, nextState, storeName) => {
    return deepFreeze(nextState);
  });
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
