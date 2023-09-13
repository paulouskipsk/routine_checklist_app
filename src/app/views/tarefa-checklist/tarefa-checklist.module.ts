import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TarefaChecklistPageRoutingModule } from './tarefa-checklist-routing.module';

import { TarefaChecklistPage } from './tarefa-checklist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TarefaChecklistPageRoutingModule
  ],
  declarations: [TarefaChecklistPage]
})
export class TarefaChecklistPageModule {}
