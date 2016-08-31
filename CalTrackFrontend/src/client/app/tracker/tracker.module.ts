import {UsersService} from "./services/users.service";
import {CalAnalyzerComponent} from "./analyzer/analyzer.component";
import {TrackerChartComponent} from "./chart/chart.component";
import {SettingsComponent} from "./settings/settings.component";
import {UsersComponent} from "./users/users.component";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrackerComponent } from './tracker.component';
import { DayComponent } from "./day/day.component";
import {MealsService} from "./services/meals.service";
import {UiSwitchModule} from 'angular2-ui-switch';

@NgModule({
    imports: [CommonModule, FormsModule, UiSwitchModule],
    declarations: [TrackerComponent, DayComponent, UsersComponent, SettingsComponent, TrackerChartComponent, CalAnalyzerComponent],
    exports: [TrackerComponent, DayComponent, UsersComponent, SettingsComponent, TrackerChartComponent, CalAnalyzerComponent],
    providers: [MealsService, UsersService]
})

export class TrackerModule { }
