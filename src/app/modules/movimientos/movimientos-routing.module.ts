import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompetenciaComponent } from './pages/competencia/competencia.component';

const routes: Routes = [
  {  
    path:"competencias",component:CompetenciaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientosRoutingModule { }
