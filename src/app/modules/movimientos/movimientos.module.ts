import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovimientosRoutingModule } from './movimientos-routing.module';
import { CompetenciaComponent } from './pages/competencia/competencia.component';


@NgModule({
  declarations: [
    CompetenciaComponent
  ],
  imports: [
    CommonModule,
    MovimientosRoutingModule
  ]
})
export class MovimientosModule { }
