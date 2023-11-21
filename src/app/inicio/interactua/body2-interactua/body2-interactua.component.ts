import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-body2-interactua',
  templateUrl: './body2-interactua.component.html',
  styleUrls: ['./body2-interactua.component.css']
})
export class Body2InteractuaComponent {

  estudianteInicio = [
    {
      codigo: "",
      nombreEst: "",
    },
  ];

  public text: string="";
  public text2: string="";
  nombre: string = "";
  // @ts-ignore
  formulario: FormGroup;
  page:number=1;

  submitted: boolean = false;

  @ViewChild('nameStudent') nameKey!: ElementRef;
  constructor(private router:Router, private fb: FormBuilder) {
  }


  public enviarCodigo(){
    console.log(this.text)
    if(!this.text) return;
    this.page=2;
  }
  public enviarName(){
    localStorage.setItem("nameStudent",this.nameKey.nativeElement.value);
    console.log(this.text2)
    if(!this.text2) return;
    this.estudianteInicio[0].codigo = this.text;
    this.estudianteInicio[0].nombreEst = this.text2;
    this.router.navigateByUrl("/interactuar");
    this.generateJSON();
  }

  get f() {return this.formulario.controls; }
  onSubmit(){
    this.submitted = true;

    if (this.formulario.invalid) {
      this.nombre = "FUNCIONA EN ONSUBMIT NEGATIVO"
      return
    } else if (this.formulario.valid) {
      this.nombre = "FUNCIONA EN ONSUBMIT"
      return
    }
    alert('Información Correcta')
  }

  generateJSON() {

    // Construir el objeto JSON deseado
    const jsonestudianteInicio = this.estudianteInicio.map((estini, i) => {
      return {
        codigo: estini.codigo,
        nombreEst: estini.nombreEst,
      };
    });

    const jsonData = {
      estudianteInicio: jsonestudianteInicio,
    };

    const jsonString = JSON.stringify(jsonData, null, 2);
    console.log('JSON generado:', jsonString);
    // Puedes guardar jsonString en un archivo o enviarlo a través de una solicitud HTTP según tus necesidades.
  }

}
