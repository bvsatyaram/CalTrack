import {CurrentUserService} from "../../shared/services/current-user.service";
import * as moment from "moment";
import {MealsService} from "../services/meals.service";
import { Component, OnInit } from '@angular/core';
import { Meal } from '../models/meal';
import { NKDatetime } from 'ng2-datetime/ng2-datetime';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-day',
  templateUrl: 'day.component.html',
  styleUrls: ['day.component.css'],
  directives: [NKDatetime]
})
export class DayComponent implements OnInit {
  dayString: string = moment().format('YYYY-MM-DD');
  caloriesCount: number = 0;
  caloriesTarget: number;
  meals: Meal[];
  isNewMealFormVisible: boolean = false;
  newMeal: Meal;

  constructor(private currentUserService: CurrentUserService, private mealsSerivce: MealsService) {}

  ngOnInit() {
    this.mealsSerivce.activeDayMealsEmitter.subscribe((meals: Meal[]) => {
      this.meals = meals;
      let totalCalories = 0;
      meals.map((meal) => {
        totalCalories += meal.calories;
      })
      this.caloriesCount = totalCalories;
    })
    this.caloriesTarget = this.currentUserService.getCurrentUser().target_calories;
  }

  areCaloriesExceeded() {
    return this.caloriesCount > this.caloriesTarget
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
    let time = moment(this.mealsSerivce.activeDateString).add(10, 'hours').toDate();
    this.newMeal = {title: '', time: time, calories: undefined};
  }

  showEditMealForm(meal: Meal) {
    this.isNewMealFormVisible = true;
    this.newMeal = Object.assign({}, meal);
    this.newMeal.time = this.newMeal.momentObj.toDate();
  }

  deleteMeal(meal: Meal) {
    this.mealsSerivce.destroyMeal(meal).subscribe(() => {});
  }

  hideNewMealForm() {
    this.isNewMealFormVisible = false;
  }

  addMeal() {
    this.newMeal.time = this.newMeal.time.toISOString();
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
