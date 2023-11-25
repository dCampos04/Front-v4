import { Component, OnInit } from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {FormBuilder} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-body-crear',
  templateUrl: './body-crear.component.html',
  styleUrls: ['./body-crear.component.css']
})
export class BodyCrearComponent implements OnInit{

  constructor(private router: Router) {
  }


  ngOnInit() {

  }

}

