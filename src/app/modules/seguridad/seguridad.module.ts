import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SeguridadRoutingModule } from './seguridad-routing.module';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { GruposComponent } from './pages/grupos/grupos.component';
import { FuncionesComponent } from './pages/funciones/funciones.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    UsuarioComponent,
    GruposComponent,
    FuncionesComponent,

  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class SeguridadModule { }
