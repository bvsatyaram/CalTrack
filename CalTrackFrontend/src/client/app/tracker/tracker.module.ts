import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackerComponent } from './tracker.component';
import { DayComponent } from "./day/day.component";
import {MealsService} from "./services/meals.service";


@NgModule({
    imports: [CommonModule],
    declarations: [TrackerComponent, DayComponent],
    exports: [TrackerComponent, DayComponent],
    providers: [MealsService]
})

export class TrackerModule { }
