import { Component, Input, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { Subscription } from 'rxjs';
import { MapService } from '../map/map.service';

@Component({
  selector: 'impetus-layer',
  template: '',
})
export class LayerComponent implements OnInit {
  /* Init inputs */
  @Input() id: mapboxgl.AnyLayer['id'] | undefined;
  @Input() source?: mapboxgl.Layer['source'];
  @Input() type: mapboxgl.AnyLayer['type'] | undefined;
  @Input() metadata?: mapboxgl.Layer['metadata'];
  @Input() sourceLayer?: mapboxgl.Layer['source-layer'];

  /* Dynamic inputs */
  @Input() filter?: mapboxgl.Layer['filter'];
  @Input() layout?: mapboxgl.Layer['layout'];
  @Input() paint?: mapboxgl.Layer['paint'];
  @Input() before?: string;
  @Input() minzoom?: mapboxgl.Layer['minzoom'];
  @Input() maxzoom?: mapboxgl.Layer['maxzoom'];

  private layerAdded = false;
  private subscription: Subscription | undefined;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    console.log('layer init');
  }
}
