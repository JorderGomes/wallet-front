import { Component } from '@angular/core';
import { Transaction } from '../../../interfaces/Transaction';
import { PercentualIncomeCosts } from '../../../interfaces/percentual-income-costs';
import { MetricService } from '../../../services/metric/metric.service';
import { CostsByKey } from '../../../interfaces/costs-by-key';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  expensiveCosts: Transaction[] = [];
  percentIncomeCosts: PercentualIncomeCosts | null = null;
  costsByTag: CostsByKey[] | null = null;
  costsByMonth: CostsByKey[] | null = null;
  currentMonth: string = this.getCurrentMonth();

  constructor(private metricService: MetricService) { }

  ngOnInit(): void {
    this.getMetrics();
  }

  getMetrics() {

    this.metricService.getCostsByTag().subscribe((item) => {
      console.log(`1`);
      console.log(item);
      this.costsByTag = item.data;
    });

    this.metricService.getCostsByMonth().subscribe((item) => {
      console.log(`2`);
      console.log(item);
      this.costsByMonth = item.data;
    });
    
    this.metricService.getPercentualIncomeCosts(this.currentMonth).subscribe((item) => {
      console.log(`3`);
      console.log(item);
      this.percentIncomeCosts = item;
    });

    this.metricService.getExpensiveCosts(this.currentMonth).subscribe((item) => {
      console.log(`4`);
      console.log(item);
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
