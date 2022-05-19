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

  // //////////////////////////////////////////////////////////////////////////
  // Map Manipulations
  // //////////////////////////////////////////////////////////////////////////

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

  // //////////////////////////////////////////////////////////////////////////
  // Layer Manipulations
  // //////////////////////////////////////////////////////////////////////////

  addLayer(layer: LayerSetup, bindEvents: boolean, before?: string) {
    this.ngZone.runOutsideAngular(() => {
      // Deletes undefined Layer options //////////////////////////////////////
      Object.keys(layer.options).forEach((key: string) => {
        const tkey = <keyof MapboxGl.AnyLayer>key;
        if (layer.options[tkey] === undefined) {
          delete layer.options[tkey];
        }
      });
      /////////////////////////////////////////////////////////////////////////
      this.mapInstance?.addLayer(layer.options as MapboxGl.AnyLayer, before);
      if (bindEvents) {
        console.log('BindEvents', bindEvents);
      }
    });
  }

  removeLayer(layerId: string) {
    this.ngZone.runOutsideAngular(() => {
      if (this.mapInstance?.getLayer(layerId) != null) {
        this.mapInstance.removeLayer(layerId);
      }
    });
  }

  setAllLayerPaintProperty(
    layerId: string,
    paint:
      | MapboxGl.BackgroundPaint
      | MapboxGl.FillPaint
      | MapboxGl.FillExtrusionPaint
      | MapboxGl.LinePaint
      | MapboxGl.SymbolPaint
      | MapboxGl.RasterPaint
      | MapboxGl.CirclePaint
  ) {
    return this.ngZone.runOutsideAngular(() => {
      Object.keys(paint).forEach((key) => {
        // TODO Check for perf, setPaintProperty only on changed paint props maybe
        this.mapInstance?.setPaintProperty(layerId, key, (<never>paint)[key]);
      });
    });
  }

  setAllLayerLayoutProperty(
    layerId: string,
    layout:
      | MapboxGl.BackgroundLayout
      | MapboxGl.FillLayout
      | MapboxGl.FillExtrusionLayout
      | MapboxGl.LineLayout
      | MapboxGl.SymbolLayout
      | MapboxGl.RasterLayout
      | MapboxGl.CircleLayout
  ) {
    return this.ngZone.runOutsideAngular(() => {
      Object.keys(layout).forEach((key) => {
        // TODO Check for perf, setPaintProperty only on changed paint props maybe
        this.mapInstance?.setLayoutProperty(layerId, key, (<never>layout)[key]);
      });
    });
  }

  setLayerFilter(layerId: string, filter: never[]) {
    return this.ngZone.runOutsideAngular(() => {
      this.mapInstance?.setFilter(layerId, filter);
    });
  }

  setLayerBefore(layerId: string, beforeId: string) {
    return this.ngZone.runOutsideAngular(() => {
      this.mapInstance?.moveLayer(layerId, beforeId);
    });
  }

  setLayerZoomRange(layerId: string, minZoom?: number, maxZoom?: number) {
    return this.ngZone.runOutsideAngular(() => {
      this.mapInstance?.setLayerZoomRange(
        layerId,
        minZoom ? minZoom : 0,
        maxZoom ? maxZoom : 20
      );
    });
  }
}
