import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {filter, map, take} from 'rxjs/operators';
import { IMovie } from '../models/movie-models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesHttpService {
 // private _url :string ="/assets/top250movies.json"
  constructor(private http: HttpClient) { }

  getTop100Movies(): Observable<IMovie[]> {
    // TODO:
    // There are 250 movies in the dataset (top250movies.json)
    // This method should return an Observable that emits the first 100 movies (indexes from 1 to 100)
    return this.http.get<IMovie[]>('/assets/top250movies.json').pipe(map(data => data.filter(value => value.index <= 100)));
  }
}
