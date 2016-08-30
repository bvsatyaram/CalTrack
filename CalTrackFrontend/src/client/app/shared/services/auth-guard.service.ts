import {AuthenticationService} from './authentication.service';
import {CurrentUserService} from './current-user.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private currentUserService: CurrentUserService,
    private authenticationService: AuthenticationService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(state.url.startsWith('/users')) {
      if(this.currentUserService.getCurrentUser() && this.currentUserService.getCurrentUser().admin) return true;
      this.router.navigate(['/']);
      return false;
    }
    if(this.authenticationService.isLoggedIn) {return true;};
    this.currentUserService.redirectUrl = state.url;
    this.router.navigate(['/login']);
    return false;

  }

}
