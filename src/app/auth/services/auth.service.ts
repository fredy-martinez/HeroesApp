import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'enviroments/environment';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {

    private baseUrl = environments.baseUrl;
    private user?: User;

    constructor(private http: HttpClient) { }


    //Exponer usuario para que se pueda usar el usuario en otros componentes
    get currentUser(): User | undefined{
        if( !this.user ) return undefined;

        return structuredClone (this.user); // Se podría usar el spread  ...this.user
    }

    // Inicia sesión
    login( email: string, password: string): Observable<User>{

         return this.http.get<User>(`${this.baseUrl}/users/1`)
        .pipe(
            // establecer usuario en propiedad de la clase
            tap( user =>{ this.user = user; }),

            //Grabación en el local storage
            tap( user => localStorage.setItem('token', 'bsajfdjf.dcfskhfusd.dsfds' )) //Puedo ponerle lo que quiera ese es el nombre del token
        );
    }

    //Mantener la sesión abierta al recargar el navegador
    checkAuth(): Observable<boolean> {
        if( !localStorage.getItem('token') ) return of (false)

        const token = localStorage.getItem('token');

        return this.http.get<User>(`${this.baseUrl}/users/1`)
            .pipe(
                tap( user => this.user = user), //Establece valor de usuario
                map (user => !!user), //doble negación
                catchError(err => of(false))
            )
    }

    // Cierra sesión y borra el token del local storage
    logOut(){
        this.user = undefined;
        localStorage.clear();
    }
    
}