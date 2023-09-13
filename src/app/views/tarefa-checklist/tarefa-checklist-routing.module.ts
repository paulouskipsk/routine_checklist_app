import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TarefaChecklistPage } from './tarefa-checklist.page';

const routes: Routes = [
  {
    path: '',
    component: TarefaChecklistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarefaChecklistPageRoutingModule {}
