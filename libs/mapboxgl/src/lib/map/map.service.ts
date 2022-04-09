import { Inject, Injectable, InjectionToken, NgZone } from '@angular/core';
import * as MapboxGl from 'mapbox-gl';
import { first } from 'rxjs';
import { MapEvent } from './map.types';

export const MAPBOX_API_KEY = new InjectionToken('MapboxApiKey');

@Injectable({
  providedIn: 'root',
})
export class MapService {
  mapInstance!: MapboxGl.Map;
  constructor(
    private ngZone: NgZone,
    @Inject(MAPBOX_API_KEY) private readonly MAPBOX_API_KEY: string
  ) {}

  setup(options: MapboxGl.MapboxOptions) {
    this.ngZone.onStable.pipe(first()).subscribe(() => {
      options.accessToken = this.MAPBOX_API_KEY;
      this.createMap(options);
    });
  }

  private createMap(options: MapboxGl.MapboxOptions) {
    NgZone.assertNotInAngularZone();
    this.mapInstance = new MapboxGl.Map(options);
  }
}
