import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-body2-interactua',
  templateUrl: './body2-interactua.component.html',
  styleUrls: ['./body2-interactua.component.css']
})
export class Body2InteractuaComponent {
  public text: string="";

  @ViewChild('nameStudent') nameKey!: ElementRef;
  constructor(private router:Router) {
  }
  startQuiz(){
    localStorage.setItem("nameStudent",this.nameKey.nativeElement.value);
  }
  public enviarName(){
    console.log(this.text)
    if(!this.text) return;
    this.router.navigateByUrl("/interactuar")
  }

}
