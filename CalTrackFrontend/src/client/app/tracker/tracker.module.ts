import {TrackerChartComponent} from "./chart/chart.component";
import {SettingsComponent} from "./settings/settings.component";
import {UsersComponent} from "./users/users.component";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrackerComponent } from './tracker.component';
import { DayComponent } from "./day/day.component";
import {MealsService} from "./services/meals.service";


@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [TrackerComponent, DayComponent, UsersComponent, SettingsComponent, TrackerChartComponent],
    exports: [TrackerComponent, DayComponent, UsersComponent, SettingsComponent, TrackerChartComponent],
    providers: [MealsService]
})

export class TrackerModule { }
