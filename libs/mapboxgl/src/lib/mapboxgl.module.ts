import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { MAPBOX_API_KEY } from './map/map.service';

export const MAPBOX_GEOCODER_API_KEY = new InjectionToken('MapboxApiKey');

@NgModule({
  imports: [CommonModule],
  declarations: [MapComponent],
  exports: [MapComponent],
})
export class MapboxglModule {
  static withConfig(config: {
    accessToken: string;
    geocoderAccessToken?: string;
  }): ModuleWithProviders<MapboxglModule> {
    return {
      ngModule: MapboxglModule,
      providers: [
        {
          provide: MAPBOX_API_KEY,
          useValue: config.accessToken,
        },
        {
          provide: MAPBOX_GEOCODER_API_KEY,
          useValue: config.geocoderAccessToken || config.accessToken,
        },
      ],
    };
  }
}
