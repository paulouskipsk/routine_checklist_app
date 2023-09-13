import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Routes } from 'src/app/models/utils/Routes';
import { HttpService } from 'src/app/services/commons/HttpService';
import { SessionService } from 'src/app/services/commons/SessionService';
import { StorageService } from 'src/app/services/commons/StorageService';
import { ResponseChecklistPage } from '../modals/checklist/response-checklist/response-checklist.page';

@Component({
   selector: 'app-tarefa-checklist',
   templateUrl: './tarefa-checklist.page.html',
   styleUrls: ['./tarefa-checklist.page.scss'],
})
export class TarefaChecklistPage implements OnInit {
   public checklistMov: any;
   public checklistItensMovs: any;

   constructor(
      private http: HttpService,
      private modalCtrl: ModalController
   ) {
      this.checklistMov = StorageService.getAndRemoveSessionItem('checklistMov');
   }

   ngOnInit() {
      this.getChecklistItensMovs();
   }

   public async getChecklistItensMovs() {
      try {
         let data: Map<any, any> = new Map();
         data.set('chmv_id', this.checklistMov.id);
         let response:any = await this.http.get(Routes.PATH.GET_CHECKLIST_ITENS_MOVS, data);
         this.checklistItensMovs = response?.payload?.checklistsItensMovs

         if(this.checklistItensMovs == null || this.checklistItensMovs == '')
            this.checklistItensMovs = new Array();

            console.log("ITENS:::: ", this.checklistItensMovs, response)
      } catch (error) {

      }

   }

   openItem(checklistItemMov: any){
      alert('Abriu o item');
   }

   handleRefresh(event:any) {
      setTimeout(() => {
         this.getChecklistItensMovs();
         event.target.complete();
      }, 2500);
   }

   public async answerModal(checklistItemMov:any){
      StorageService.setSessionItem('checklistItemMov', checklistItemMov);
      let configServerPage = await this.modalCtrl.create({
          component: ResponseChecklistPage,
          backdropDismiss: false,
          cssClass: 'fullscreen'
      }).then(modal => {
          modal.present();
      });
   }



}
