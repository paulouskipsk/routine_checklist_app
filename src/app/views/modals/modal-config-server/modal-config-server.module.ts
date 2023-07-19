import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalConfigServerPageRoutingModule } from './modal-config-server-routing.module';

import { ModalConfigServerPage } from './modal-config-server.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ModalConfigServerPageRoutingModule
  ],
  declarations: [ModalConfigServerPage]
})
export class ModalConfigServerPageModule {}
