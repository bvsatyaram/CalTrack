import {MealsService} from "./services/meals.service";
import { Component, OnInit } from '@angular/core';
import { Meal } from './models/meal';
/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-tracker',
  templateUrl: 'tracker.component.html',
  styleUrls: ['tracker.component.css']
})

export class TrackerComponent implements OnInit {
  constructor(private mealsApi: MealsService) {}

  ngOnInit() {
     this.mealsApi.getMeals().subscribe((meals: any) => {
       this.mealsApi.mealsEmitter.emit(meals);
     })
  }
}
