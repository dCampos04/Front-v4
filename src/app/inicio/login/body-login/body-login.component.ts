import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-body-login',
  templateUrl: './body-login.component.html',
  styleUrls: ['./body-login.component.css']
})
export class BodyLoginComponent {
  public email:string="";
  public password:string="";

  constructor(private router:Router) {
  }

  public enviarFormulario(){
    console.log(this.email, this.password)
    if(!this.email || !this.password) return;
    this.router.navigateByUrl("/admin")
  }

}
