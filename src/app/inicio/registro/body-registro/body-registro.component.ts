import { Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {Router, RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatStepperModule} from "@angular/material/stepper";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalConfRegComponent} from "../modal-conf-reg/modal-conf-reg.component";

@Component({
  selector: 'app-body-registro',
  templateUrl: './body-registro.component.html',
  styleUrls: ['./body-registro.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    RouterModule,
    MatDialogModule
  ]
})
export class BodyRegistroComponent implements OnInit{
  Registro = [
    {
      nombres: "",
      apellidos: "",
      correo: "",
      contrasena: ""
    },
  ];
  isLinear = true;
  firstFormGroup: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});

  paso = 1;

  // Primer paso
  nombre: string = '';
  apellidos: string = '';
  acepto: boolean = false;

  // Segundo paso
  correo: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';


  constructor(private router: Router, private _formBuilder: FormBuilder, public dialog: MatDialog) {}
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
      confirmarContrasena: ['', Validators.required],
      newsletterCtrl: [false], // Asegúrate de que esta propiedad esté definida
    });
  }
  siguientePaso() {
    if (this.paso === 1) {
      if (this.nombre && this.apellidos) {
        this.paso = 2;
        this.Registro[0].nombres = this.nombre;
        this.Registro[0].apellidos = this.apellidos;

      }
    }
  }

  anteriorPaso() {
    if (this.paso === 2) {
      this.paso = 1;
    }
    else {
      this.router.navigate(['/unete']);
    }

  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalConfRegComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  registrar(){
    console.log(this.secondFormGroup.valid)
    if(this.secondFormGroup.invalid) return;
    this.openDialog()
    this.generateJSON();
  }

  generateJSON() {
    // Construir el objeto JSON deseado
    const jsonRegistros = this.Registro.map((reg, i) => {
      return {
        nombres: reg.nombres,
        apellidos: reg.apellidos,
        correo: reg.correo,
        contrasena: reg.contrasena
      };
    });

    const jsonData = {
      registros: jsonRegistros,
    };

    const jsonString = JSON.stringify(jsonData, null, 2);
    console.log('JSON generado:', jsonString);
    // Puedes guardar jsonString en un archivo o enviarlo a través de una solicitud HTTP según tus necesidades.
  }


}
