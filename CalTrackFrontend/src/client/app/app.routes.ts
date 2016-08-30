import { Routes } from '@angular/router';

import {TrackerRoutes} from "./tracker/index";
import { AuthenticateRoutes } from './login/index';

export const routes: Routes = [
  ...TrackerRoutes,
  ...AuthenticateRoutes
];
