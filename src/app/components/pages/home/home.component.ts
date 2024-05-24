import { Component } from '@angular/core';
import { PopupService } from '../../../services/popup.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(public popupService: PopupService){}

  handleShowPopup(){
    this.popupService.toggleShowPopup();
    console.log(this.popupService.showPopup);
  }

}
