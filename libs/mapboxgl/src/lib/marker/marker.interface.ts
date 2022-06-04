import { EventEmitter } from '@angular/core';
import { LngLatLike, Marker, MarkerOptions } from 'mapbox-gl';

export interface MarkerSetup {
  markersOptions: {
    pitchAlignment?: MarkerOptions['pitchAlignment'];
    rotationAlignment?: MarkerOptions['rotationAlignment'];
    offset?: MarkerOptions['offset'];
    anchor?: MarkerOptions['anchor'];
    draggable?: MarkerOptions['draggable'];
    element: HTMLElement;
    feature?: GeoJSON.Feature<GeoJSON.Point>;
    lngLat?: LngLatLike;
    clickTolerance?: MarkerOptions['clickTolerance'];
  };
  markersEvents: {
    markerDragStart: EventEmitter<Marker>;
    markerDrag: EventEmitter<Marker>;
    markerDragEnd: EventEmitter<Marker>;
  };
}
