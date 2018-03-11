import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Actor } from '../interfaces/Actor';

@Injectable()
export class ActorService {
  URL = 'api/v1/actors';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.URL);
  }

  get(id: string): Observable<any> {
    return this.http.get(this.URL + '/' + id);
  }

  add(actor: Actor): Observable<any> {
    return this.http.post(this.URL, actor);
  }
}
