import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResponseChecklistPageRoutingModule } from './response-checklist-routing.module';

import { ResponseChecklistPage } from './response-checklist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResponseChecklistPageRoutingModule
  ],
  declarations: [ResponseChecklistPage]
})
export class ResponseChecklistPageModule {}
