import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:"",loadChildren:()=>import('./modules/admin/admin.module').then(m=>m.AdminModule)
  },
  {
    path:"",loadChildren:()=>import('./modules/seguridad/seguridad.module').then(m=>m.SeguridadModule)
  },
  {
    path:"",loadChildren:()=>import('./modules/autentificacion/autentificacion.module').then(m=>m.AutentificacionModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
