import {User} from "../../shared/models/user";
import {CurrentUserService} from "../../shared/services/current-user.service";
import {UsersService} from "../services/users.service";
import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-users',
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.css']
})

export class UsersComponent implements OnInit {
  users: User[];
  activeUser: User;
  currentUser: User;

  constructor(private currentUserService: CurrentUserService, private usersService: UsersService) {}

  ngOnInit() {
    this.usersService.usersEmitter.subscribe((users: User[]) => {
      this.users = users;
    });
    this.usersService.getUsers().subscribe((users: any) => {
      this.usersService.usersEmitter.emit(users);
    });
    this.currentUser = this.currentUserService.getCurrentUser();
  }

  ngAfterContentChecked() {
    // jQuery("[name='admin']").bootstrapSwitch();
    // jQuery("[name='manager']").bootstrapSwitch();
  }

  showEditUserForm(user: User) {
    this.activeUser = Object.assign({}, user);
  }

  hideEditUserForm() {
    this.activeUser = null;
  }

  deleteUser(user: User) {
    this.usersService.destroyUser(user).subscribe(() => {});
  }

  updateUser() {
    this.usersService.updateUser(this.activeUser).subscribe(() => {
      this.hideEditUserForm();
    });
  }

  canEditUser() {
    return this.isAdmin() || this.currentUser.manager;
  }

  canDeleteUser():boolean {
    return this.isAdmin();
  }

  canChangeUserRole(): boolean {
    return this.isAdmin() && this.activeUser.id !== this.currentUser.id;
  }

  isAdmin(): boolean {
    return this.currentUser.admin;
  }
}
