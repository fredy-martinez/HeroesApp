import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, UrlSegment, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard  implements CanMatch, CanActivate {

    constructor( 
        private authService: AuthService,
    ) { }

    private checkAuthStatus() : boolean  | Observable<boolean>{

        return this.authService.checkAuth()
        .pipe()
    }

    canMatch(route: Route, segments: UrlSegment[]): boolean  | Observable<boolean> {
        // console.log('Can Match');
        // console.log({route, segments});
        return this.checkAuthStatus();



    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        // console.log('Can Activate');
        // console.log({route, state});
        return this.checkAuthStatus();



    }
    
}