import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from './map.service';
import { MapEvent } from './map.types';

@Component({
  selector: 'impetus-map',
  templateUrl: './map.component.html',
  providers: [MapService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent
  implements
    AfterViewInit,
    Omit<mapboxgl.MapboxOptions, 'bearing' | 'container' | 'pitch' | 'zoom'>
{
  @ViewChild('map', { static: true }) mapContainer!: ElementRef;

  // MapboxGL inputs
  @Input() style: mapboxgl.MapboxOptions['style'];
  @Input() center?: mapboxgl.MapboxOptions['center'];
  @Input() zoom?: number;
  @Input() bearing?: number;
  @Input() pitch?: number;

  constructor(private mapService: MapService) {}

  ngAfterViewInit(): void {
    this.mapService.setup({
      container: this.mapContainer.nativeElement,
      style: this.style,
      center: this.center,
      zoom: this.zoom,
      bearing: this.bearing,
      pitch: this.pitch,

      // mapEvents: this.
    });
  }
}
