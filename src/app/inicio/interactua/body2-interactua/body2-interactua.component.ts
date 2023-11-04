import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-body2-interactua',
  templateUrl: './body2-interactua.component.html',
  styleUrls: ['./body2-interactua.component.css']
})
export class Body2InteractuaComponent {

  @ViewChild('nameStudent') nameKey!: ElementRef;

  startQuiz(){
    localStorage.setItem("nameStudent",this.nameKey.nativeElement.value);
  }

}
