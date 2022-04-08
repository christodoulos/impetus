import { Injectable, InjectionToken, NgZone } from '@angular/core';
import * as MapboxGl from 'mapbox-gl';
import { first } from 'rxjs';
import { MapEvent } from './map.types';

export const MAPBOX_API_KEY = new InjectionToken('MapboxApiKey');

export interface SetupMap {
  accessToken?: string;
  customMapboxApiUrl?: string;
  mapOptions: Omit<MapboxGl.MapboxOptions, 'bearing' | 'pitch' | 'zoom'> & {
    bearing?: [number];
    pitch?: [number];
    zoom?: [number];
  };
  // mapEvents: MapEvent;
}

@Injectable({
  providedIn: 'root',
})
export class MapService {
  mapInstance!: MapboxGl.Map;
  constructor(private ngZone: NgZone) {}

  setup(options: SetupMap) {
    this.ngZone.onStable.pipe(first()).subscribe(() => {
      this.assign(MapboxGl, 'accessToken', options.accessToken);
      this.createMap(options.mapOptions as MapboxGl.MapboxOptions);
    });
  }

  private createMap(options: MapboxGl.MapboxOptions) {
    NgZone.assertNotInAngularZone();
    Object.keys(options).forEach((key: string) => {
      const tkey = <keyof MapboxGl.MapboxOptions>key;
      if (options[tkey] === undefined) {
        delete options[tkey];
      }
    });
    this.mapInstance = new MapboxGl.Map(options);
  }

  private assign(obj: any, prop: any, value: any) {
    if (typeof prop === 'string') {
      // tslint:disable-next-line:no-parameter-reassignment
      prop = prop.split('.');
    }
    if (prop.length > 1) {
      const e = prop.shift();
      this.assign(
        (obj[e] =
          Object.prototype.toString.call(obj[e]) === '[object Object]'
            ? obj[e]
            : {}),
        prop,
        value
      );
    } else {
      obj[prop[0]] = value;
    }
  }
}
