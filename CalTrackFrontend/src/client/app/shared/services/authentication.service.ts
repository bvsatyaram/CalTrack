import {User} from '../models/user';
import {AuthHttpService} from './authHttp.service';
import { Response, Headers, RequestOptions } from '@angular/http';
import { Injectable, EventEmitter, Inject } from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class AuthenticationService {
  public isLoggedIn: boolean;
  public isLoggedInEmitter = new EventEmitter<boolean>();

  private signupUrl:string = `${this.config.dev.apiBaseUrl}/auth`;
  private signoutUrl:string = `${this.config.dev.apiBaseUrl}/auth/sign_out`;
  private loginUrl:string = `${this.config.dev.apiBaseUrl}/auth/sign_in`;

  constructor (private authHttp: AuthHttpService, @Inject('config') private config:any) {
    let authHeaders = JSON.parse(localStorage.getItem('authStoredHeaders'));
    this.isLoggedInEmitter.subscribe((updateLogInStatus: boolean) => {
      this.isLoggedIn = updateLogInStatus;
    });
    if (!authHeaders || !authHeaders['access-token']) {
      this.isLoggedInEmitter.emit(false);
    } else {
      this.isLoggedInEmitter.emit(true);
    }
  };

  signupUser(user: User) : Observable<any> {
    let bodyString = JSON.stringify(user); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.authHttp.post(this.signupUrl, bodyString, options) // ...using post request
    .map((res:Response) => {
      let user = res.json().data;
      let authHeaders = res.headers;
      this.isLoggedInEmitter.emit(true);
      return {user, authHeaders};
    }) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  loginUser(user: User) : Observable<any> {
    let bodyString = JSON.stringify(user); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Create a request option

    return this.authHttp.post(this.loginUrl, bodyString, options) // ...using post request
    .map((res:Response) => {
      let user = res.json().data;
      let authHeaders = res.headers;
      this.isLoggedInEmitter.emit(true);
      return {user, authHeaders};
    }) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }

  signoutUser() : Observable<any> {

    return this.authHttp.delete(this.signoutUrl) // ...using post request
    .map((res:Response) => {
      this.isLoggedInEmitter.emit(false);
      localStorage.removeItem('authStoredHeaders');
      localStorage.removeItem('currentUser');
      return res.json();
    }) // ...and calling .json() on the response to return data
    .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  }
}
