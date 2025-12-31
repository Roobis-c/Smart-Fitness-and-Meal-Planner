import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class WorkoutService {
  constructor(private api: ApiService) {}
  getWeeklyWorkout() {
    return this.api.get<any[]>('/workouts');
  }
  updateExerciseStatus(data: {
    day: string;
    name: string;
    completed: boolean;
  }) {
    return this.api.put('/workouts/exercise', data);
  }
  resetWeek() {
    return this.api.put('/workouts/reset-week', {});
  }
}
