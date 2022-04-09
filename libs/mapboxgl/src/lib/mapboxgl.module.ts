import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { MAPBOX_API_KEY } from './map/map.service';
import { LayerComponent } from './layer/layer.component';

@NgModule({
  imports: [CommonModule],
  declarations: [MapComponent, LayerComponent],
  exports: [MapComponent, LayerComponent],
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
      ],
    };
  }
}
