import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CostsByKey } from '../../interfaces/costs-by-key';
import { Transaction } from '../../interfaces/Transaction';
import { PercentualIncomeCosts } from '../../interfaces/percentual-income-costs';

@Injectable({
  providedIn: 'root'
})
export class MetricService {

  private baseApiUrl:string = environment.baseApiUrl;
  private apiUrl:string = `${this.baseApiUrl}/metrics`;

  constructor(private http: HttpClient) { }

  // todo: custos por tag
  getCostsByKey(): Observable<CostsByKey[]>{
    const url = `${this.apiUrl}/costs-by-tag`;
    return this.http.get<CostsByKey[]>(url);
  }

  // todo: custos mais caros
  getExpensiveCosts(): Observable<Transaction[]>{
    const url = `${this.apiUrl}/expensive-costs`;
    return this.http.get<Transaction[]>(url);
  }

  // todo: porcentagem de gastos e rendas
  getPercentualIncomeCosts(): Observable<PercentualIncomeCosts[]>{
    const url = `${this.apiUrl}/percentual-income-costs`;
    return this.http.get<PercentualIncomeCosts[]>(url);
  }

  // todo: custos por mês
  getCostsByMonth(): Observable<CostsByKey[]>{
    const url = `${this.apiUrl}/costs-by-month`;
    return this.http.get<CostsByKey[]>(url);
  }
  

}
