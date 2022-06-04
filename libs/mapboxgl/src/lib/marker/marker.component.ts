import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  SimpleChanges,
} from '@angular/core';
import { LngLatLike, Marker, MarkerOptions } from 'mapbox-gl';
import { MapService } from '../map/map.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'mapboxgl-marker',
  templateUrl: './marker.component.html',
  encapsulation: ViewEncapsulation.None, // TODO: WTF is this?
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkerComponent
  implements OnChanges, OnDestroy, AfterViewInit, OnInit
{
  /* Init inputs */
  @Input() offset?: MarkerOptions['offset'];
  @Input() anchor?: MarkerOptions['anchor'];
  @Input() clickTolerance?: MarkerOptions['clickTolerance'];

  /* Dynamic inputs */
  @Input() feature?: GeoJSON.Feature<GeoJSON.Point>;
  @Input() lngLat?: LngLatLike;
  @Input() draggable?: MarkerOptions['draggable'];
  @Input() popupShown?: boolean;
  @Input() className: string | undefined;
  @Input() pitchAlignment?: MarkerOptions['pitchAlignment'];
  @Input() rotationAlignment?: MarkerOptions['rotationAlignment'];

  /* Outputs */
  @Output() markerDragStart = new EventEmitter<Marker>();
  @Output() markerDragEnd = new EventEmitter<Marker>();
  @Output() markerDrag = new EventEmitter<Marker>();

  @ViewChild('content', { static: true }) content: ElementRef | undefined;

  markerInstance?: Marker;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    if (this.feature && this.lngLat) {
      throw new Error('feature and lngLat input are mutually exclusive');
    }
  }

  ngAfterViewInit(): void {
    if (this.mapService.mapCreated$)
      this.mapService.mapCreated$.subscribe(() => {
        console.log('BBBBBBBBBBBBBBBBBB', this.lngLat, this.offset);
        this.markerInstance = this.mapService.addMarker({
          markersOptions: {
            // offset: this.offset,
            // anchor: this.anchor,
            // pitchAlignment: this.pitchAlignment,
            // rotationAlignment: this.rotationAlignment,
            // draggable: !!this.draggable,
            element: this.content?.nativeElement,
            // feature: this.feature,
            lngLat: this.lngLat,
            // clickTolerance: this.clickTolerance,
          },
          markersEvents: {
            markerDragStart: this.markerDragStart,
            markerDrag: this.markerDrag,
            markerDragEnd: this.markerDragEnd,
          },
        });
      });
  }

  ngOnDestroy(): void {
    if (this.markerInstance) this.mapService.removeMarker(this.markerInstance);
    this.markerInstance = undefined;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lngLat'] && !changes['lngLat'].isFirstChange()) {
      if (this.markerInstance && this.lngLat) {
        this.markerInstance.setLngLat(this.lngLat);
      }
    }

    if (changes['feature'] && !changes['feature'].isFirstChange()) {
      if (this.markerInstance && this.feature)
        this.markerInstance.setLngLat(
          <[number, number]>this.feature.geometry.coordinates
        );
    }

    if (changes['draggable'] && !changes['draggable'].isFirstChange()) {
      if (this.markerInstance)
        this.markerInstance.setDraggable(!!this.draggable);
    }

    if (changes['popupShown'] && !changes['popupShown'].isFirstChange()) {
      if (this.markerInstance && this.mapService.mapInstance)
        changes['popupShown'].currentValue
          ? this.markerInstance.getPopup().addTo(this.mapService.mapInstance)
          : this.markerInstance.getPopup().remove();
    }

    if (
      changes['pitchAlignment'] &&
      !changes['pitchAlignment'].isFirstChange()
    ) {
      if (this.markerInstance)
        this.markerInstance.setPitchAlignment(
          changes['pitchAlignment'].currentValue
        );
    }

    if (
      changes['rotationAlignment'] &&
      !changes['rotationAlignment'].isFirstChange()
    ) {
      if (this.markerInstance)
        this.markerInstance.setRotationAlignment(
          changes['rotationAlignment'].currentValue
        );
    }
  }

  togglePopup() {
    if (this.markerInstance) this.markerInstance.togglePopup();
  }

  updateCoordinates(coordinates: number[]) {
    if (this.markerInstance)
      this.markerInstance.setLngLat(<[number, number]>coordinates);
  }
}
