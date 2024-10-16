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
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  {
    path:"",loadChildren:()=>import('./modules/autentificacion/autentificacion.module').then(m=>m.AutentificacionModule)
  },
  {
    path:"",loadChildren:()=>import('./modules/admin/admin.module').then(m=>m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
