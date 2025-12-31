import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { AdminService } from '../../service/admin.service';
import { ChartService } from '../../service/chart.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-user',
  standalone: true,
  imports: [CommonModule, FormsModule,MatIconModule,RouterLink],
  templateUrl: './admin-user.component.html',
  styleUrl: './admin-user.component.css'
})
export class AdminUserComponent implements OnInit {
  user: any = {};
  plans: any[] = [];
  workoutLabels: string[] = [];
  workoutValues: number[] = [];
  targetCalories = 0;
  consumedCalories = 0;
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminService,
    private chartService: ChartService
  ) {}
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.adminService.getUser(id).subscribe({
      next: (res: any) => {
        this.user = res.user || res;

        const rawPlans = res.mealPlan || res.plans || [];

        this.plans = Array.isArray(rawPlans)
          ? rawPlans.map((p: any) => ({
              ...p,
              targetCalories: p.targetCalories ?? p.target_calories ?? 0,
              mealCompleted: p.meal_completed ?? 0,
              exercises: this.parseExercises(p.exercises),
              meals: this.parseMeals(p.meals)
            }))
          : [];

        this.prepareCharts();
      },
      error: () => {
        console.error(' Failed to load user');
      }
    });
  }
saveProfile(): void {
  this.adminService.updateUser(this.user.id, {
    age: this.user.age,
    gender: this.user.gender,
    height: this.user.height,
    weight: this.user.weight,
    goal: this.user.goal
  }).subscribe({
    next: () => alert(' Profile updated'),
    error: err => {
      console.error(err);
      console.log(err)
      alert(' Update failed');
    }
  });
}
  addExercise(plan: any): void {
    if (!plan.exercises) {
      plan.exercises = [];
    }

    plan.exercises.push({
      name: '',
      reps: 0,
      sets: 0,
      completed: false
    });
  }
  addMeal(plan: any): void {
    if (!plan.meals) {
      plan.meals = [];
    }

    plan.meals.push({
      type: '',
      itemsText: '',
      calories: 0,
      completed: false
    });
  }
  parseExercises(data: any): any[] {
    if (!data) return [];
    if (Array.isArray(data)) return data;

    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
  parseMeals(data: any): any[] {
    if (!data) return [];

    let parsed: any;
    try {
      parsed = typeof data === 'string' ? JSON.parse(data) : data;
    } catch {
      return [];
    }

    if (parsed.meals && Array.isArray(parsed.meals)) {
      return parsed.meals.map((m: any) => ({
        ...m,
        itemsText: Array.isArray(m.items) ? m.items.join(', ') : ''
      }));
    }

    if (Array.isArray(parsed)) {
      return parsed.map((m: any) => ({
        ...m,
        itemsText: Array.isArray(m.items) ? m.items.join(', ') : ''
      }));
    }

    return [];
  }
  savePlan(plan: any): void {

    const payload = {
      day: plan.day,
      target_calories: plan.targetCalories,
      exercises: plan.exercises,
      meals: {
        meals: plan.meals.map((m: any) => ({
          type: m.type,
          calories: m.calories,
          completed: m.completed,
          items: m.itemsText
            ? m.itemsText.split(',').map((i: string) => i.trim())
            : []
        }))
      }
    };

    this.adminService
      .updateUserPlan(this.user.id, payload)
      .subscribe(() => {
        alert(` ${plan.day} plan updated`);
      });
  }
  prepareCharts(): void {
    this.workoutLabels = [];
    this.workoutValues = [];
    this.targetCalories = 0;
    this.consumedCalories = 0;

    this.plans.forEach(plan => {
      this.workoutLabels.push(plan.day);

      this.workoutValues.push(
        plan.exercises?.filter((e: any) => e.completed).length || 0
      );

      this.targetCalories += Number(plan.targetCalories) || 0;
      this.consumedCalories += Number(plan.mealCompleted) || 0;
    });

    setTimeout(() => {
      this.chartService.workoutBar(
        'workoutChart',
        this.workoutLabels,
        this.workoutValues,
        '#005461'
      );

      this.chartService.caloriePie(
        'calorieChart',
        this.consumedCalories,
        this.targetCalories
      );
    });
  }
}
