import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalSelectUnityPageRoutingModule } from './modal-select-unity-routing.module';

import { ModalSelectUnityPage } from './modal-select-unity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalSelectUnityPageRoutingModule
  ],
  declarations: [ModalSelectUnityPage]
})
export class ModalSelectUnityPageModule {}
