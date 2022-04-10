import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@impetus/api-interfaces';

@Component({
  selector: 'impetus-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}

  onMapLoad($event: any) {
    console.log('MapLoad event:', $event);
  }
}
