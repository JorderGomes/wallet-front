import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  // showPopup:boolean = false;

  private showPopupSubject = new BehaviorSubject<boolean>(false);
  showPopup$ = this.showPopupSubject.asObservable();

  setShowPopup(show: boolean): void {
    this.showPopupSubject.next(show);
  }

  getShowPopup(): boolean {
    return this.showPopupSubject.value;
  }

  constructor() { }

  toggleShowPopup(){
    this.showPopupSubject.next(!this.showPopupSubject.value);
    //this.showPopup = !this.showPopup;
  }

}
