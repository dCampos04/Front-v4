import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';

import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatStepperModule} from '@angular/material/stepper';
import { MatButtonModule} from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from "@angular/router";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {ModalConfRegComponent} from "../modal-conf-reg/modal-conf-reg.component";

@Component({
  selector: 'app-body-registro',
  templateUrl: './body-registro.component.html',
  styleUrls: ['./body-registro.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    RouterModule,
    MatDialogModule
  ],
})
export class BodyRegistroComponent  implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup = new FormGroup({});
  secondFormGroup: FormGroup = new FormGroup({});

  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      secondCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      emailCtrl: ['', [Validators.required, Validators.email]],
      passwordCtrl: ['', Validators.required],
      confirmPasswordCtrl: ['', Validators.required],
      newsletterCtrl: [false]
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalConfRegComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  registrarse(){
    console.log(this.secondFormGroup.valid)
    if(this.firstFormGroup.invalid || this.secondFormGroup.invalid) return;
    this.openDialog()
  }
}
