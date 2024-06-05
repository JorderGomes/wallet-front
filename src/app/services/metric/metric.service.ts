import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
// import { CostsByKey } from '../../interfaces/costs-by-key';
import { Response } from '../../interfaces/response';
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
  getCostsByTag(): Observable<Response>{
    const url = `${this.apiUrl}/costs-by-tag`;
    return this.http.get<Response>(url);
  }

  // todo: custos por mês
  getCostsByMonth(): Observable<Response>{
    const url = `${this.apiUrl}/costs-by-month`;
    return this.http.get<Response>(url);
  }

  // todo: custos mais caros
  getExpensiveCosts(currentMonth: string): Observable<Transaction[]>{
    const url = `${this.apiUrl}/expensive-costs`;
    let params = new HttpParams();
    params = params.append("year_month", currentMonth);
    return this.http.get<Transaction[]>(url, { params });
  }

  // todo: porcentagem de gastos e rendas
  getPercentualIncomeCosts(currentMonth: string): Observable<PercentualIncomeCosts>{
    const url = `${this.apiUrl}/percentual-income-costs`;
    let params = new HttpParams();
    params = params.append("year_month", currentMonth);
    return this.http.get<PercentualIncomeCosts>(url, { params });
  }

  
  

}
