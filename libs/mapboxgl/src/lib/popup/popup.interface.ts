import { EventEmitter } from '@angular/core';
import { PopupOptions } from 'mapbox-gl';

export interface PopupSetup {
  popupOptions: PopupOptions;
  popupEvents: {
    // open: EventEmitter<void>;
    // close: EventEmitter<void>;
    popupOpen: EventEmitter<void>;
    popupClose: EventEmitter<void>;
  };
}
