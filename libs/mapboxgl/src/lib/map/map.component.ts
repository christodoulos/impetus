import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from './map.service';
import { MapEvents } from './map.interfaces';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'mapboxgl-map',
  templateUrl: './map.component.html',
  providers: [MapService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent
  implements
    AfterViewInit,
    Omit<mapboxgl.MapboxOptions, 'bearing' | 'container' | 'pitch' | 'zoom'>,
    MapEvents
{
  @ViewChild('map', { static: true }) mapContainer!: ElementRef;

  // inputs
  @Input() style: mapboxgl.MapboxOptions['style'];
  @Input() center?: mapboxgl.MapboxOptions['center'];
  @Input() zoom?: number;
  @Input() bearing?: number;
  @Input() pitch?: number;

  // outputs
  @Output() mapLoad = new EventEmitter<mapboxgl.Map>();

  constructor(private mapService: MapService) {}

  ngAfterViewInit(): void {
    this.mapService.setup(
      {
        container: this.mapContainer.nativeElement,
        style: this.style,
        center: this.center,
        zoom: this.zoom,
        bearing: this.bearing,
        pitch: this.pitch,
      },
      { mapLoad: this.mapLoad }
    );
  }
}
