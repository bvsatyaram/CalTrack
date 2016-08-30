import { User } from '../shared/models/user';
import { AuthenticationService, CurrentUserService } from '../shared/index';
import {Router} from '@angular/router';
import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'ca-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent {

  private user: User;
  constructor(
    private loginService: AuthenticationService,
    private currentUserService: CurrentUserService,
    private router: Router) {
      this.user= {email:''};
     }

  login(user: User) {

    this.loginService.loginUser(user)
    .subscribe( authenticatedUser => {
      this.currentUserService.setCurrentUser({email: authenticatedUser.user.email});
      if(this.currentUserService.redirectUrl && this.currentUserService.redirectUrl.trim() !== '') {
        this.router.navigate([this.currentUserService.redirectUrl]);
      } else {
        this.router.navigate(['/']);
      }
    });

  }
}
