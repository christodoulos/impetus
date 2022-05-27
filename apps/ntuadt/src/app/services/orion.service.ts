import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrionService {
  constructor(private http: HttpClient) {}

  async getAllEntities() {
    const token = localStorage.getItem('access_token') ?? '';
    return firstValueFrom(
      this.http.get('https://ntuadt-proxy.ddns.net/v2/entities', {
        headers: new HttpHeaders({ 'X-Auth-Token': token }),
      })
    ).then((lala) => console.log(lala));
  }
}
