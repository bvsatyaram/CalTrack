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
  selector: 'sd-tracker-chart',
  templateUrl: 'chart.component.html',
  styleUrls: ['chart.component.css'],
  directives: [NKDatetime]
})
export class TrackerChartComponent implements OnInit {
  caloriesTarget: number;
  chartData: any;

  constructor(private currentUserService: CurrentUserService, private mealsSerivce: MealsService) {}

  ngOnInit() {
    this.mealsSerivce.mealsEmitter.subscribe((meals: Meal[]) => {
      let currentMoment = moment();
      let chartData = {};
      for (let i = 0; i < 10; i++) {
        chartData[currentMoment.subtract(i, 'days').format('YYYY-MM-DD')] = 0;
      }
      for (let meal of meals) {
        if (chartData[meal.dateString] !== undefined) {
          chartData[meal.dateString] += meal.calories;
        }
      }

      this.chartData = chartData;
    })
    this.caloriesTarget = this.currentUserService.getCurrentUser().target_calories;
  }
}
