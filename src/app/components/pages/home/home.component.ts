import { Component } from '@angular/core';
import { PopupService } from '../../../services/popup.service';
import { TransactionService } from '../../../services/transaction.service';
import { Transaction } from '../../../Transaction';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  private baseApiUrl:string = environment.baseApiUrl;
  private apiUrl:string = `${this.baseApiUrl}/registers`;
  allTransactions: Transaction[] = [];
  transactions: Transaction[] = [];

  constructor(
    public popupService: PopupService,
    public transactionService: TransactionService,
  ){}

  renderTransactions(){
    this.transactionService.getTransactions().subscribe((items) => {
      this.allTransactions = items;
      this.transactions = items;
    });
  }

  ngOnInit(): void {
    this.renderTransactions();
  }

  removeHandler(id: number) {
    this.transactions = this.transactions.filter((r) => r.id !== id);
    this.transactionService.remove(id).subscribe();
  }

  handleShowPopup(){
    this.popupService.toggleShowPopup();
    console.log(this.popupService.showPopup);
  }

}
