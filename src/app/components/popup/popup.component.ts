import { Component, EventEmitter, Output } from '@angular/core';
import { PopupService } from '../../services/popup.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '../../Transaction';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {

  @Output() onSubmit = new EventEmitter<Transaction>();
  transactionForm!: FormGroup;


  constructor(public popupService: PopupService){}

  ngOnInit(){
    this.transactionForm = new FormGroup({
      id: new FormControl('', ),
      description: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required]),
      flux: new FormControl('', ),
      tag: new FormControl('', ),
    });
  }

  //getters form

  get description(){
    return this.transactionForm.get('description')!;
  }

  get value(){
    return this.transactionForm.get('value')!;
  }

  get flux(){
    return this.transactionForm.get('flux')!;
  }

  get tag(){
    return this.transactionForm.get('tag')!;
  }

  // get id(){
  //   return this.transactionForm.get('');
  // }


  
  hanldeHidePopup(){
    this.popupService.showPopup = false;
  }

  submit(){
    if (this.transactionForm.invalid){
      return;
    }
    console.log("Saving data");
    this.onSubmit.emit(this.transactionForm.value);
    this.transactionForm.reset();
    this.hanldeHidePopup();
  }

}
