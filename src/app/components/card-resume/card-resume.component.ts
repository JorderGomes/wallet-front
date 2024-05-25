import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-resume',
  templateUrl: './card-resume.component.html',
  styleUrl: './card-resume.component.css'
})
export class CardResumeComponent {

  @Input() value: string = '';
  @Input() title: string = '';
  @Input() cssClass: string = '';
}
