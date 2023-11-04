import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AdministracionHistoriasComponent} from "./administracion-historias.component";
import {AdministracionHistoriasRoutingModule} from "./administracion-historias-routing.module";

import { HeaderAdministrarComponent } from './header-administrar/header-administrar.component';
import { BodyCrearComponent } from './body-crear/body-crear.component';
import { BodyHistorialComponent } from './body-historial/body-historial.component';
import { ApiComponent } from './api/api.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import { BodyQuestionComponent } from './body-question/body-question.component';




  @NgModule({
  declarations: [
    AdministracionHistoriasComponent,
    HeaderAdministrarComponent,
    BodyCrearComponent,
    BodyHistorialComponent,
    ApiComponent,
    BodyQuestionComponent
  ],
      imports: [
          CommonModule,
          AdministracionHistoriasRoutingModule,
          MatToolbarModule
      ]
  })
export class AdministracionHistoriasModule { }