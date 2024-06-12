import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Transaction } from '../../../interfaces/Transaction';
import { PopupService } from '../../../services/popup/popup.service';
import { TransactionService } from '../../../services/transaction/transaction.service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrashCan, faPen } from '@fortawesome/free-solid-svg-icons';

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

  iconTrash = faTrashCan;
  iconPen = faPen;

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
      if (item.flux === "GASTO") {
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

  async createHandler(transaction: Transaction){
    console.log("create Handler");
    
    if (transaction.id){
      await firstValueFrom(this.transactionService.editTransaction(transaction));
    } else {
      await firstValueFrom(this.transactionService.createTransaction(transaction));
    }
    this.renderTransactions();
  }

  removeHandler(id: number) {
    this.updateBalance(id);
    this.transactions = this.transactions.filter((r) => r.id !== id);
    this.transactionService.remove(id).subscribe();
  }

  editHandler(currentTransaction: Transaction){
    this.handleShowPopup();
    this.transactionService.setCurrentTransaction(currentTransaction);
    
  }

  handleShowPopup() {
    this.popupService.setShowPopup(true);
    // console.log(this.popupService.showPopup);
  }

}
