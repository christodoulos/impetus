import { EventEmitter } from '@angular/core';
import {
  EventData,
  Map,
  MapboxEvent,
  MapBoxZoomEvent,
  MapContextEvent,
  MapDataEvent,
  MapMouseEvent,
  MapSourceDataEvent,
  MapStyleDataEvent,
  MapTouchEvent,
  MapWheelEvent,
} from 'mapbox-gl';

export interface MapEvents {
  // mapLoad: EventEmitter<Map>;
  mapResize: EventEmitter<MapboxEvent & EventData>;
  mapRemove: EventEmitter<MapboxEvent & EventData>;
  mapMouseDown: EventEmitter<MapMouseEvent & EventData>;
  mapMouseUp: EventEmitter<MapMouseEvent & EventData>;
  mapMouseMove: EventEmitter<MapMouseEvent & EventData>;
  mapClick: EventEmitter<MapMouseEvent & EventData>;
  mapDblClick: EventEmitter<MapMouseEvent & EventData>;
  mapMouseOver: EventEmitter<MapMouseEvent & EventData>;
  mapMouseOut: EventEmitter<MapMouseEvent & EventData>;
  mapContextMenu: EventEmitter<MapMouseEvent & EventData>;
  mapTouchStart: EventEmitter<MapTouchEvent & EventData>;
  mapTouchEnd: EventEmitter<MapTouchEvent & EventData>;
  mapTouchMove: EventEmitter<MapTouchEvent & EventData>;
  mapTouchCancel: EventEmitter<MapTouchEvent & EventData>;
  mapWheel: EventEmitter<MapWheelEvent & EventData>;
  moveStart: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >;
  move: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >;
  moveEnd: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >;
  mapDragStart: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  mapDrag: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  mapDragEnd: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  zoomStart: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >;
  zoomEvt: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >;
  zoomEnd: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | WheelEvent | undefined> & EventData
  >;
  rotateStart: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  rotate: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  rotateEnd: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  pitchStart: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  pitchEvt: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  pitchEnd: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  boxZoomStart: EventEmitter<MapBoxZoomEvent & EventData>;
  boxZoomEnd: EventEmitter<MapBoxZoomEvent & EventData>;
  boxZoomCancel: EventEmitter<MapBoxZoomEvent & EventData>;
  webGlContextLost: EventEmitter<MapContextEvent & EventData>;
  webGlContextRestored: EventEmitter<MapContextEvent & EventData>;
  mapLoad: EventEmitter<Map>; // Consider emitting MapboxEvent for consistency (breaking change).
  render: EventEmitter<MapboxEvent & EventData>;
  mapError: EventEmitter<ErrorEvent & EventData>;
  data: EventEmitter<MapDataEvent & EventData>;
  styleData: EventEmitter<MapStyleDataEvent & EventData>;
  sourceData: EventEmitter<MapSourceDataEvent & EventData>;
  dataLoading: EventEmitter<MapDataEvent & EventData>;
  styleDataLoading: EventEmitter<MapStyleDataEvent & EventData>;
  sourceDataLoading: EventEmitter<MapSourceDataEvent & EventData>;
  styleImageMissing: EventEmitter<{ id: string } & EventData>;
  idle: EventEmitter<MapboxEvent & EventData>;

  // resize: EventEmitter<MapboxEvent & EventData>;
  // remove: EventEmitter<MapboxEvent & EventData>;
  mouseDown: EventEmitter<MapMouseEvent & EventData>;
  mouseUp: EventEmitter<MapMouseEvent & EventData>;
  mouseMove: EventEmitter<MapMouseEvent & EventData>;
  // click: EventEmitter<MapMouseEvent & EventData>;
  dblClick: EventEmitter<MapMouseEvent & EventData>;
  mouseOver: EventEmitter<MapMouseEvent & EventData>;
  mouseOut: EventEmitter<MapMouseEvent & EventData>;
  contextMenu: EventEmitter<MapMouseEvent & EventData>;
  touchStart: EventEmitter<MapTouchEvent & EventData>;
  touchEnd: EventEmitter<MapTouchEvent & EventData>;
  touchMove: EventEmitter<MapTouchEvent & EventData>;
  touchCancel: EventEmitter<MapTouchEvent & EventData>;
  // wheel: EventEmitter<MapWheelEvent & EventData>;
  dragStart: EventEmitter<
    MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  >;
  // drag: EventEmitter<
  //   MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  // >;
  // dragEnd: EventEmitter<
  //   MapboxEvent<MouseEvent | TouchEvent | undefined> & EventData
  // >;
  // load: EventEmitter<Map>; // Consider emitting MapboxEvent for consistency (breaking change).
  // error: EventEmitter<ErrorEvent & EventData>;
}
