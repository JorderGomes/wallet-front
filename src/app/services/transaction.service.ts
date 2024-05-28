import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// interface para transactions
import { environment } from '../../environments/environment';
import { Transaction } from '../Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private baseApiUrl:string = environment.baseApiUrl;
  private apiUrl:string = `${this.baseApiUrl}/registers`;

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<Transaction[]>{
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  remove(id: number){
    return this.http.delete<Transaction>(`${this.apiUrl}/${id}`);
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction);
  }

}
