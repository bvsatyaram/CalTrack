import {AuthenticationService} from '../services/authentication.service';
import {CurrentUserService} from '../services/current-user.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
// import { AuthenticationService, CurrentUserService } from '../index';
import { Component, OnInit } from '@angular/core';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css']
})

export class ToolbarComponent implements OnInit {
  isLoggedIn: boolean;
  currentUser: User;

  constructor(
    private currentUserService: CurrentUserService,
    private authenticationService: AuthenticationService,
    private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = this.authenticationService.isLoggedIn;
    this.authenticationService.isLoggedInEmitter.subscribe((newLoginStatus: boolean) => {
      this.isLoggedIn = newLoginStatus;
    });
    this.currentUser = this.currentUserService.currentUser;
    this.currentUserService.currentUserEmitter.subscribe((newUser: User) => {
      this.currentUser = newUser;
    });
  }

  signOutUser() {
    this.authenticationService.signoutUser()
    .subscribe(() => {
      this.currentUserService.removeCurrentUser();
      this.router.navigate(['/login']);
    });
  }

}
