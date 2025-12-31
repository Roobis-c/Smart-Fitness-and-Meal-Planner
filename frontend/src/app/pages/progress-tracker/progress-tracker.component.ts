import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ChartService } from '../../service/chart.service';

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './progress-tracker.component.html',
  styleUrls: ['./progress-tracker.component.css']
})
export class ProgressTrackerComponent implements OnInit {

  workoutLabels: string[] = [];
  workoutValues: number[] = [];

  targetCalories = 0;
  consumedCalories = 0;

  bmiValue = 0;
  bmiStatus = '';

  bmiHeatData = [
    { label: 'Low', active: false, color: '#fff9c4' },
    { label: 'Normal', active: false, color: '#c8e6c9' },
    { label: 'High', active: false, color: '#ffcdd2' }
  ];

  constructor(
    private http: HttpClient,
    private chartService: ChartService
  ) {}

  ngOnInit() {
    this.http.get<any>('http://localhost:5001/api/tracker', {
      withCredentials: true
    }).subscribe(data => {

      data.workouts.forEach((w: any) => {
        this.workoutLabels.push(w.day);
        this.workoutValues.push(w.completed);
      });

      data.meals.forEach((m: any) => {
        this.targetCalories += m.target;
        this.consumedCalories += m.consumed;
      });

      this.bmiValue = data.bmi;
      this.bmiStatus = data.bmiStatus;

      this.chartService.workoutBar(
        'workoutChart',
        this.workoutLabels,
        this.workoutValues
      );

      this.chartService.caloriePie(
        'calorieChart',
        this.consumedCalories,
        this.targetCalories
      );

      this.applyBmiHeat(this.bmiStatus);
    });
  }

  applyBmiHeat(status: string) {
    this.bmiHeatData.forEach(z => z.active = false);
    const active = this.bmiHeatData.find(
      z => z.label.toLowerCase() === status.toLowerCase()
    );
    if (active) active.active = true;
  }
}
