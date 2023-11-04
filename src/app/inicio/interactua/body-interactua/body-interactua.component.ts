import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-body-interactua',
  templateUrl: './body-interactua.component.html',
  styleUrls: ['./body-interactua.component.css']
})
export class BodyInteractuaComponent {
  nombre: string = "";
  // @ts-ignore
    formulario: FormGroup;

  submitted: boolean = false;

    constructor(private fb: FormBuilder) { }

    ngOnInit(){
        this.formulario = this.fb.group({
            Code: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12)]]
        });
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
}

/*

mostrarAlerta: boolean = false;
*        onSubmit(){
    this.submitted = true;
    if (this.formulario.valid) {
      // El formulario es válido, puedes enviar los datos aquí
      this.nombre = "FUNCIONA"
      this.mostrarAlerta = false;
      console.log('mostrarAlerta:', this.mostrarAlerta);
    } else {
      this.mostrarAlerta = true;
      console.log('mostrarAlerta:', this.mostrarAlerta);
    }
  }*/


/*
  limitInput(event: any): void {
    const inputElement = event.target;
    const inputValue = inputElement.value;

    // Eliminar espacios en blanco
    const sanitizedValue = inputValue.replace(/\s/g, '');

    // Limitar la longitud a 12 caracteres
    if (sanitizedValue.length > 12) {
      inputElement.value = sanitizedValue.slice(0, 12);
    } else {
      inputElement.value = sanitizedValue;
    }
  }
*/
