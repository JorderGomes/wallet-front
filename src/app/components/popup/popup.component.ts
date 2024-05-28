import { Component, EventEmitter, Output } from '@angular/core';
import { PopupService } from '../../services/popup.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '../../Transaction';
import { Subscription, firstValueFrom } from 'rxjs';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {

  @Output() onSubmit = new EventEmitter<Transaction>();
  transactionForm!: FormGroup;
  currentTransaction: Transaction | null = null;
  private transactionSubscription: Subscription | null = null;
  private showPopupSubscription: Subscription | null = null;
  isVisible: boolean = false;


  constructor(
    public popupService: PopupService,
    public transactionService: TransactionService
  ) { }

  ngOnInit() {

    this.transactionSubscription = this.transactionService.currentTransaction$.subscribe(transaction => {
      this.currentTransaction = transaction;
      this.checkShowPopup();
    });

    this.showPopupSubscription = this.popupService.showPopup$.subscribe(show => {
      this.isVisible = show;
      this.checkShowPopup();
    });

    this.setTransactionForm();
  }

  setTransactionForm(){
    console.log(this.currentTransaction);

    this.transactionForm = new FormGroup({
      id: new FormControl(this.currentTransaction ? this.currentTransaction.id : '',),
      description: new FormControl(this.currentTransaction ? this.currentTransaction.description : '', [Validators.required]),
      value: new FormControl(this.currentTransaction ? this.currentTransaction.value : '', [Validators.required]),
      flux: new FormControl(this.currentTransaction ? this.currentTransaction.flux : '',),
      tag: new FormControl(this.currentTransaction ? this.currentTransaction.tag : '',),
    });
  }

  checkShowPopup(): void {
    if (this.currentTransaction && this.isVisible) {
      this.onShowPopup();
    }
  }

  onShowPopup(): void {
    this.setTransactionForm();
  }

  

  //getters form

  get description() {
    return this.transactionForm.get('description')!;
  }

  get value() {
    return this.transactionForm.get('value')!;
  }

  get flux() {
    return this.transactionForm.get('flux')!;
  }

  get tag() {
    return this.transactionForm.get('tag')!;
  }

  // get id(){
  //   return this.transactionForm.get('');
  // }



  hanldeHidePopup() {
    this.transactionService.setCurrentTransaction(null);
    this.popupService.setShowPopup(false);
  }

  handleShowPopup() {
    this.popupService.setShowPopup(true);
    // this.loadCurrentTransaction();
  }

  submit() {
    if (this.transactionForm.invalid) {
      return;
    }
    console.log("Saving data");
    this.onSubmit.emit(this.transactionForm.value);
    this.transactionForm.reset();
    this.hanldeHidePopup();
  }



  ngOnDestroy(): void {
    this.transactionSubscription?.unsubscribe();
  }

}
