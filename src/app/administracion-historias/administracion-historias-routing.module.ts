import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AdministracionHistoriasComponent} from "./administracion-historias.component";
import {BodyCrearComponent} from "./body-crear/body-crear.component";
import {BodyHistorialComponent} from "./body-historial/body-historial.component";
import {ApiComponent} from "./api/api.component";
import {BodyQuestionComponent} from "./body-question/body-question.component";


const routes: Routes = [
  { path: '', component: AdministracionHistoriasComponent, children: [ {path: '', component: BodyCrearComponent}]},
  { path: 'crea', component: AdministracionHistoriasComponent, children: [ {path: '', component: BodyCrearComponent}]},
  { path: 'historial', component: AdministracionHistoriasComponent, children: [ {path: '', component: BodyHistorialComponent}]},
  { path: 'api', component: AdministracionHistoriasComponent, children: [ {path: '', component: ApiComponent}]},
  { path: 'quiz', component: AdministracionHistoriasComponent, children: [ {path: '', component: BodyQuestionComponent}]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionHistoriasRoutingModule { }
