import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../interfaces/Movie';

@Injectable()
export class MovieService {
  URL = 'api/v1/movies';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.URL);
  }

  get(id: string): Observable<any> {
    return this.http.get(this.URL + '/' + id);
  }

  add(movie: Movie): Observable<any> {
    return this.http.post(this.URL, movie);
  }

  update(movie: Movie): Observable<any> {
    return this.http.put(this.URL + '/' + movie._id, movie);
  }

  delete(id: String): Observable<any> {
    return this.http.delete(this.URL + '/' + id);
  }
}
