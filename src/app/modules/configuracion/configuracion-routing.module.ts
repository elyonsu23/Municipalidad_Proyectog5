import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CircuitosComponent } from './pages/circuitos/circuitos.component';
import { ParticipantesComponent } from './pages/participantes/participantes.component';

const routes: Routes = [
  {
    path:"circuitos",component:CircuitosComponent
  },
  {
    path:"participantes",component:ParticipantesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionRoutingModule { }
