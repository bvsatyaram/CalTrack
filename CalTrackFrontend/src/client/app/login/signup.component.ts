import {User} from '../shared/models/user';
import { AuthenticationService, CurrentUserService } from '../shared/index';
import {Router} from '@angular/router';
import { Component } from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'ca-signup',
  templateUrl: 'signup.component.html'
})

export class SignupComponent {

  private user:User;

  constructor(
    private signupService: AuthenticationService,
    private currentUserService: CurrentUserService,
    private router: Router) {
      this.user = {email:''};
     }


  signup(user: User) {

    if (user.password !== user.password_confirmation) {
      alert('Password and password confirmation do not match');
      return;
    }

    this.signupService.signupUser(user)
    .subscribe( (authenticatedUser:User) => {
      this.currentUserService.setCurrentUser({id: authenticatedUser.id, email: authenticatedUser.email, admin: authenticatedUser.admin, manager: authenticatedUser.manager, target_calories: authenticatedUser.target_calories});
      this.router.navigate(['/']);
    });

  }
}
