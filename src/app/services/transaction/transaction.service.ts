import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
// interface para transactions
import { environment } from '../../../environments/environment';
import { Transaction } from '../../interfaces/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private baseApiUrl:string = environment.baseApiUrl;
  private apiUrl:string = `${this.baseApiUrl}/transactions`;
  
  private currentTransactionSubject = new BehaviorSubject<Transaction | null>(null);
  currentTransaction$ = this.currentTransactionSubject.asObservable();

  setCurrentTransaction(transaction: Transaction | null): void {
    this.currentTransactionSubject.next(transaction);
  }

  getCurrentTransaction(): Transaction | null {
    return this.currentTransactionSubject.value;
  }



  constructor(private http: HttpClient) { }

  getTransactions(): Observable<Transaction[]>{
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  remove(id: number){
    return this.http.delete<Transaction>(`${this.apiUrl}/${id}`);
  }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    console.log("create Transaction");
    
    return this.http.post<Transaction>(this.apiUrl, transaction);
  }

  editTransaction(transaction: Transaction): Observable<Transaction> {
    const url = `${this.apiUrl}/${transaction.id}`;
    return this.http.put<Transaction>(url, transaction);
  }

}
