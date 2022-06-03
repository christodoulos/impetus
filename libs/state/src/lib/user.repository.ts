import { Store, createState, withProps, select } from '@ngneat/elf';
import {
  actionsFactory,
  createAction,
  createEffect,
  ofType,
  props,
} from '@ngneat/effects';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Credentials, OAuthResponse } from '@impetus/api-interfaces';
import { map, tap } from 'rxjs';
import { orion } from './keyrock.pep';
import { getRegistry } from '@ngneat/elf';
import { persistState, localStorageStrategy } from '@ngneat/elf-persist-state';

export interface User {
  access_token: string;
  refresh_token: string;
  expires_in: Date;
}

const { state, config } = createState(
  withProps<User>({
    access_token: '',
    refresh_token: '',
    expires_in: new Date('01-01-1970'),
  })
);

const store = new Store({ state, name: 'user', config });

export const persist = persistState(store, {
  key: 'user',
  storage: localStorageStrategy,
});

@Injectable({ providedIn: 'root' })
export class UserRepository {
  isAuthenticated$ = store.pipe(
    select((state) => new Date() < new Date(state.expires_in))
  );
  access_token$ = store.pipe(select((state) => state.access_token));

  updateUser(user: User) {
    store.update((state) => ({ ...state, ...user }));
  }
}

@Injectable({ providedIn: 'root' })
export class UserEffects {
  constructor(private user: UserRepository, private http: HttpClient) {}

  loginAction = createAction(
    '[Impetus] User Login',
    props<{ user: Credentials }>()
  );

  logoutAction = createAction('[Impetus] User Logout');

  userActions = actionsFactory('Impetus');

  logoutActionEffect$ = createEffect((actions$) =>
    actions$.pipe(
      ofType(this.logoutAction),
      tap(() => getRegistry().forEach((store) => store.reset()))
    )
  );

  loginActionEffect$ = createEffect((actions$) =>
    actions$.pipe(
      ofType(this.loginAction),
      map((payload) =>
        new HttpParams()
          .set('username', payload.user.email)
          .set('password', payload.user.password)
          .set('grant_type', 'password')
      ),
      map((httpParams) =>
        this.http.post<OAuthResponse>(
          'https://ntuadt-idm.ddns.net/oauth2/token',
          httpParams,
          {
            headers: new HttpHeaders({ Authorization: orion }),
          }
        )
      ),
      tap((response) =>
        response.subscribe((res) => {
          const data = {
            access_token: res.access_token,
            refresh_token: res.refresh_token,
            expires_in: new Date(new Date().getTime() + res.expires_in * 1000),
          };
          this.user.updateUser(data);
        })
      )
    )
  );
}
