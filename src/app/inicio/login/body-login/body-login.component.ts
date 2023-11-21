import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-body-login',
  templateUrl: './body-login.component.html',
  styleUrls: ['./body-login.component.css']
})
export class BodyLoginComponent {

  Login = [
    {
      correo: "",
      contrasena: "",
    },
  ];
  public email:string="";
  public password:string="";

  constructor(private router:Router) {
  }

  public enviarFormulario(){
    console.log(this.email, this.password)
    this.Login[0].correo = this.email;
    this.Login[0].contrasena = this.password;
    if(!this.email || !this.password) return;
    this.router.navigateByUrl("/admin")
    this.generateJSON();
  }


  generateJSON() {

    // Construir el objeto JSON deseado
    const jsonLogin = this.Login.map((log, i) => {
      return {
        correo: log.correo,
        contrasena: log.contrasena
      };
    });

    const jsonData = {
      login: jsonLogin,
    };

    const jsonString = JSON.stringify(jsonData, null, 2);
    console.log('JSON generado:', jsonString);
    // Puedes guardar jsonString en un archivo o enviarlo a través de una solicitud HTTP según tus necesidades.
  }


}
