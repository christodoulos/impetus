import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Credentials,
  FiSdmWeatherObserved,
  OAuthResponse,
} from '@impetus/api-interfaces';
import { Map, SymbolLayer } from 'mapbox-gl';
import { UserRepository, UserEffects } from '@impetus/state';
import { dispatch } from '@ngneat/effects';
import { AuthService } from './services/auth.service';
import { map, mergeMap, Observable, tap } from 'rxjs';
import { OrionService } from './services/orion.service';

@Component({
  selector: 'impetus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isAuthenticated$ = this.user.isAuthenticated$;
  dispatch = dispatch;
  loginAction = this.effects.loginAction;
  constructor(
    private http: HttpClient,
    private user: UserRepository,
    private effects: UserEffects,
    private auth: AuthService // private orion: OrionService
  ) {}
  labelLayerId: string | undefined;
  entities: Array<FiSdmWeatherObserved> = [];

  ngOnInit(): void {
    this.auth.getAllEntities().subscribe((res) => {
      this.entities = res;
    });
  }

  onCredentials(credentials: Credentials) {
    console.log(credentials);
    // this.auth
    //   .getJWTToken(credentials)
    //   .pipe(map((response) => response as OAuthResponse))
    //   .subscribe((res) => {
    //     localStorage.setItem('access_token', res.access_token);
    //     localStorage.setItem('refresh_token', res.refresh_token);
    //     localStorage.setItem(
    //       'expires_in',
    //       new Date(new Date().getTime() + res.expires_in * 1000).toString()
    //     );
    //   });
    dispatch(this.loginAction({ user: credentials }));
  }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  getAllEntities() {
    return this.auth.getAllEntities().subscribe((res) => {
      this.entities = res;
    });
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('expires_in');
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
