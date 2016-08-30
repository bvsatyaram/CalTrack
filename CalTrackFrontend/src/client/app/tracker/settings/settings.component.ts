import {User} from "../../shared/models/user";
import {CurrentUserService} from "../../shared/services/current-user.service";
import { Component, OnInit, Inject } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {AuthHttpService} from "../../shared/services/authHttp.service";
import {Router} from '@angular/router';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.css']
})
export class SettingsComponent implements OnInit {
  user: User;

  constructor(private currentUserService: CurrentUserService,
    private http: AuthHttpService,
    private router: Router,
    @Inject('config') private config:any) {}

  ngOnInit() {
    this.user = this.currentUserService.getCurrentUser();
  }

  submitSettings() {
    let updateSettingsUrl = `${this.config.dev.apiBaseUrl}/users/${this.user.id}`;
    let body = JSON.stringify({
      data: {
        attributes: {
          target_calories: this.user.target_calories
        }
      }
    });
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.patch(updateSettingsUrl, body, options)
    .map((res: Response) => {
      let data = res.json().data;
      return {success: true};
    }).subscribe(() => {
      this.currentUserService.setCurrentUser(this.user);
      this.router.navigate(['/'])
    })
  }
}
