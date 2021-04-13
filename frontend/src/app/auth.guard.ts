import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service'


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: UserService,
    // tslint:disable-next-line:variable-name
    private _router: Router) { }

  canActivate(): boolean {
    if (this._authService.loggedIn()) {
      console.log('true')
      return true;
    } else {
      console.log('false')
      this._router.navigate([''])
      return false;
    }
  }
  
}
