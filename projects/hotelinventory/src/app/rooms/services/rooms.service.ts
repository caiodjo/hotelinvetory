import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { AppConfig } from '../../AppConfig/appconfig.interface';
import { APP_SERVICE_CONFIG } from '../../AppConfig/appconfig.service';
import { Photos } from '../../photos';
import { Rooms } from '../rooms';

@Injectable({
  providedIn: 'root',
})
export class RoomsService {
  // headers = new HttpHeaders({ token: '1234asuidhq123' });

  getRooms$ = this.http.get<Rooms[]>('/roomsList').pipe(shareReplay(1));

  //static service
  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient
  ) {
    console.log(this.config.apiEndpoint);
  }

  getRooms() {
    const headers = new HttpHeaders({ token: '1234asuidhq123' });
    return this.http.get<Rooms[]>('/roomsList', { headers: headers });
  }

  addRooms(room: Rooms) {
    return this.http.post<Rooms>('/roomsList', room);
  }

  putRooms(room: Rooms) {
    return this.http.put<Rooms>(`/roomsList/${room.id}`, {
      ...room,
      price: 500,
    });
  }

  deleteRooms(room: Rooms) {
    console.log(room);
    return this.http.delete<Rooms>(`/roomsList/${room.id}`);
  }

  getPhotos() {
    const request = new HttpRequest(
      'GET',
      `https://jsonplaceholder.typicode.com/photos`,
      {
        reportProgress: true,
      }
    );
    return this.http.request<Photos>(request);
  }
}
