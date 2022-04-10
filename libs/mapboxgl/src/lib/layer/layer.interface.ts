import { EventEmitter } from '@angular/core';
import {
  EventData,
  Layer,
  MapLayerMouseEvent,
  MapLayerTouchEvent,
} from 'mapbox-gl';

export interface LayerEvents {
  layerClick?: EventEmitter<MapLayerMouseEvent & EventData>;
  layerDblClick?: EventEmitter<MapLayerMouseEvent & EventData>;
  layerMouseDown?: EventEmitter<MapLayerMouseEvent & EventData>;
  layerMouseUp?: EventEmitter<MapLayerMouseEvent & EventData>;
  layerMouseEnter?: EventEmitter<MapLayerMouseEvent & EventData>;
  layerMouseLeave?: EventEmitter<MapLayerMouseEvent & EventData>;
  layerMouseMove?: EventEmitter<MapLayerMouseEvent & EventData>;
  layerMouseOver?: EventEmitter<MapLayerMouseEvent & EventData>;
  layerMouseOut?: EventEmitter<MapLayerMouseEvent & EventData>;
  layerContextMenu?: EventEmitter<MapLayerMouseEvent & EventData>;
  layerTouchStart?: EventEmitter<MapLayerTouchEvent & EventData>;
  layerTouchEnd?: EventEmitter<MapLayerTouchEvent & EventData>;
  layerTouchCancel?: EventEmitter<MapLayerTouchEvent & EventData>;
  click?: EventEmitter<MapLayerMouseEvent & EventData>;
  dblClick?: EventEmitter<MapLayerMouseEvent & EventData>;
  mouseDown?: EventEmitter<MapLayerMouseEvent & EventData>;
  mouseUp?: EventEmitter<MapLayerMouseEvent & EventData>;
  mouseEnter?: EventEmitter<MapLayerMouseEvent & EventData>;
  mouseLeave?: EventEmitter<MapLayerMouseEvent & EventData>;
  mouseMove?: EventEmitter<MapLayerMouseEvent & EventData>;
  mouseOver?: EventEmitter<MapLayerMouseEvent & EventData>;
  mouseOut?: EventEmitter<MapLayerMouseEvent & EventData>;
  contextMenu?: EventEmitter<MapLayerMouseEvent & EventData>;
  touchStart?: EventEmitter<MapLayerTouchEvent & EventData>;
  touchEnd?: EventEmitter<MapLayerTouchEvent & EventData>;
  touchCancel?: EventEmitter<MapLayerTouchEvent & EventData>;
}

export interface LayerSetup {
  options: Layer;
  events: LayerEvents;
}
