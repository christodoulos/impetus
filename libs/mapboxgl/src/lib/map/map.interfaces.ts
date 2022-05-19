import { EventEmitter } from '@angular/core';
import { Map } from 'mapbox-gl';

export interface MapEvents {
  mapLoad: EventEmitter<Map>;
}
