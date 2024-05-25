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

  private baseApiUrl: string = environment.baseApiUrl;
  private apiUrl: string = `${this.baseApiUrl}/registers`;
  allTransactions: Transaction[] = [];
  transactions: Transaction[] = [];
  incomeResume: string = '';
  outcomeResume: string = '';
  balanceResume: string = '';

  constructor(
    public popupService: PopupService,
    public transactionService: TransactionService,
  ) { }

  renderTransactions() {
    this.transactionService.getTransactions().subscribe((items) => {
      this.allTransactions = items;
      this.transactions = items;
      this.calcBalance();
    });
  }

  calcBalance() {
    let incomeAccumulator = 0;
    let outcomeAccumulator = 0;

    this.transactions.forEach(item => {
      if (item.flux === "DESPESA") {
        outcomeAccumulator += item.value;
      } else {
        incomeAccumulator += item.value;
      }
    });

    this.outcomeResume = `R$ ${(outcomeAccumulator * -1).toFixed(2)}` ;
    this.incomeResume = `R$ ${incomeAccumulator.toFixed(2)}`;
    this.balanceResume = `R$ ${(incomeAccumulator + outcomeAccumulator).toFixed(2)}`;
  }

  updateBalance(id: number) {
    let transaction = this.transactions.find(item => item.id === id);
    
    if (transaction) {
      let { value, flux } = transaction;
      if (flux === "DESPESA") {
        value = value * -1;
        this.outcomeResume = `R$ ${(parseFloat(this.outcomeResume.split(' ')[1]) - value).toFixed(2)}`;
        this.balanceResume = `R$ ${(parseFloat(this.balanceResume.split(' ')[1]) - value).toFixed(2)}`;
      } else {
        this.incomeResume = `R$ ${(parseFloat(this.incomeResume.split(' ')[1]) - value).toFixed(2)}`;
        this.balanceResume = `R$ ${(parseFloat(this.balanceResume.split(' ')[1]) - value).toFixed(2)}`;
      }
    } else {
      console.log(`Transaction with ID ${id} not found.`);
    }

  }

  ngOnInit(): void {
    this.renderTransactions();
  }

  removeHandler(id: number) {
    this.updateBalance(id);
    this.transactions = this.transactions.filter((r) => r.id !== id);
    this.transactionService.remove(id).subscribe();
  }

  handleShowPopup() {
    this.popupService.toggleShowPopup();
    console.log(this.popupService.showPopup);
  }

}
