import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Hero } from '../interfaces/heroe.interface';
import { environments } from 'enviroments/environment';

@Injectable({providedIn: 'root'})


export class HeroesService {


  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }


  getHeroes():Observable<Hero[]>{

    return this.http.get<Hero[]>(`${ this.baseUrl}/heroes`);
  }

  getHeroeById (id: string) : Observable<Hero|undefined>{
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError(error => of (undefined) )
      );
  }

  getSuggestion( query:string ) : Observable<Hero[]>{
    return this.http.get<Hero[]>(`/heroes?=${query}&_limit=6`)
  }
}
