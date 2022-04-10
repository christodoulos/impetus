import { Inject, Injectable, InjectionToken, NgZone } from '@angular/core';
import * as MapboxGl from 'mapbox-gl';
import { AsyncSubject, first, Observable } from 'rxjs';
import { LayerSetup } from '../layer/layer.interface';
import { MapEvents } from './map.interfaces';

export const MAPBOX_API_KEY = new InjectionToken('MapboxApiKey');

@Injectable({
  providedIn: 'root',
})
export class MapService {
  // public
  mapInstance: MapboxGl.Map | undefined;
  mapCreated$: Observable<void> | undefined;
  mapLoaded$: Observable<void> | undefined;
  mapEvents: MapEvents | undefined;
  //private
  private mapCreated = new AsyncSubject<void>();
  private mapLoaded = new AsyncSubject<void>();

  constructor(
    private ngZone: NgZone,
    @Inject(MAPBOX_API_KEY) private readonly MAPBOX_API_KEY: string
  ) {
    this.mapCreated$ = this.mapCreated.asObservable();
    this.mapLoaded$ = this.mapLoaded.asObservable();
  }

  setup(options: MapboxGl.MapboxOptions, events: MapEvents) {
    this.ngZone.onStable.pipe(first()).subscribe(() => {
      options.accessToken = this.MAPBOX_API_KEY;
      this.createMap(options);
      this.hookEvents(events);
      this.mapEvents = events;
      this.mapCreated.next();
      this.mapCreated.complete();
    });
  }

  addLayer(layer: LayerSetup, bindEvents: boolean, before?: string) {
    console.log('AAAAAAAAAAAAAAAA', layer);
    this.ngZone.runOutsideAngular(() => {
      this.mapInstance?.addLayer(layer.options as MapboxGl.AnyLayer, before);
      if (bindEvents) {
        console.log('BindEvents', bindEvents);
      }
    });
  }

  private createMap(options: MapboxGl.MapboxOptions) {
    NgZone.assertNotInAngularZone();
    this.mapInstance = new MapboxGl.Map(options);
  }

  private hookEvents(events: MapEvents) {
    this.mapInstance?.on('load', (event) => {
      this.mapLoaded.next();
      this.mapLoaded.complete();
      this.ngZone.run(() => {
        events.mapLoad.emit(event.target);
      });
    });
  }
}
