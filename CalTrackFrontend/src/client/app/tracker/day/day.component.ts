import * as moment from "moment";
import {MealsService} from "../services/meals.service";
import { Component, OnInit } from '@angular/core';
import { Meal } from '../models/meal';

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-day',
  templateUrl: 'day.component.html',
  styleUrls: ['day.component.css']
})
export class DayComponent implements OnInit {
  dayString: string = moment().format('YYYY-MM-DD');
  caloriesCount: number = 3600;
  caloriesTarget: number = 4000;
  meals: Meal[];

  constructor(private mealsSerivce: MealsService) {}

  ngOnInit() {
    this.mealsSerivce.activeDayMealsEmitter.subscribe((meals: Meal[]) => {
      this.meals = meals;
    })
  }
}
