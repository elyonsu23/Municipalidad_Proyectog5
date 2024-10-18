import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/autentificacion/pages/login/login.component';
import { AdminComponent } from './modules/admin/pages/admin/admin.component';

const routes: Routes = [
  //ruta comun -> para que lleve al login
  {
    path:"",component:LoginComponent
  },
  { path: 'admin', component: AdminComponent },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  {
    path:"",loadChildren:()=>import('./modules/autentificacion/autentificacion.module').then(m=>m.AutentificacionModule)
  },
  {
    path:"",loadChildren:()=>import('./modules/admin/admin.module').then(m=>m.AdminModule)
  },
  {
    path:"",loadChildren:()=>import('./modules/seguridad/seguridad.module').then(m=>m.SeguridadModule)
  },
  {
    path:"",loadChildren:()=>import('./modules/inicio/inicio.module').then(m=>m.InicioModule)
  },
  {
    path:"",loadChildren:()=>import('./modules/configuracion/configuracion.module').then(m=>m.ConfiguracionModule)
  },
  {
    path:"",loadChildren:()=>import('./modules/movimientos/movimientos.module').then(m=>m.MovimientosModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
