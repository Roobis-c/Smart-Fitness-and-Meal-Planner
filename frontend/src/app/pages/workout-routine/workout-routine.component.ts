import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { WorkoutService } from '../../service/workout.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-workout',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule,RouterLink],
  templateUrl: './workout-routine.component.html',
  styleUrl: './workout-routine.component.css'
})
export class WorkoutRoutineComponent implements OnInit {

  workoutPlan: any[] = [];

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.loadWorkouts();
  }
  loadWorkouts() {
    this.workoutService.getWeeklyWorkout()
      .subscribe(data => this.workoutPlan = data as any[]);
  }
  updateExercise(day: string, ex: any, completed: boolean) {
    this.workoutService.updateExerciseStatus({
      day,
      name: ex.name,
      completed
    }).subscribe(() => {
      ex.completed = completed;
    });
  }
 isDayCompleted(day: any): boolean {
  if (!day.exercises || !day.exercises.length) return false;

  return day.exercises.every((ex: any) => ex.completed === true);
}
  resetWeek() {
    this.workoutService.resetWeek()
      .subscribe(() => this.loadWorkouts());
  }
}
