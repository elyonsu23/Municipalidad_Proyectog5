import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//ARCHIVO DE RUTAS DEL MODULO
import { AutentificacionRoutingModule } from './autentificacion-routing.module';

//VISTAS
import { LoginComponent } from './pages/login/login.component';

// COMPONENTES DE MATERIAL
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

//modulo para hacer el formulario reactivo
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AutentificacionRoutingModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
  ]
})
export class AutentificacionModule { }
