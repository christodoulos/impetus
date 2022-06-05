import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
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
import { LayerSetup } from './layer.interface';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'mapboxgl-layer',
  template: '',
})
export class LayerComponent implements OnInit, OnDestroy, OnChanges {
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
    if (this.mapService.mapLoaded$)
      // TODO: Understand what exactly is going on here
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

  ngOnDestroy(): void {
    if (this.layerAdded) {
      this.mapService.removeLayer(this.id);
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.layerAdded) {
      return;
    }
    if (changes['paint'] && !changes['paint'].isFirstChange()) {
      this.mapService.setAllLayerPaintProperty(
        this.id,
        changes['paint'].currentValue
      );
    }
    if (changes['layout'] && !changes['layout'].isFirstChange()) {
      this.mapService.setAllLayerLayoutProperty(
        this.id,
        changes['layout'].currentValue
      );
    }
    if (changes['filter'] && !changes['filter'].isFirstChange()) {
      this.mapService.setLayerFilter(this.id, changes['filter'].currentValue);
    }
    if (changes['before'] && !changes['before'].isFirstChange()) {
      this.mapService.setLayerBefore(this.id, changes['before'].currentValue);
    }
    if (
      (changes['minzoom'] && !changes['minzoom'].isFirstChange()) ||
      (changes['maxzoom'] && !changes['maxzoom'].isFirstChange())
    ) {
      this.mapService.setLayerZoomRange(this.id, this.minzoom, this.maxzoom);
    }
  }

  private init(bindEvents: boolean) {
    const layer: LayerSetup = {
      options: {
        id: this.id,
        type: this.type,
        metadata: this.metadata,
        source: this.source,
        'source-layer': this.sourceLayer,
        minzoom: this.minzoom,
        maxzoom: this.maxzoom,
        filter: this.filter,
        layout: this.layout,
        paint: this.paint,
      },
      events: {},
    };
    this.mapService.addLayer(layer, bindEvents, this.before);
    this.layerAdded = true;
  }
}
