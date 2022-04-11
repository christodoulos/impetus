import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@impetus/api-interfaces';
import { Map, SymbolLayer } from 'mapbox-gl';

@Component({
  selector: 'impetus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}
  labelLayerId: string | undefined;

  onMapLoad(map: Map) {
    const layers = map.getStyle().layers;

    if (layers) {
      for (let i = 0; i < layers.length; i++) {
        if (
          layers[i].type === 'symbol' &&
          (<SymbolLayer>layers[i]).layout?.['text-field']
        ) {
          this.labelLayerId = layers[i].id;
          break;
        }
      }
    }
  }
}
