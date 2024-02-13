import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChecklistQuestionPageRoutingModule } from './checklist-question-routing.module';

import { ChecklistQuestionPage } from './checklist-question.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChecklistQuestionPageRoutingModule
  ],
  declarations: [ChecklistQuestionPage]
})
export class ChecklistQuestionPageModule {}
