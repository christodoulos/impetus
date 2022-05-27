import { Store, createState, withProps, select } from '@ngneat/elf';
import { createStore } from '@ngneat/elf';
import {
  selectAllEntities,
  setEntities,
  withEntities,
} from '@ngneat/elf-entities';
import {
  actionsFactory,
  createAction,
  createEffect,
  ofType,
  props,
} from '@ngneat/effects';
import { Injectable } from '@angular/core';
import { FiSdmWeatherObserved } from '@impetus/api-interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs';

const orionStore = createStore(
  { name: 'orion' },
  withEntities<FiSdmWeatherObserved>()
);

@Injectable({ providedIn: 'root' })
export class OrionRepository {
  entities$ = orionStore.pipe(selectAllEntities());
  update(entities: Array<FiSdmWeatherObserved>) {
    orionStore.update(setEntities(entities));
  }
}

@Injectable({ providedIn: 'root' })
export class OrionEffects {
  constructor(private orion: OrionRepository, private http: HttpClient) {}

  getAllEntitiesAction = createAction(
    '[Impetus] Get all Orion Entities',
    props<{ token: string }>()
  );

  orionActions = actionsFactory('Impetus Orion');

  getAllEntitiesActionEffect$ = createEffect((actions$) =>
    actions$.pipe(
      ofType(this.getAllEntitiesAction),
      map((payload) =>
        this.http.get<Array<FiSdmWeatherObserved>>(
          'https://ntuadt-proxy.ddns.net/v2/entities',
          {
            headers: new HttpHeaders({ 'X-Auth-Token': payload.token }),
          }
        )
      ),
      tap((response) =>
        response.subscribe((res) => {
          this.orion.update(res);
        })
      )
    )
  );
}
