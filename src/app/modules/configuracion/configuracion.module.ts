import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { CircuitosComponent } from './pages/circuitos/circuitos.component';
import { ParticipantesComponent } from './pages/participantes/participantes.component';


@NgModule({
  declarations: [
    CircuitosComponent,
    ParticipantesComponent
  ],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule
  ]
})
export class ConfiguracionModule { }
