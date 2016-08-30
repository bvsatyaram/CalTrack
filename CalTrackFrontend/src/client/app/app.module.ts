import {CONFIG} from "./config";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routes } from './app.routes';

import {TrackerModule} from "./tracker/tracker.module";
import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';

@NgModule({
  imports: [BrowserModule, HttpModule, RouterModule.forRoot(routes), TrackerModule, SharedModule.forRoot(), LoginModule],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }, {
    provide: 'config',
    useValue: CONFIG
  }],
  bootstrap: [AppComponent]

})

export class AppModule { }
