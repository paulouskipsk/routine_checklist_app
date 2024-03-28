import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalSelectUnityPage } from './modal-select-unity.page';

const routes: Routes = [
  {
    path: '',
    component: ModalSelectUnityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalSelectUnityPageRoutingModule {}
