import { Component } from '@angular/core';
import { Credentials, FiSdmWeatherObserved } from '@impetus/api-interfaces';
import { Map, SymbolLayer } from 'mapbox-gl';
import {
  UserRepository,
  UserEffects,
  OrionRepository,
  OrionEffects,
} from '@impetus/state';
import { dispatch } from '@ngneat/effects';

@Component({
  selector: 'impetus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isAuthenticated$ = this.user.isAuthenticated$;
  access_token$ = this.user.access_token$;
  entities$ = this.orion.entities$;
  dispatch = dispatch;
  loginAction = this.effects.loginAction;
  logoutAction = this.effects.logoutAction;
  getAllOrionEntitiesAction = this.orionEffects.getAllEntitiesAction;
  constructor(
    private user: UserRepository,
    private effects: UserEffects,
    private orion: OrionRepository,
    private orionEffects: OrionEffects
  ) {}
  labelLayerId: string | undefined;
  entities: Array<FiSdmWeatherObserved> = [];

  onCredentials(credentials: Credentials) {
    dispatch(this.loginAction({ user: credentials }));
  }

  getAllEntities() {
    this.access_token$.subscribe((token) =>
      dispatch(this.getAllOrionEntitiesAction({ token }))
    );
  }

  logout() {
    dispatch(this.logoutAction);
  }

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
