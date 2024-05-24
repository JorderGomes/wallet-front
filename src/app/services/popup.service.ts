import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  showPopup:boolean = false;

  constructor() { }

  toggleShowPopup(){
    this.showPopup = !this.showPopup;
  }

}
