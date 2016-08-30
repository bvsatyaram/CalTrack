import {AuthHttpService} from "../../shared/services/authHttp.service";
import { Injectable, Inject, EventEmitter } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from "@angular/http";
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

  constructor(private http: AuthHttpService, @Inject('config') private config:any) {
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
        return this.mealObjForDisplay(obj);
      })
    })
  }

  mealObjForDisplay(meal: any): Meal {
    let momentObj = moment(meal.attributes.time);

    return {
      id: meal.id,
      title: meal.attributes.title,
      momentObj: momentObj,
      calories: meal.attributes.calories,
      dateString: momentObj.format('YYYY-MM-DD')
    }
  }

  createMeal(meal: Meal): Observable<any> {
    let createMealUrl = `${this.config.dev.apiBaseUrl}/meals`;
    let body = JSON.stringify({
      data: {
        attributes: meal
      }
    });
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(createMealUrl, body, options)
    .map((res: Response) => {
      let data = res.json().data;
      let createdMeal = this.mealObjForDisplay(data);
      this.mealsEmitter.emit(this.meals.concat(createdMeal));
      return {success: true};
    })
  }

  updateMeal(meal: Meal): Observable<any> {
    let updateMealUrl = `${this.config.dev.apiBaseUrl}/meals/${meal.id}`;
    let body = JSON.stringify({
      data: {
        attributes: meal
      }
    });
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.patch(updateMealUrl, body, options)
    .map((res: Response) => {
      let data = res.json().data;
      let updatedMeal = this.mealObjForDisplay(data);
      this.mealsEmitter.emit(this.meals.map((oldMeal) => {
        return (oldMeal.id == updatedMeal.id) ? updatedMeal : oldMeal;
      }));
      return {success: true};
    })
  }

  destroyMeal(meal: Meal): Observable<any> {
    let destroyMealUrl = `${this.config.dev.apiBaseUrl}/meals/${meal.id}`;

    return this.http.delete(destroyMealUrl, meal)
    .map((res: Response) => {
      this.mealsEmitter.emit(this.meals.filter(oldMeal => {
        return oldMeal.id != meal.id;
      }))
      return {success: true}
    })
  }

  getMealsByDate(): void {
    let filteredMeals = this.meals.filter(meal => {
      return meal.dateString === this.activeDateString;
    });

    this.activeDayMealsEmitter.emit(filteredMeals);
  }

  setAciveDate(dateString: string): void {
    this.activeDateString = dateString;
    this.getMealsByDate();
  }
}
