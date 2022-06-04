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
import {
  EventData,
  Map,
  MapboxEvent,
  MapboxOptions,
  MapBoxZoomEvent,
  MapContextEvent,
  MapDataEvent,
  MapMouseEvent,
  MapSourceDataEvent,
  MapStyleDataEvent,
  MapTouchEvent,
  MapWheelEvent,
} from 'mapbox-gl';
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
    Omit<MapboxOptions, 'bearing' | 'container' | 'pitch' | 'zoom'>,
    MapEvents
{
  @ViewChild('map', { static: true }) mapContainer!: ElementRef;

  // inputs
  @Input() style: MapboxOptions['style'];
  @Input() center?: MapboxOptions['center'];
  @Input() zoom?: number;
  @Input() bearing?: number;
  @Input() pitch?: number;

  // outputs
  @Output() mapLoad = new EventEmitter<Map>();
  @Output() mapResize = new EventEmitter<MapboxEvent & EventData>();
  @Output() mapRemove = new EventEmitter<MapboxEvent & EventData>();
  @Output() mapMouseDown = new EventEmitter<MapMouseEvent & EventData>();
  @Output() mapMouseUp = new EventEmitter<MapMouseEvent & EventData>();
  @Output() mapMouseMove = new EventEmitter<MapMouseEvent & EventData>();
  @Output() mapClick = new EventEmitter<MapMouseEvent & EventData>();
  @Output() mapDblClick = new EventEmitter<MapMouseEvent & EventData>();
  @Output() mapMouseOver = new EventEmitter<MapMouseEvent & EventData>();
  @Output() mapMouseOut = new EventEmitter<MapMouseEvent & EventData>();
  @Output() mapContextMenu = new EventEmitter<MapMouseEvent & EventData>();
  @Output() mapTouchStart = new EventEmitter<MapTouchEvent & EventData>();
  @Output() mapTouchEnd = new EventEmitter<MapTouchEvent & EventData>();
  @Output() mapTouchMove = new EventEmitter<MapTouchEvent & EventData>();
  @Output() mapTouchCancel = new EventEmitter<MapTouchEvent & EventData>();
  @Output() mapWheel = new EventEmitter<MapWheelEvent & EventData>();
  @Output() moveStart = new EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >();
  @Output() move = new EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >();
  @Output() moveEnd = new EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >();
  @Output() mapDragStart = new EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  @Output() mapDrag = new EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  @Output() mapDragEnd = new EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  @Output() zoomStart = new EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >();
  @Output() zoomEvt = new EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >();
  @Output() zoomEnd = new EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >();
  @Output() rotateStart = new EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  @Output() rotate = new EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  @Output() rotateEnd = new EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  @Output() pitchStart = new EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  @Output() pitchEvt = new EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  @Output() pitchEnd = new EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  @Output() boxZoomStart = new EventEmitter<MapBoxZoomEvent & EventData>();
  @Output() boxZoomEnd = new EventEmitter<MapBoxZoomEvent & EventData>();
  @Output() boxZoomCancel = new EventEmitter<MapBoxZoomEvent & EventData>();
  @Output() webGlContextLost = new EventEmitter<MapContextEvent & EventData>();
  @Output() webGlContextRestored = new EventEmitter<
    MapContextEvent & EventData
  >();
  // @Output() mapLoad = new EventEmitter<Map>();
  @Output() idle = new EventEmitter<MapboxEvent & EventData>();
  @Output() render = new EventEmitter<MapboxEvent & EventData>();
  @Output() mapError = new EventEmitter<ErrorEvent & EventData>();
  @Output() data = new EventEmitter<MapDataEvent & EventData>();
  @Output() styleData = new EventEmitter<MapStyleDataEvent & EventData>();
  @Output() sourceData = new EventEmitter<MapSourceDataEvent & EventData>();
  @Output() dataLoading = new EventEmitter<MapDataEvent & EventData>();
  @Output() styleDataLoading = new EventEmitter<
    MapStyleDataEvent & EventData
  >();
  @Output() sourceDataLoading = new EventEmitter<
    MapSourceDataEvent & EventData
  >();
  @Output() styleImageMissing = new EventEmitter<{ id: string } & EventData>();

  /**
   * @deprecated Use mapResize instead
   */
  @Output() _resize = new EventEmitter<MapboxEvent & EventData>();
  /**
   * @deprecated Use mapRemove instead
   */
  @Output() _remove = new EventEmitter<MapboxEvent & EventData>();
  /**
   * @deprecated Use mapMouseDown instead
   */
  @Output() mouseDown = new EventEmitter<MapMouseEvent & EventData>();
  /**
   * @deprecated Use mapMouseUp instead
   */
  @Output() mouseUp = new EventEmitter<MapMouseEvent & EventData>();
  /**
   * @deprecated Use mapMouseMove instead
   */
  @Output() mouseMove = new EventEmitter<MapMouseEvent & EventData>();
  /**
   * @deprecated Use mapClick instead
   */
  @Output() _click = new EventEmitter<MapMouseEvent & EventData>();
  /**
   * @deprecated Use mapDblClick instead
   */
  @Output() dblClick = new EventEmitter<MapMouseEvent & EventData>();
  /**
   * @deprecated Use mapMouseOver instead
   */
  @Output() mouseOver = new EventEmitter<MapMouseEvent & EventData>();
  /**
   * @deprecated Use mapMouseOut instead
   */
  @Output() mouseOut = new EventEmitter<MapMouseEvent & EventData>();
  /**
   * @deprecated Use mapContextMenu instead
   */
  @Output() contextMenu = new EventEmitter<MapMouseEvent & EventData>();
  /**
   * @deprecated Use mapTouchStart instead
   */
  @Output() touchStart = new EventEmitter<MapTouchEvent & EventData>();
  /**
   * @deprecated Use mapTouchEnd instead
   */
  @Output() touchEnd = new EventEmitter<MapTouchEvent & EventData>();
  /**
   * @deprecated Use mapTouchMove instead
   */
  @Output() touchMove = new EventEmitter<MapTouchEvent & EventData>();
  /**
   * @deprecated Use mapTouchCancel instead
   */
  @Output() touchCancel = new EventEmitter<MapTouchEvent & EventData>();
  /**
   * @deprecated Use mapWheel instead
   */
  @Output() _wheel = new EventEmitter<MapWheelEvent & EventData>();
  /**
   * @deprecated Use mapDragStart instead
   */
  @Output() dragStart = new EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();
  /**
   * @deprecated Use mapDrag instead
   */
  @Output() _drag = new EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >();

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
      {
        mapLoad: this.mapLoad,

        mapResize: this.mapResize,
        mapRemove: this.mapRemove,
        mapMouseDown: this.mapMouseDown,
        mapMouseUp: this.mapMouseUp,
        mapMouseMove: this.mapMouseMove,
        mapClick: this.mapClick,
        mapDblClick: this.mapDblClick,
        mapMouseOver: this.mapMouseOver,
        mapMouseOut: this.mapMouseOut,
        mapContextMenu: this.mapContextMenu,
        mapTouchStart: this.mapTouchStart,
        mapTouchEnd: this.mapTouchEnd,
        mapTouchMove: this.mapTouchMove,
        mapTouchCancel: this.mapTouchCancel,
        mapWheel: this.mapWheel,
        moveStart: this.moveStart,
        move: this.move,
        moveEnd: this.moveEnd,
        mapDragStart: this.mapDragStart,
        mapDrag: this.mapDrag,
        mapDragEnd: this.mapDragEnd,
        zoomStart: this.zoomStart,
        zoomEvt: this.zoomEvt,
        zoomEnd: this.zoomEnd,
        rotateStart: this.rotateStart,
        rotate: this.rotate,
        rotateEnd: this.rotateEnd,
        pitchStart: this.pitchStart,
        pitchEvt: this.pitchEvt,
        pitchEnd: this.pitchEnd,
        boxZoomStart: this.boxZoomStart,
        boxZoomEnd: this.boxZoomEnd,
        boxZoomCancel: this.boxZoomCancel,
        webGlContextLost: this.webGlContextLost,
        webGlContextRestored: this.webGlContextRestored,
        // mapLoad: this.mapLoad, // Consider emitting MapboxEvent for consistency (breaking change).
        render: this.render,
        mapError: this.mapError,
        data: this.data,
        styleData: this.styleData,
        sourceData: this.sourceData,
        dataLoading: this.dataLoading,
        styleDataLoading: this.styleDataLoading,
        sourceDataLoading: this.sourceDataLoading,
        styleImageMissing: this.styleImageMissing,
        idle: this.idle,
        // resize: this._resize,
        // remove: this._remove,
        mouseDown: this.mouseDown,
        mouseUp: this.mouseUp,
        mouseMove: this.mouseMove,
        // click: this._click,
        dblClick: this.dblClick,
        mouseOver: this.mouseOver,
        mouseOut: this.mouseOut,
        contextMenu: this.contextMenu,
        touchStart: this.touchStart,
        touchEnd: this.touchEnd,
        touchMove: this.touchMove,
        touchCancel: this.touchCancel,
        // wheel: this._wheel,
        dragStart: this.dragStart,
        // drag: this.dragEnd,
        // dragEnd: this.dragEnd,
      }
    );
  }
}
