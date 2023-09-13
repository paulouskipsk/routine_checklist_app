import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResponseChecklistPage } from './response-checklist.page';

const routes: Routes = [
  {
    path: '',
    component: ResponseChecklistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResponseChecklistPageRoutingModule {}
