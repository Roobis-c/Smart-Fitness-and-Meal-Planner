import { Injectable } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Injectable({ providedIn: 'root' })
export class ChartService {

  private charts: Record<string, Chart> = {};
  private destroy(id: string) {
    if (this.charts[id]) {
      this.charts[id].destroy();
      delete this.charts[id];
    }
  }
  workoutBar(
    canvasId: string,
    labels: string[],
    values: number[],
    color: string = '#003C46'
  ) {
    this.destroy(canvasId);

    this.charts[canvasId] = new Chart(canvasId, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Completed Exercises',
          data: values,
          backgroundColor: color
        }]
      }
    });
  }
  caloriePie(
    canvasId: string,
    consumed: number,
    target: number
  ) {
    this.destroy(canvasId);

    this.charts[canvasId] = new Chart(canvasId, {
      type: 'pie',
      data: {
        labels: ['Consumed', 'Remaining'],
        datasets: [{
          data: [
            consumed,
            Math.max(target - consumed, 0)
          ],
          backgroundColor: ['#5682B1', '#003C46']
        }]
      }
    });
  }
}
