import {User} from "../../shared/models/user";
import {AuthHttpService} from "../../shared/services/authHttp.service";
import { Injectable, Inject, EventEmitter } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class UsersService {
  users: User[];
  usersEmitter = new EventEmitter<User[]>();

  constructor(private http: AuthHttpService, @Inject('config') private config:any) {
    this.usersEmitter.subscribe((users: User[]) => {
      this.users = users;
    })
  }

  getUsers(): Observable<any> {
    let getUsersUrl = `${this.config.dev.apiBaseUrl}/users`;

    return this.http.get(getUsersUrl)
    .map((res: Response) => {
      return res.json().data.map((obj: any) => {
        return this.userObjForDisplay(obj);
      })
    })
  }

  userObjForDisplay(user: any): User {
    return {
      id: user.id,
      email: user.attributes.email,
      admin: user.attributes.admin,
      manager: user.attributes.manager,
      target_calories: user.attributes.target_calories
    }
  }

  updateUser(user: User): Observable<any> {
    let updateUserUrl = `${this.config.dev.apiBaseUrl}/users/${user.id}`;
    let body = JSON.stringify({
      data: {
        attributes: user
      }
    });
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.patch(updateUserUrl, body, options)
    .map((res: Response) => {
      let data = res.json().data;
      let updatedUser = this.userObjForDisplay(data);
      this.usersEmitter.emit(this.users.map((oldUser) => {
        return (oldUser.id == updatedUser.id) ? updatedUser : oldUser;
      }));
      return {success: true};
    })
  }

  destroyUser(user: User): Observable<any> {
    let destroyUserUrl = `${this.config.dev.apiBaseUrl}/users/${user.id}`;

    return this.http.delete(destroyUserUrl, user)
    .map((res: Response) => {
      this.usersEmitter.emit(this.users.filter(oldUser => {
        return oldUser.id != user.id;
      }))
      return {success: true}
    })
  }
}
