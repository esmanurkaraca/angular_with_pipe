import { Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, of, Subscription } from 'rxjs';
import {debounceTime, filter, map, mergeMap, startWith, tap, toArray} from 'rxjs/operators';
import { IMovie } from '../../models/movie-models';
import { MoviesHttpService } from '../../services/movies-http.service';

@Component({
  selector: 'app-movies-table-container',
  templateUrl: './movies-table-container.component.html',
  styleUrls: ['./movies-table-container.component.scss']
})
export class MoviesTableContainerComponent implements OnInit, OnDestroy {
  search = new FormControl('');
  movies: IMovie[];
  subscriptions: Subscription = new Subscription();
  filterText=""

  constructor(private moviesHttpService: MoviesHttpService) { }

  ngOnInit(): void {
    this.moviesHttpService.getTop100Movies().subscribe(data => this.movies = data);
    this.search.valueChanges.subscribe(arama => {
      this.subscriptions.add(this.moviesHttpService.getTop100Movies().pipe(mergeMap(data => data), filter(data => {
        return data.name.includes(arama);
      }), toArray()).subscribe(data => this.movies = data));
    });
  
  }
 
   
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
