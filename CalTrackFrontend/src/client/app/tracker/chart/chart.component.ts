import {CurrentUserService} from "../../shared/services/current-user.service";
import * as moment from "moment";
import {MealsService} from "../services/meals.service";
import { Component, OnInit } from '@angular/core';
import { Meal } from '../models/meal';
import { NKDatetime } from 'ng2-datetime/ng2-datetime';
declare var Chartist: any;

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
    this.caloriesTarget = this.currentUserService.getCurrentUser().target_calories;
    this.mealsSerivce.mealsEmitter.subscribe((meals: Meal[]) => {
      let currentMoment = moment().add(1, 'days');
      let chartData = {};
      for (let i = 0; i < 10; i++) {
        chartData[currentMoment.subtract(1, 'days').format('YYYY-MM-DD')] = 0;
      }
      for (let meal of meals) {
        if (chartData[meal.dateString] !== undefined) {
          chartData[meal.dateString] += meal.calories;
        }
      }

      this.chartData = chartData;
      this.drawChart()
    });

  }

  drawChart() {
    let keys = Object.keys(this.chartData).reverse();
    let values: any[] = [];
    let targetValues: any[] = []
    for (let key of keys) {
      values.push(this.chartData[key]);
      targetValues.push(this.caloriesTarget);
    }

    new Chartist.Line('#cal-chart', {
      labels: keys,
      series: [
        values,
        targetValues
      ]
    }, {
      fullWidth: true,
      chartPadding: {
        right: 40
      },
      low: 0
    });
  };
}
