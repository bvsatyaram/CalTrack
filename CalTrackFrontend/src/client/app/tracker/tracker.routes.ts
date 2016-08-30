import {AuthGuard} from "../shared/services/auth-guard.service";
import { Route } from '@angular/router';
import { TrackerComponent } from './index';

export const TrackerRoutes: Route[] = [
  {
    path: '',
    component: TrackerComponent,
    canActivate: [AuthGuard]
  }
];
