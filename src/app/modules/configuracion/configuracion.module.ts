import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { CircuitosComponent } from './pages/circuitos/circuitos.component';
import { ParticipantesComponent } from './pages/participantes/participantes.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    CircuitosComponent,
    ParticipantesComponent
  ],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class ConfiguracionModule { }
