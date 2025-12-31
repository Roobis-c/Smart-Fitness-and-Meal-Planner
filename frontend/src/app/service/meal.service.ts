import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class MealService {

  constructor(private api: ApiService) {}

  getMeals() {
    return this.api.get<any[]>('/meals');
  }

  updateMealStatus(data: {
    day: string;
    type: string;
    completed: boolean;
  }) {
    return this.api.put('/meals/meal', data);
  }
  resetWeek() {
    return this.api.put('/meals/reset-week', {});
  }
}
