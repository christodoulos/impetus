import { EventEmitter } from '@angular/core';
import { EventData, Map, MapboxEvent } from 'mapbox-gl';

export interface MapEvents {
  mapLoad: EventEmitter<Map>;
}
