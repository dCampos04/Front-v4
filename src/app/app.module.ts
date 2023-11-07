import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InicioModule } from "./inicio/inicio.module";
import { AdministracionHistoriasModule } from "./administracion-historias/administracion-historias.module";
import { IniciarHistoriaModule } from "./iniciar-historia/iniciar-historia.module";
import { InteractuarHistoriaModule } from "./interactuar-historia/interactuar-historia.module";
import { LandingModule } from "./landing/landing.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";





@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LandingModule,
    InicioModule,
    AdministracionHistoriasModule,
    IniciarHistoriaModule,
    InteractuarHistoriaModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
