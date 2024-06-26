import { Component, ElementRef, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Transaction } from '../../../interfaces/Transaction';
import { PercentualIncomeCosts } from '../../../interfaces/percentual-income-costs';
import { MetricService } from '../../../services/metric/metric.service';

import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  expensiveCosts: Transaction[] = [];
  percentIncomeCosts: PercentualIncomeCosts | null = null;
  costsByTag: Map<string, number> | null = null;
  costsByMonth: Map<string, number> | null = null;
  currentMonth: string = this.getCurrentMonth();

  @ViewChild('chartMonths', { static: true }) chartMonths!: ElementRef;
  barChartMonths: any;

  @ViewChild('chartTags', {static: true}) chartTags!: ElementRef;
  barChartTags: any;

  @ViewChild('pieChartPercent', {static: true}) pieChartPercent!: ElementRef; 
  pieChartPercentual: any;

  constructor(
    private metricService: MetricService
  ) {
  }

  ngOnInit(): void {
    this.getMetrics();
    // this.setChartOptions();
  }

  ngAfterViewInit(): void {
    // this.setChartOptions();
  }

  setChartOptions() {
    const ctxChartMonths = this.chartMonths.nativeElement.getContext('2d');
    this.barChartMonths = new Chart(ctxChartMonths, {
      type: 'bar',
      data: {
        labels: this.costsByMonth != null ? Array.from(this.costsByMonth.keys()) : [],
        datasets: [
          {
            label: "Custos por mês",
            data: this.costsByMonth != null ? Array.from(this.costsByMonth.values()) : [],
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            reverse: true
          }
        },
        
      }
    });

    const ctxChartTags = this.chartTags.nativeElement.getContext('2d');
    this.barChartTags = new Chart(ctxChartTags, {
      type: 'bar',
      data: {
        labels: this.costsByTag != null ? Array.from(this.costsByTag.keys()) : [],
        datasets: [
          {
            label: "Custos por tags",
            data: this.costsByTag != null ? Array.from(this.costsByTag.values()) : [],
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            reverse: true
          }
        },
        
      }
    });

    const ctxPieChartPercent = this.pieChartPercent.nativeElement.getContext('2d');
    this.pieChartPercentual = new Chart(ctxPieChartPercent, {
      type: 'doughnut',
      data: {
        labels: ['% de renda', '% de gastos'],
        datasets: [
          {
            label: 'Percentual de gastos e rendas',
            data: [this.percentIncomeCosts!.percentIncome, this.percentIncomeCosts!.percentCosts],
          }
        ]
      }
    });
  }

  // getMetrics() {
  //   this.metricService.getCostsByTag().subscribe((item) => {
  //     const tagMap = item.data.reduce((acc, i) => acc.set(i.key, i.value), new Map());
  //     this.costsByTag = tagMap;
  //   });

  //   this.metricService.getCostsByMonth().subscribe((item) => {
  //     const monthMap = item.data.reduce((acc, i) => acc.set(i.key, i.value), new Map());
  //     this.costsByMonth = monthMap;
  //   });

  //   this.metricService.getPercentualIncomeCosts(this.currentMonth).subscribe((item) => {
  //     this.percentIncomeCosts = item;
  //   });

  //   this.metricService.getExpensiveCosts(this.currentMonth).subscribe((item) => {
  //     this.expensiveCosts = item;
  //   });
  // }

  getMetrics() {
    const costsByTag$ = this.metricService.getCostsByTag().pipe(
      map(item => item.data.reduce((acc, i) => acc.set(i.key, i.value), new Map()))
    );
  
    const costsByMonth$ = this.metricService.getCostsByMonth().pipe(
      map(item => item.data.reduce((acc, i) => acc.set(i.key, i.value), new Map()))
    );
  
    const percentIncomeCosts$ = this.metricService.getPercentualIncomeCosts(this.currentMonth);
    const expensiveCosts$ = this.metricService.getExpensiveCosts(this.currentMonth);
  
    forkJoin([costsByTag$, costsByMonth$, percentIncomeCosts$, expensiveCosts$]).subscribe(
      ([tagMap, monthMap, percentIncomeCosts, expensiveCosts]) => {
        this.costsByTag = tagMap;
        this.costsByMonth = monthMap;
        this.percentIncomeCosts = percentIncomeCosts;
        this.expensiveCosts = expensiveCosts;
        this.setChartOptions(); // Chama setOptions apenas após todas as chamadas assíncronas terminarem
      }
    );
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

