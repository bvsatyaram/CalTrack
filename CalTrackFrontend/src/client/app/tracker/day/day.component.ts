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
  isNewMealFormVisible: boolean = false;
  newMeal: Meal;

  constructor(private mealsSerivce: MealsService) {}

  ngOnInit() {
    this.mealsSerivce.activeDayMealsEmitter.subscribe((meals: Meal[]) => {
      this.meals = meals;
      let totalCalories = 0;
      meals.map((meal) => {
        totalCalories += meal.calories;
      })
      this.caloriesCount = totalCalories;
    })
  }

  getPreviousDaysMeals() {
    this.dayString = moment(this.dayString).subtract(1, 'day').format('YYYY-MM-DD');
    this.mealsSerivce.setAciveDate(this.dayString);
  }

  getNextDaysMeals() {
    this.dayString = moment(this.dayString).add(1, 'day').format('YYYY-MM-DD');
    this.mealsSerivce.setAciveDate(this.dayString);
  }

  showNewMealForm() {
    this.isNewMealFormVisible = true;
    this.newMeal = {title: '', time: '', calories: undefined};
  }

  showEditMealForm(meal: Meal) {
    this.isNewMealFormVisible = true;
    this.newMeal = Object.assign({}, meal);
  }

  deleteMeal(meal: Meal) {
    this.mealsSerivce.destroyMeal(meal).subscribe(() => {});
  }

  hideNewMealForm() {
    this.isNewMealFormVisible = false;
  }

  addMeal() {
    if (this.newMeal.id) {
      this.mealsSerivce.updateMeal(this.newMeal).subscribe(() => {
        this.hideNewMealForm();
      });
    } else {
      this.mealsSerivce.createMeal(this.newMeal).subscribe(() => {
        this.hideNewMealForm();
      });
    }
  }
}
