import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Transaction } from '../../../interfaces/Transaction';
import { PercentualIncomeCosts } from '../../../interfaces/percentual-income-costs';
import { MetricService } from '../../../services/metric/metric.service';
import { CostsByKey } from '../../../interfaces/costs-by-key';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  expensiveCosts: Transaction[] = [];
  percentIncomeCosts: PercentualIncomeCosts | null = null;
  costsByTag: CostsByKey[] | null = null;
  costsByMonth: CostsByKey[] | null = null;
  currentMonth: string = this.getCurrentMonth();

  @ViewChild('barChart', { static: true }) barChart!: ElementRef;

  chartBarExample: any;

  constructor(
    private metricService: MetricService
  ) {
  }

  ngOnInit(): void {
    this.getMetrics();

    const ctx = this.barChart.nativeElement.getContext('2d');
    this.chartBarExample = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        datasets: [
          {
            label: 'Projetos Cadastrados Por Mês',
            data: [ 68, 63, 84, 82, 99, 51, 95, 17, 54, 45, 68, 53 ],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  ngAfterViewInit(): void {
    
  }

  setChartOptions() {
    // this.chartOptions = {
    //   title: {
    //     text: 'ECharts example'
    //   },
    //   tooltip: {},
    //   xAxis: {
    //     type: 'category',
    //     data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    //   },
    //   yAxis: {
    //     type: 'value'
    //   },
    //   series: [
    //     {
    //       name: 'Sales',
    //       type: 'bar',
    //       data: [5, 20, 36, 10, 10, 20]
    //     }
    //   ]
    // };
  }

  getMetrics() {

    this.metricService.getCostsByTag().subscribe((item) => {
      this.costsByTag = item.data;
    });

    this.metricService.getCostsByMonth().subscribe((item) => {
      this.costsByMonth = item.data;
    });

    this.metricService.getPercentualIncomeCosts(this.currentMonth).subscribe((item) => {
      this.percentIncomeCosts = item;
    });

    this.metricService.getExpensiveCosts(this.currentMonth).subscribe((item) => {
      this.expensiveCosts = item;
    });

  }

  getCurrentMonth() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // getMonth() retorna um valor de 0 a 11
    return `${year}-${month}`;
  }

}

// function ViewChild(arg0: string, arg1: { static: boolean; }): (target: DashboardComponent, propertyKey: "elemento") => void {
//   throw new Error('Function not implemented.');
// }

