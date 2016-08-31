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

  constructor(private mealsSerivce: MealsService) {}

  ngOnInit() {
    this.fromDate = moment().subtract(7, 'days').startOf("day").toDate();
    this.toDate = moment().endOf("day").toDate();
    this.fromTime = moment().startOf("day").add(10, 'hours').toDate();
    this.toTime = moment().startOf("day").add(14, 'hours').toDate();
    // this.caloriesTarget = this.currentUserService.getCurrentUser().target_calories;
    this.mealsSerivce.mealsEmitter.subscribe((meals: Meal[]) => {
      this.meals = meals;
      this.analyzeCalories();
    });
  }

  analyzeCalories() {
    let secondsStart = this.secondsFromBeginningOfDay(this.fromTime.toISOString());
    let secondsEnd = this.secondsFromBeginningOfDay(this.toTime.toISOString());
    let filteredMeals = this.meals.filter((meal) => {
      let seconds = this.secondsFromBeginningOfDay(meal.momentObj.toDate().toISOString());
      return (meal.momentObj.isSameOrAfter(this.fromDate.toISOString()) &&
              meal.momentObj.isSameOrBefore(this.toDate.toISOString()) &&
              (seconds >= secondsStart) &&
              (seconds <= secondsEnd))

    });

    let averageCals = 0;
    for(let meal of filteredMeals) {
      averageCals += meal.calories;
    }

    if (filteredMeals.length > 0) {
      averageCals /= filteredMeals.length;
    }

    this.averageCals = Math.floor(averageCals);
  }

  secondsFromBeginningOfDay(time: string): number {
    let momentObj = moment(time);
    let momentAtStart = moment(time).startOf('day');
    return momentObj.diff(momentAtStart, 'seconds');
  }
}
