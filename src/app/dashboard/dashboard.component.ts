import { AfterViewInit, Component } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as Chartist from 'chartist';

const ANIMATION_DELAY = 80;
const ANIMATION_DURATION = 500;

interface AnimatableSvg {
  animate(definitions: Record<string, Record<string, unknown>>): void;
}

interface AnimatablePath {
  clone(): AnimatablePath;
  scale(x: number, y: number): AnimatablePath;
  translate(x: number, y: number): AnimatablePath;
  stringify(): string;
}

/** Shape of the payload Chartist hands to `draw` listeners for the elements we animate. */
interface ChartistDrawData {
  type: string;
  element: AnimatableSvg;
  path: AnimatablePath;
  chartRect: { height: () => number };
}

@Component({
  selector: 'app-dashboard',
  imports: [MatTooltipModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const dailySalesChart = new Chartist.Line(
      '#dailySalesChart',
      {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        series: [[12, 17, 7, 17, 23, 18, 38]],
      },
      {
        lineSmooth: Chartist.Interpolation.cardinal({ tension: 0 }),
        low: 0,
        // Creative Tim: set `high` to the biggest value plus some headroom for a better look.
        high: 50,
        chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
      },
    );
    this.animateLineChart(dailySalesChart);

    const completedTasksChart = new Chartist.Line(
      '#completedTasksChart',
      {
        labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
        series: [[230, 750, 450, 300, 280, 240, 200, 190]],
      },
      {
        lineSmooth: Chartist.Interpolation.cardinal({ tension: 0 }),
        low: 0,
        high: 1000,
        chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
      },
    );
    this.animateLineChart(completedTasksChart);

    const websiteViewsChart = new Chartist.Bar(
      '#websiteViewsChart',
      {
        labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
        series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]],
      },
      {
        axisX: { showGrid: false },
        low: 0,
        high: 1000,
        chartPadding: { top: 0, right: 5, bottom: 0, left: 0 },
      },
      [
        [
          'screen and (max-width: 640px)',
          {
            seriesBarDistance: 5,
            axisX: { labelInterpolationFnc: (value: string) => value[0] },
          },
        ],
      ],
    );
    this.animateBarChart(websiteViewsChart);
  }

  private animateLineChart(chart: Chartist.IChartistLineChart): void {
    let sequence = 0;

    chart.on('draw', (data: ChartistDrawData) => {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === 'point') {
        sequence++;
        data.element.animate({
          opacity: {
            begin: sequence * ANIMATION_DELAY,
            dur: ANIMATION_DURATION,
            from: 0,
            to: 1,
            easing: 'ease',
          },
        });
      }
    });
  }

  private animateBarChart(chart: Chartist.IChartistBarChart): void {
    let sequence = 0;

    chart.on('draw', (data: ChartistDrawData) => {
      if (data.type !== 'bar') {
        return;
      }
      sequence++;
      data.element.animate({
        opacity: {
          begin: sequence * ANIMATION_DELAY,
          dur: ANIMATION_DURATION,
          from: 0,
          to: 1,
          easing: 'ease',
        },
      });
    });
  }
}
