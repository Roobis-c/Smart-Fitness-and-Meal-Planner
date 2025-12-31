import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-progress-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-tracker.component.html',
  styleUrls: ['./progress-tracker.component.css']
})
export class ProgressTrackerComponent implements AfterViewInit {

  @ViewChild('dailyWorkoutCanvas') dailyWorkoutCanvas!: ElementRef;
  @ViewChild('dailyCaloriesCanvas') dailyCaloriesCanvas!: ElementRef;
  @ViewChild('bmiCanvas') bmiCanvas!: ElementRef;

  dailyWorkoutChart!: Chart;
  dailyCaloriesChart!: Chart;
  bmiChart!: Chart;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.loadDailyWorkoutChart();
    this.loadDailyCaloriesChart();
    this.loadBMIChart();
  }

  /* =================================================
     1️⃣ DAILY WORKOUT COMPLETION – BAR CHART
  ================================================= */
  loadDailyWorkoutChart() {
    this.http.get<any>(
      'http://localhost:5000/api/progress/daily-workout',
      { withCredentials: true }
    ).subscribe(res => {

      if (this.dailyWorkoutChart) {
        this.dailyWorkoutChart.destroy();
      }

      this.dailyWorkoutChart = new Chart(
        this.dailyWorkoutCanvas.nativeElement,
        {
          type: 'bar',
          data: {
            labels: res.days,
            datasets: [{
              label: 'Completed Exercises',
              data: res.completedCount,
              backgroundColor: '#42a5f5'
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                ticks: { stepSize: 1 }
              }
            }
          }
        }
      );
    });
  }

  /* =================================================
     2️⃣ DAILY CALORIES – TARGET vs CONSUMED
  ================================================= */
  loadDailyCaloriesChart() {
    this.http.get<any>(
      'http://localhost:5000/api/progress/daily-calories',
      { withCredentials: true }
    ).subscribe(res => {

      if (this.dailyCaloriesChart) {
        this.dailyCaloriesChart.destroy();
      }

      this.dailyCaloriesChart = new Chart(
        this.dailyCaloriesCanvas.nativeElement,
        {
          type: 'line',
          data: {
            labels: res.days,
            datasets: [
              {
                label: 'Target Calories',
                data: res.target,
                borderColor: '#ef5350',
                tension: 0.3
              },
              {
                label: 'Consumed Calories',
                data: res.consumed,
                borderColor: '#66bb6a',
                tension: 0.3
              }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              legend: { position: 'top' }
            }
          }
        }
      );
    });
  }

  /* =================================================
     3️⃣ BMI STATUS – DOUGHNUT CHART
  ================================================= */
  loadBMIChart() {
    this.http.get<any>(
      'http://localhost:5000/api/progress/bmi-status',
      { withCredentials: true }
    ).subscribe(res => {

      if (this.bmiChart) {
        this.bmiChart.destroy();
      }

      this.bmiChart = new Chart(
        this.bmiCanvas.nativeElement,
        {
          type: 'doughnut',
          data: {
            labels: ['Low BMI', 'Normal BMI', 'High BMI'],
            datasets: [{
              data: [
                res.chart.low,
                res.chart.normal,
                res.chart.high
              ],
              backgroundColor: ['#42a5f5', '#66bb6a', '#ef5350']
            }]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: `BMI: ${res.bmi} (${res.category})`
              },
              legend: { position: 'bottom' }
            }
          }
        }
      );
    });
  }
}
