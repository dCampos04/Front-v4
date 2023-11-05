import {Input, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

import {AdministracionHistoriasComponent} from "./administracion-historias.component";
import {AdministracionHistoriasRoutingModule} from "./administracion-historias-routing.module";

import { HeaderAdministrarComponent } from './header-administrar/header-administrar.component';
import { BodyCrearComponent } from './body-crear/body-crear.component';
import { BodyHistorialComponent } from './body-historial/body-historial.component';
import { ApiComponent } from './api/api.component';
import { MatToolbarModule } from "@angular/material/toolbar";
import { BodyQuestionComponent } from './body-question/body-question.component';
import { HttpClientModule } from "@angular/common/http";
import {ChangeBg2Directive} from "./change-bg2.directive";





  @NgModule({
  declarations: [
    AdministracionHistoriasComponent,
    HeaderAdministrarComponent,
    BodyCrearComponent,
    BodyHistorialComponent,
    ApiComponent,
    BodyQuestionComponent,
    ChangeBg2Directive

  ],
    imports: [
      CommonModule,
      AdministracionHistoriasRoutingModule,
      MatToolbarModule,
      HttpClientModule,
    ]
  })
export class AdministracionHistoriasModule { }
