import { Component, Input, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {
  filter,
  fromEvent,
  mapTo,
  startWith,
  Subscription,
  switchMap,
} from 'rxjs';
import { MapService } from '../map/map.service';
import { LayerSetup, LayerEvents } from './layer.interface';

@Component({
  selector: 'impetus-layer',
  template: '',
})
export class LayerComponent implements OnInit {
  /* Init inputs */
  @Input() id!: mapboxgl.AnyLayer['id'];
  @Input() source?: mapboxgl.Layer['source'];
  @Input() type!: mapboxgl.AnyLayer['type'];
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
    if (this.mapService.mapLoaded$)
      this.subscription = this.mapService.mapLoaded$
        .pipe(
          switchMap(() =>
            fromEvent(
              <mapboxgl.Map>this.mapService.mapInstance,
              'styledata'
            ).pipe(
              mapTo(false),
              filter(() => !this.mapService.mapInstance?.getLayer(this.id)),
              startWith(true)
            )
          )
        )
        .subscribe((bindEvents: boolean) => this.init(bindEvents));
  }

  private init(bindEvents: boolean) {
    const layer: LayerSetup = {
      options: {
        id: this.id,
        type: this.type,
        metadata: this.metadata,
        source: this.source,
        // 'source-layer': this.sourceLayer,
        // minzoom: this.minzoom,
        // maxzoom: this.maxzoom,
        // filter: this.filter,
        layout: this.layout,
        paint: this.paint,
      },
      events: {},
    };
    this.mapService.addLayer(layer, bindEvents, this.before);
    this.layerAdded = true;
  }
}
