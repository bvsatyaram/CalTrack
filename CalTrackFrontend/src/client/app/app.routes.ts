import { Routes } from '@angular/router';

import { AboutRoutes } from './+about/index';
import { HomeRoutes } from './+home/index';
import {TrackerRoutes} from "./tracker/index";

export const routes: Routes = [
  ...HomeRoutes,
  ...AboutRoutes,
  ...TrackerRoutes
];
