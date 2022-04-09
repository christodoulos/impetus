import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { MAPBOX_API_KEY } from './map/map.service';

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
    console.log('module', config.accessToken);
    return {
      ngModule: MapboxglModule,
      providers: [
        {
          provide: MAPBOX_API_KEY,
          useValue: config.accessToken,
        },
      ],
    };
  }
}
