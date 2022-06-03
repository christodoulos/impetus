import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { EffectsNgModule } from '@ngneat/effects-ng';

import { MapboxglModule } from '@impetus/mapboxgl';

import { UiModule } from '@impetus/ui';
import { UserEffects, OrionEffects } from '@impetus/state';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    EffectsNgModule.forRoot([UserEffects, OrionEffects]),
    UiModule,
    MapboxglModule.withConfig({
      accessToken:
        'pk.eyJ1IjoiY2hyaXN0b2RvdWxvcyIsImEiOiJja3luYTd3eW0ydGFiMm9xcHRmMGJyOHVrIn0.c1mSurunkjU4Wyf2hxcy0g',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
