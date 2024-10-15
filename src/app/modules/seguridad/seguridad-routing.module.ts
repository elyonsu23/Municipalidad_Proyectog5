import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { GruposComponent } from './pages/grupos/grupos.component';
import { FuncionesComponent } from './pages/funciones/funciones.component';

const routes: Routes = [
  {
    path:"usuario",component:UsuarioComponent
  },
  {
    path:"grupos",component:GruposComponent
  },
  {
    path:"funciones",component:FuncionesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
