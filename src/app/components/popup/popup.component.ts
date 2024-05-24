import { Component } from '@angular/core';
import { PopupService } from '../../services/popup.service';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {

  constructor(public popupService: PopupService){}

  hanldeHidePopup(){
    this.popupService.showPopup = false;
  }

  hanldeSaveTransaction(){
    console.log("Saving data");
  }

}
