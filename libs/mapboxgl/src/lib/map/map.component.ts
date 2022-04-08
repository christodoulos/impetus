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
  styleUrls: ['./map.component.css'],
  providers: [MapService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements AfterViewInit {
  @ViewChild('map', { static: true }) mapContainer!: ElementRef;
  @Input() accessToken?: mapboxgl.MapboxOptions['accessToken'];
  @Input() zoom?: [number];
  @Input() bearing?: [number];
  @Input() pitch?: [number];

  constructor(private mapService: MapService) {}

  ngAfterViewInit(): void {
    this.mapService.setup({
      accessToken: this.accessToken,
      mapOptions: {
        container: this.mapContainer.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: [9], // starting zoom
      },
      // mapEvents: this.
    });
  }
}
