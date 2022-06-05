import { Inject, Injectable, InjectionToken, NgZone } from '@angular/core';
// import * as MapboxGl from 'mapbox-gl';
import {
  Map,
  MapboxOptions,
  AnyLayer,
  BackgroundPaint,
  FillPaint,
  FillExtrusionPaint,
  LinePaint,
  SymbolPaint,
  RasterPaint,
  CirclePaint,
  BackgroundLayout,
  FillLayout,
  FillExtrusionLayout,
  LineLayout,
  SymbolLayout,
  RasterLayout,
  CircleLayout,
  MarkerOptions,
  Marker,
  LngLatLike,
  Style,
  LngLatBoundsLike,
} from 'mapbox-gl';
import { AsyncSubject, first, Observable, Subscription } from 'rxjs';
import { MarkerSetup } from '../marker/marker.interface';
import { LayerSetup } from '../layer/layer.interface';
import { MapEvents } from './map.interfaces';

export const MAPBOX_API_KEY = new InjectionToken('MapboxApiKey');

@Injectable({
  providedIn: 'root',
})
export class MapService {
  // public
  mapInstance: Map | undefined;
  mapCreated$: Observable<void> | undefined;
  mapLoaded$: Observable<void> | undefined;
  mapEvents: MapEvents | undefined;
  //private
  private mapCreated = new AsyncSubject<void>();
  private mapLoaded = new AsyncSubject<void>();
  private markersToRemove: Marker[] = [];
  private subscription = new Subscription();

  constructor(
    private ngZone: NgZone,
    @Inject(MAPBOX_API_KEY) private readonly MAPBOX_API_KEY: string
  ) {
    this.mapCreated$ = this.mapCreated.asObservable();
    this.mapLoaded$ = this.mapLoaded.asObservable();
  }

  // //////////////////////////////////////////////////////////////////////////
  // Map Manipulations
  // //////////////////////////////////////////////////////////////////////////

  setup(options: MapboxOptions, events: MapEvents) {
    this.ngZone.onStable.pipe(first()).subscribe(() => {
      options.accessToken = this.MAPBOX_API_KEY;
      this.createMap(options);
      this.hookEvents(events);
      this.mapEvents = events;
      this.mapCreated.next(undefined);
      this.mapCreated.complete();
    });
  }

  applyChanges() {
    this.ngZone.runOutsideAngular(() => {
      this.removeMarkers();
      // this.removePopups();
      // this.removeImages();
    });
  }

  private createMap(options: MapboxOptions) {
    NgZone.assertNotInAngularZone();

    // Deletes undefined map options //////////////////////////////////////////
    Object.keys(options).forEach((key: string) => {
      const tkey = <keyof MapboxOptions>key;
      if (options[tkey] === undefined) {
        delete options[tkey];
      }
    });
    ///////////////////////////////////////////////////////////////////////////

    this.mapInstance = new Map(options);

    this.subscription.add(
      this.ngZone.onMicrotaskEmpty.subscribe(() => this.applyChanges())
    );
  }

  destroyMap() {
    if (this.mapInstance) {
      this.subscription.unsubscribe();
      this.mapInstance.remove();
    }
  }

  // Map updates //////////////////////////////////////////////////////////////

  updateMinZoom(minZoom: number) {
    return this.ngZone.runOutsideAngular(() => {
      this.mapInstance?.setMinZoom(minZoom);
    });
  }

  updateMaxZoom(maxZoom: number) {
    return this.ngZone.runOutsideAngular(() => {
      this.mapInstance?.setMaxZoom(maxZoom);
    });
  }

  updateMinPitch(minPitch: number) {
    return this.ngZone.runOutsideAngular(() => {
      this.mapInstance?.setMinPitch(minPitch);
    });
  }

  updateMaxPitch(maxPitch: number) {
    return this.ngZone.runOutsideAngular(() => {
      this.mapInstance?.setMaxPitch(maxPitch);
    });
  }

  updateRenderWorldCopies(status: boolean) {
    return this.ngZone.runOutsideAngular(() => {
      this.mapInstance?.setRenderWorldCopies(status);
    });
  }

  updateScrollZoom(status: boolean) {
    return this.ngZone.runOutsideAngular(() => {
      status
        ? this.mapInstance?.scrollZoom.enable()
        : this.mapInstance?.scrollZoom.disable();
    });
  }

  updateDragRotate(status: boolean) {
    return this.ngZone.runOutsideAngular(() => {
      status
        ? this.mapInstance?.dragRotate.enable()
        : this.mapInstance?.dragRotate.disable();
    });
  }

  updateTouchPitch(status: boolean) {
    return this.ngZone.runOutsideAngular(() => {
      status
        ? this.mapInstance?.touchPitch.enable()
        : this.mapInstance?.touchPitch.disable();
    });
  }

  updateTouchZoomRotate(status: boolean) {
    return this.ngZone.runOutsideAngular(() => {
      status
        ? this.mapInstance?.touchZoomRotate.enable()
        : this.mapInstance?.touchZoomRotate.disable();
    });
  }

  updateDoubleClickZoom(status: boolean) {
    return this.ngZone.runOutsideAngular(() => {
      status
        ? this.mapInstance?.doubleClickZoom.enable()
        : this.mapInstance?.doubleClickZoom.disable();
    });
  }

  updateKeyboard(status: boolean) {
    return this.ngZone.runOutsideAngular(() => {
      status
        ? this.mapInstance?.keyboard.enable()
        : this.mapInstance?.keyboard.disable();
    });
  }

  updateDragPan(status: boolean) {
    return this.ngZone.runOutsideAngular(() => {
      status
        ? this.mapInstance?.dragPan.enable()
        : this.mapInstance?.dragPan.disable();
    });
  }

  updateBoxZoom(status: boolean) {
    return this.ngZone.runOutsideAngular(() => {
      status
        ? this.mapInstance?.boxZoom.enable()
        : this.mapInstance?.boxZoom.disable();
    });
  }

  updateStyle(style: Style) {
    return this.ngZone.runOutsideAngular(() => {
      this.mapInstance?.setStyle(style);
    });
  }

  updateMaxBounds(maxBounds: LngLatBoundsLike) {
    return this.ngZone.runOutsideAngular(() => {
      this.mapInstance?.setMaxBounds(maxBounds);
    });
  }

  // Map hookEvents start /////////////////////////////////////////////////////

  private hookEvents(events: MapEvents) {
    this.mapInstance?.on('load', (event) => {
      this.mapLoaded.next(undefined);
      this.mapLoaded.complete();
      this.ngZone.run(() => {
        events.mapLoad.emit(event.target);
      });
    });

    // if (events.mapResize.observers.length || events.resize.observers.length) {
    //   if (this.mapInstance)
    //     this.mapInstance.on('resize', (evt) =>
    //       this.ngZone.run(() => {
    //         events.mapResize.emit(evt);
    //         events.resize.emit(evt);
    //       })
    //     );
    // }

    // if (events.mapRemove.observers.length || events.remove.observers.length) {
    //   if (this.mapInstance)
    //     this.mapInstance.on('remove', (evt) =>
    //       this.ngZone.run(() => {
    //         events.mapRemove.emit(evt);
    //         events.remove.emit(evt);
    //       })
    //     );
    // }

    if (
      events.mapMouseDown.observers.length ||
      events.mouseDown.observers.length
    ) {
      this.mapInstance?.on('mousedown', (evt) =>
        this.ngZone.run(() => {
          events.mapMouseDown.emit(evt);
          events.mouseDown.emit(evt);
        })
      );
    }

    if (events.mapMouseUp.observers.length || events.mouseUp.observers.length) {
      this.mapInstance?.on('mouseup', (evt) =>
        this.ngZone.run(() => {
          events.mapMouseUp.emit(evt);
          events.mouseUp.emit(evt);
        })
      );
    }

    if (
      events.mapMouseMove.observers.length ||
      events.mouseMove.observers.length
    ) {
      this.mapInstance?.on('mousemove', (evt) =>
        this.ngZone.run(() => {
          events.mapMouseMove.emit(evt);
          events.mouseMove.emit(evt);
        })
      );
    }

    // if (events.mapClick.observers.length || events.click.observers.length) {
    //   if (this.mapInstance)
    //     this.mapInstance.on('click', (evt) =>
    //       this.ngZone.run(() => {
    //         events.mapClick.emit(evt);
    //         events.click.emit(evt);
    //       })
    //     );
    // }

    if (
      events.mapDblClick.observers.length ||
      events.dblClick.observers.length
    ) {
      this.mapInstance?.on('dblclick', (evt) =>
        this.ngZone.run(() => {
          events.mapDblClick.emit(evt);
          events.dblClick.emit(evt);
        })
      );
    }

    if (
      events.mapMouseOver.observers.length ||
      events.mouseOver.observers.length
    ) {
      this.mapInstance?.on('mouseover', (evt) =>
        this.ngZone.run(() => {
          events.mapMouseOver.emit(evt);
          events.mouseOver.emit(evt);
        })
      );
    }

    if (
      events.mapMouseOut.observers.length ||
      events.mouseOut.observers.length
    ) {
      this.mapInstance?.on('mouseout', (evt) =>
        this.ngZone.run(() => {
          events.mapMouseOut.emit(evt);
          events.mouseOut.emit(evt);
        })
      );
    }

    if (
      events.mapContextMenu.observers.length ||
      events.contextMenu.observers.length
    ) {
      this.mapInstance?.on('contextmenu', (evt) =>
        this.ngZone.run(() => {
          events.mapContextMenu.emit(evt);
          events.contextMenu.emit(evt);
        })
      );
    }

    if (
      events.mapTouchStart.observers.length ||
      events.touchStart.observers.length
    ) {
      this.mapInstance?.on('touchstart', (evt) =>
        this.ngZone.run(() => {
          events.mapTouchStart.emit(evt);
          events.touchStart.emit(evt);
        })
      );
    }

    if (
      events.mapTouchEnd.observers.length ||
      events.touchEnd.observers.length
    ) {
      this.mapInstance?.on('touchend', (evt) =>
        this.ngZone.run(() => {
          events.mapTouchEnd.emit(evt);
          events.touchEnd.emit(evt);
        })
      );
    }

    if (
      events.mapTouchMove.observers.length ||
      events.touchMove.observers.length
    ) {
      this.mapInstance?.on('touchmove', (evt) =>
        this.ngZone.run(() => {
          events.mapTouchMove.emit(evt);
          events.touchMove.emit(evt);
        })
      );
    }

    if (
      events.mapTouchCancel.observers.length ||
      events.touchCancel.observers.length
    ) {
      this.mapInstance?.on('touchcancel', (evt) =>
        this.ngZone.run(() => {
          events.mapTouchCancel.emit(evt);
          events.touchCancel.emit(evt);
        })
      );
    }

    // if (events.mapWheel.observers.length || events.wheel.observers.length) {
    //   if (this.mapInstance)
    //     this.mapInstance.on('wheel', (evt) =>
    //       this.ngZone.run(() => {
    //         events.mapWheel.emit(evt);
    //         events.wheel.emit(evt);
    //       })
    //     );
    // }

    if (events.moveStart.observers.length) {
      this.mapInstance?.on('movestart', (evt) =>
        this.ngZone.run(() => events.moveStart.emit(evt))
      );
    }

    if (events.move.observers.length) {
      this.mapInstance?.on('move', (evt) =>
        this.ngZone.run(() => events.move.emit(evt))
      );
    }

    if (events.moveEnd.observers.length) {
      this.mapInstance?.on('moveend', (evt) =>
        this.ngZone.run(() => events.moveEnd.emit(evt))
      );
    }

    if (
      events.mapDragStart.observers.length ||
      events.dragStart.observers.length
    ) {
      this.mapInstance?.on('dragstart', (evt) =>
        this.ngZone.run(() => {
          events.mapDragStart.emit(evt);
          events.dragStart.emit(evt);
        })
      );
    }

    // if (events.mapDrag.observers.length || events.drag.observers.length) {
    //   if (this.mapInstance)
    //     this.mapInstance.on('drag', (evt) =>
    //       this.ngZone.run(() => {
    //         events.mapDrag.emit(evt);
    //         events.drag.emit(evt);
    //       })
    //     );
    // }

    // if (events.mapDragEnd.observers.length || events.dragEnd.observers.length) {
    //   if (this.mapInstance)
    //     this.mapInstance.on('dragend', (evt) =>
    //       this.ngZone.run(() => {
    //         events.mapDragEnd.emit(evt);
    //         events.dragEnd.emit(evt);
    //       })
    //     );
    // }

    if (events.zoomStart.observers.length) {
      this.mapInstance?.on('zoomstart', (evt) =>
        this.ngZone.run(() => events.zoomStart.emit(evt))
      );
    }

    if (events.zoomEvt.observers.length) {
      this.mapInstance?.on('zoom', (evt) =>
        this.ngZone.run(() => events.zoomEvt.emit(evt))
      );
    }

    if (events.zoomEnd.observers.length) {
      this.mapInstance?.on('zoomend', (evt) =>
        this.ngZone.run(() => events.zoomEnd.emit(evt))
      );
    }

    if (events.rotateStart.observers.length) {
      this.mapInstance?.on('rotatestart', (evt) =>
        this.ngZone.run(() => events.rotateStart.emit(evt))
      );
    }

    if (events.rotate.observers.length) {
      this.mapInstance?.on('rotate', (evt) =>
        this.ngZone.run(() => events.rotate.emit(evt))
      );
    }

    if (events.rotateEnd.observers.length) {
      this.mapInstance?.on('rotateend', (evt) =>
        this.ngZone.run(() => events.rotateEnd.emit(evt))
      );
    }

    if (events.pitchStart.observers.length) {
      this.mapInstance?.on('pitchstart', (evt) =>
        this.ngZone.run(() => events.pitchStart.emit(evt))
      );
    }

    if (events.pitchEvt.observers.length) {
      this.mapInstance?.on('pitch', (evt) =>
        this.ngZone.run(() => events.pitchEvt.emit(evt))
      );
    }

    if (events.pitchEnd.observers.length) {
      this.mapInstance?.on('pitchend', (evt) =>
        this.ngZone.run(() => events.pitchEnd.emit(evt))
      );
    }

    if (events.boxZoomStart.observers.length) {
      this.mapInstance?.on('boxzoomstart', (evt) =>
        this.ngZone.run(() => events.boxZoomStart.emit(evt))
      );
    }

    if (events.boxZoomEnd.observers.length) {
      this.mapInstance?.on('boxzoomend', (evt) =>
        this.ngZone.run(() => events.boxZoomEnd.emit(evt))
      );
    }

    if (events.boxZoomCancel.observers.length) {
      this.mapInstance?.on('boxzoomcancel', (evt) =>
        this.ngZone.run(() => events.boxZoomCancel.emit(evt))
      );
    }

    if (events.webGlContextLost.observers.length) {
      this.mapInstance?.on('webglcontextlost', (evt) =>
        this.ngZone.run(() => events.webGlContextLost.emit(evt))
      );
    }

    if (events.webGlContextRestored.observers.length) {
      this.mapInstance?.on('webglcontextrestored', (evt) =>
        this.ngZone.run(() => events.webGlContextRestored.emit(evt))
      );
    }

    if (events.render.observers.length) {
      this.mapInstance?.on('render', (evt) =>
        this.ngZone.run(() => events.render.emit(evt))
      );
    }

    // TODO: WTF is the matter with evt here?
    // if (events.mapError.observers.length || events.error.observers.length) {
    //   if (this.mapInstance)
    //     this.mapInstance.on('error', (evt) =>
    //       this.ngZone.run(() => {
    //         events.mapError.emit(evt);
    //         events.error.emit(evt);
    //       })
    //     );
    // }

    if (events.data.observers.length) {
      this.mapInstance?.on('data', (evt) =>
        this.ngZone.run(() => events.data.emit(evt))
      );
    }

    if (events.styleData.observers.length) {
      this.mapInstance?.on('styledata', (evt) =>
        this.ngZone.run(() => events.styleData.emit(evt))
      );
    }

    if (events.sourceData.observers.length) {
      this.mapInstance?.on('sourcedata', (evt) =>
        this.ngZone.run(() => events.sourceData.emit(evt))
      );
    }

    if (events.dataLoading.observers.length) {
      this.mapInstance?.on('dataloading', (evt) =>
        this.ngZone.run(() => events.dataLoading.emit(evt))
      );
    }

    if (events.styleDataLoading.observers.length) {
      this.mapInstance?.on('styledataloading', (evt) =>
        this.ngZone.run(() => events.styleDataLoading.emit(evt))
      );
    }

    if (events.sourceDataLoading.observers.length) {
      this.mapInstance?.on('sourcedataloading', (evt) =>
        this.ngZone.run(() => events.sourceDataLoading.emit(evt))
      );
    }

    if (events.styleImageMissing.observers.length) {
      this.mapInstance?.on('styleimagemissing', (evt) =>
        this.ngZone.run(() => events.styleImageMissing.emit(evt))
      );
    }

    if (events.idle.observers.length) {
      this.mapInstance?.on('idle', (evt) =>
        this.ngZone.run(() => events.idle.emit(evt))
      );
    }
  } // Map hookEvents end /////////////////////////////////////////////////////

  // //////////////////////////////////////////////////////////////////////////
  // Layer Manipulations
  // //////////////////////////////////////////////////////////////////////////

  addLayer(layer: LayerSetup, bindEvents: boolean, before?: string) {
    this.ngZone.runOutsideAngular(() => {
      // Deletes undefined Layer options //////////////////////////////////////
      Object.keys(layer.options).forEach((key: string) => {
        const tkey = <keyof AnyLayer>key;
        if (layer.options[tkey] === undefined) {
          delete layer.options[tkey];
        }
      });
      /////////////////////////////////////////////////////////////////////////
      this.mapInstance?.addLayer(layer.options as AnyLayer, before);
      if (bindEvents) {
        // console.log('BindEvents', bindEvents);
      }
    });
  }

  removeLayer(layerId: string) {
    this.ngZone.runOutsideAngular(() => {
      if (this.mapInstance?.getLayer(layerId) != null) {
        this.mapInstance.removeLayer(layerId);
      }
    });
  }

  setAllLayerPaintProperty(
    layerId: string,
    paint:
      | BackgroundPaint
      | FillPaint
      | FillExtrusionPaint
      | LinePaint
      | SymbolPaint
      | RasterPaint
      | CirclePaint
  ) {
    return this.ngZone.runOutsideAngular(() => {
      Object.keys(paint).forEach((key) => {
        // TODO Check for perf, setPaintProperty only on changed paint props maybe
        this.mapInstance?.setPaintProperty(layerId, key, (<never>paint)[key]);
      });
    });
  }

  setAllLayerLayoutProperty(
    layerId: string,
    layout:
      | BackgroundLayout
      | FillLayout
      | FillExtrusionLayout
      | LineLayout
      | SymbolLayout
      | RasterLayout
      | CircleLayout
  ) {
    return this.ngZone.runOutsideAngular(() => {
      Object.keys(layout).forEach((key) => {
        // TODO Check for perf, setPaintProperty only on changed paint props maybe
        this.mapInstance?.setLayoutProperty(layerId, key, (<never>layout)[key]);
      });
    });
  }

  setLayerFilter(layerId: string, filter: never[]) {
    return this.ngZone.runOutsideAngular(() => {
      this.mapInstance?.setFilter(layerId, filter);
    });
  }

  setLayerBefore(layerId: string, beforeId: string) {
    return this.ngZone.runOutsideAngular(() => {
      this.mapInstance?.moveLayer(layerId, beforeId);
    });
  }

  setLayerZoomRange(layerId: string, minZoom?: number, maxZoom?: number) {
    return this.ngZone.runOutsideAngular(() => {
      this.mapInstance?.setLayerZoomRange(
        layerId,
        minZoom ? minZoom : 0,
        maxZoom ? maxZoom : 20
      );
    });
  }

  // //////////////////////////////////////////////////////////////////////////
  // Marker Manipulations
  // //////////////////////////////////////////////////////////////////////////

  addMarker(marker: MarkerSetup) {
    const options: MarkerOptions = {
      offset: marker.markersOptions.offset,
      anchor: marker.markersOptions.anchor,
      draggable: !!marker.markersOptions.draggable,
      rotationAlignment: marker.markersOptions.rotationAlignment,
      pitchAlignment: marker.markersOptions.pitchAlignment,
      clickTolerance: marker.markersOptions.clickTolerance,
    };

    if (marker.markersOptions.element.childNodes.length > 0) {
      options.element = marker.markersOptions.element;
    }

    const markerInstance = new Marker(options);

    if (marker.markersEvents.markerDragStart.observers.length) {
      markerInstance.on('dragstart', (event) => {
        if (event) {
          const { target } = event as { target: Marker };
          this.ngZone.run(() => {
            marker.markersEvents.markerDragStart.emit(target);
          });
        }
      });
    }

    if (marker.markersEvents.markerDrag.observers.length) {
      markerInstance.on('drag', (event) => {
        if (event) {
          const { target } = event as { target: Marker };
          this.ngZone.run(() => {
            marker.markersEvents.markerDrag.emit(target);
          });
        }
      });
    }

    if (marker.markersEvents.markerDragEnd.observers.length) {
      markerInstance.on('dragend', (event) => {
        if (event) {
          const { target } = event as { target: Marker };
          this.ngZone.run(() => {
            marker.markersEvents.markerDragEnd.emit(target);
          });
        }
      });
    }

    const lngLat: LngLatLike | undefined = marker.markersOptions.feature
      ? <[number, number]>marker.markersOptions.feature.geometry.coordinates
      : marker.markersOptions.lngLat;

    if (lngLat) markerInstance.setLngLat(lngLat);

    return this.ngZone.runOutsideAngular(() => {
      if (this.mapInstance) {
        // TODO: examine this not undefined assertion
        markerInstance.addTo(this.mapInstance);
        return markerInstance;
      } else {
        console.log('Will return undefined market');
        return undefined;
      }
    });
  }

  removeMarker(marker: Marker) {
    this.markersToRemove.push(marker);
  }

  private removeMarkers() {
    for (const marker of this.markersToRemove) {
      marker.remove();
    }
    this.markersToRemove = [];
  }
}
