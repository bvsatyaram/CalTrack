import { Injectable, Inject, EventEmitter } from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import * as moment from "moment";
import { Meal } from '../models/meal';

@Injectable()
export class MealsService {
  meals: Meal[];
  activeDayMeals: Meal[];
  mealsEmitter = new EventEmitter<Meal[]>();
  activeDayMealsEmitter = new EventEmitter<Meal[]>();
  activeDateString: string = moment().format('YYYY-MM-DD');

  constructor(private http: Http, @Inject('config') private config:any) {
    this.mealsEmitter.subscribe((meals: Meal[]) => {
      this.meals = meals;
      this.getMealsByDate();
    })
    this.activeDayMealsEmitter.subscribe((meals: Meal[]) => {
      this.activeDayMeals = meals;
    })
  }

  getMeals(): Observable<any> {
    let getMealsUrl = `${this.config.dev.apiBaseUrl}/meals`;

    return this.http.get(getMealsUrl)
    .map((res: Response) => {
      return res.json().data.map((obj: any) => {
        let momentObj = moment(obj.attributes.time);
        return {id: obj.id, title: obj.attributes.title, momentObj: momentObj, calories: obj.attributes.calories, dateString: momentObj.format('YYYY-MM-DD')}
      })
    })
  }

  getMealsByDate(): void {
    let filteredMeals = this.meals.filter(meal => {
      return meal.dateString === this.activeDateString;
    });

    this.activeDayMealsEmitter.emit(filteredMeals);
  }
}
