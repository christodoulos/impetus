import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Credentials, FiSdmWeatherObserved } from '@impetus/api-interfaces';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  getSubjectToken(data: Credentials) {
    const credentials = { name: data.email, password: data.password };
    // Backend should expose the X-Subject-Token header!
    return this.http.post(
      'https://ntuadt-idm.ddns.net/v1/auth/tokens',
      credentials,
      {
        observe: 'response',
      }
    );
  }

  getAuthorizedApplications(subjectToken: string) {
    return this.http.get('https://ntuadt-idm.ddns.net/v1/applications', {
      headers: new HttpHeaders({ 'X-Auth-Token': subjectToken }),
    });
  }

  getJWTToken(data: Credentials) {
    const payload = new HttpParams()
      .set('username', data.email)
      .set('password', data.password)
      .set('grant_type', 'password');
    return this.http.post('https://ntuadt-idm.ddns.net/oauth2/token', payload, {
      headers: new HttpHeaders({
        Authorization:
          'Basic OWE1NTZjNWUtNDA4OC00NDIwLWJkZDUtNjRkYzZkY2ZmMjUyOmVjYjdiMzc5LWU3NTktNGM3Ny1iNmQwLTczYmFjZGE5ZjIxMw==',
      }),
    });
  }

  isAuthenticated() {
    const access_token = localStorage.getItem('access_token');
    const expires_in = localStorage.getItem('expires_in');
    if (access_token && expires_in) {
      return new Date() < new Date(expires_in);
    } else {
      return false;
    }
  }

  getAllEntities() {
    const token = localStorage.getItem('access_token') ?? '';
    return this.http.get<Array<FiSdmWeatherObserved>>(
      'https://ntuadt-proxy.ddns.net/v2/entities',
      {
        headers: new HttpHeaders({ 'X-Auth-Token': token }),
      }
    );
  }
}
