import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule ,RouterLink} from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MealService } from '../../service/meal.service';

@Component({
  selector: 'app-meal',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule,RouterLink],
  templateUrl: './meal-planner.component.html',
  styleUrl: './meal-planner.component.css'
})
export class MealPlannerComponent implements OnInit {
  mealPlan: any[] = [];
  selectedDay!: string;
  currentDay: any;
  target:string='';
  constructor(private mealService: MealService) {}
selectDay(day: string) {
  this.selectedDay = day;
  this.setCurrentDay();
}
  ngOnInit() {
    this.mealService.getMeals().subscribe(data => {
      this.mealPlan = data;
      console.log(data);
      this.selectedDay = data[0]?.day;
      this.setCurrentDay();

    });
  }
  setCurrentDay() {
    this.currentDay = this.mealPlan.find(
      d => d.day === this.selectedDay
     
    );    
  }
  toggleMeal(day: string, meal: any) {
    meal.completed = !meal.completed;

    this.mealService.updateMealStatus({
      day,
      type: meal.type,
      completed: meal.completed
    }).subscribe();
  }
 resetWeek() {
  this.mealService.resetWeek().subscribe(() => {
    this.mealPlan.forEach(day => {
      day.meals.meals.forEach((m: any) => (m.completed = false));
      day.meal_completed = 0;
    });
  });
}

  }
