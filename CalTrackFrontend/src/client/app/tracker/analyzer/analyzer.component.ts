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
  selector: 'sd-cal-analyzer',
  templateUrl: 'analyzer.component.html',
  styleUrls: ['analyzer.component.css'],
  directives: [NKDatetime]
})
export class CalAnalyzerComponent implements OnInit {
  fromDate: Date;
  toDate: Date;
  fromTime: Date;
  toTime: Date;
  meals: Meal[];
  averageCals: number = 0;
  isAverageVisible: boolean = false;

  constructor(private mealsSerivce: MealsService) {}

  ngOnInit() {
    this.fromDate = moment().subtract(7, 'days').startOf("day").toDate();
    this.toDate = moment().endOf("day").toDate();
    this.fromTime = moment().startOf("day").add(10, 'hours').toDate();
    this.toTime = moment().startOf("day").add(14, 'hours').toDate();
    // this.caloriesTarget = this.currentUserService.getCurrentUser().target_calories;
    this.mealsSerivce.mealsEmitter.subscribe((meals: Meal[]) => {
      this.meals = meals;
    });

  }

  analyzeCalories() {
    let secondsFromBeginningOfDayStart = this.secondsFromBeginningOfDay(moment(this.fromTime));
    let secondsFromBeginningOfDayEnd = this.secondsFromBeginningOfDay(moment(this.toTime));
    let filteredMeals = this.meals.filter((meal) => {
      let secondsFromBeginningOfDay = meal.momentObj.diff(meal.momentObj.startOf("day"), "seconds");
      return (meal.momentObj.isSameOrAfter(this.fromDate) &&
              meal.momentObj.isSameOrBefore(this.toDate) &&
              (secondsFromBeginningOfDay >= secondsFromBeginningOfDayStart) &&
              (secondsFromBeginningOfDay <= secondsFromBeginningOfDayEnd))

    });

    let averageCals = 0;
    for(let meal of filteredMeals) {
      averageCals += meal.calories;
    }

    averageCals /= filteredMeals.length;

    this.averageCals = Math.floor(averageCals);
    this.isAverageVisible = true;
  }

  secondsFromBeginningOfDay(momentObj: any): number {
    return momentObj.diff(momentObj.startOf('day'), 'seconds');
  }
}
