import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Hero } from './hero';

@Injectable()
export class HeroService {
  private heroesUrl = 'app/heroes'; // URL to web api

  constructor(private http: HttpClient) {}

  getHeroes() {
    return this.http
      .get<Hero[]>(this.heroesUrl)
      .pipe(map(data => data), catchError(this.handleError));
  }

  getActiveHeroes() {
   return this.getHeroes().pipe(
   map(data => data.filter(hero => {
     console.log(hero.state === 'active')
     return hero.state === 'active';
   })));
    
  }

  getHero(id: number): Observable<Hero> {
    return this.getHeroes().pipe(
      map(heroes => {
        return heroes.find(hero => {
         
          return hero.id == id;
        }); 
      })
    );
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
