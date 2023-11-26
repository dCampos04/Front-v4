import {Component, OnInit} from '@angular/core';
import { AuthService } from "../../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router, RouterModule} from "@angular/router";

import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import { ModalConfRegComponent} from "../modal-conf-reg/modal-conf-reg.component";


@Component({
  selector: 'app-body-registro',
  templateUrl: './body-registro.component.html',
  styleUrls: ['./body-registro.component.css']
})
export class BodyRegistroComponent implements OnInit{
  postTeacherForm: FormGroup;
  public paso = 1;

  constructor(private teacherService:AuthService,
              private fb: FormBuilder, private router: Router, public dialog: MatDialog) {
    this.postTeacherForm = this.fb.group({})
  }

  ngOnInit() {
    this.postTeacherForm = this.fb.group({
      name: [null,[Validators.required]],
      surname: [null,[Validators.required]],
      email: [null,[Validators.required, Validators.email]],
      password: [null,[Validators.required]],
      newsletterCtrl: [false]
    })
  }

  siguientePaso() {
    this.paso = 2;
  }

  anteriorPaso() {
    if (this.paso === 2) {
      this.paso = 1;
    }
    else {
      this.router.navigate(['/unete']);
    }
  }

  register() {
    console.log(this.postTeacherForm.value);
    this.teacherService.register(this.postTeacherForm.value).subscribe(
      (res) => {
        console.log(res);
        this.openDialog();
      },
      (error) => {
        console.error('Error en el registro:', error);
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario.
      }
    );
  }



  openDialog() {
    const dialogRef = this.dialog.open(ModalConfRegComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
