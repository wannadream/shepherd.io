import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router,
        private _h: HelperService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        if (!this._h.isLoggedIn) {
            this._router.navigate(['/login']);
            return false;
        }
        return true;
    }
}
