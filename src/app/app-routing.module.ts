import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', loadChildren: () => import('./landing/landing.module').then((m) => m.LandingModule) },
    { path: 'inicio', loadChildren: () => import('./inicio/inicio.module').then((m) => m.InicioModule) },
     { path: 'admin', loadChildren: () => import('./administracion-historias/administracion-historias.module').then((m) => m.AdministracionHistoriasModule) },
    { path: 'iniciar', loadChildren: () => import('./iniciar-historia/iniciar-historia.module').then((m) => m.IniciarHistoriaModule) },
    { path: 'interactuar', loadChildren: () => import('./interactuar-historia/interactuar-historia.module').then((m) => m.InteractuarHistoriaModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
