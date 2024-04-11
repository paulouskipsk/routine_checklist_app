import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/commons/HttpService';
import { StorageService } from 'src/app/services/commons/StorageService';
import { Router } from '@angular/router';
import { Routes } from 'src/app/models/utils/Routes';
import { MessagesService } from 'src/app/services/commons/MessagesService';

@Component({
   selector: 'app-tarefa-checklist',
   templateUrl: './tarefa-checklist.page.html',
   styleUrls: ['./tarefa-checklist.page.scss'],
})
export class TarefaChecklistPage implements OnInit {
   public checklistMov: any = {id: '', description: ''};
   public checklistItensMovs: any = [];
   public sectors: Array<String> = new Array();
   public sectorSelected: String = ''; 
   private chmvId: any;

   constructor(
      private http: HttpService,
      private router: Router,
      private msgServ: MessagesService
   ) {     
      this.chmvId = StorageService.getAndRemoveSessionItem('checklistMovId');     
   }

   ngOnInit() {  }

   ionViewWillEnter() {
      this.getChecklistMov(); 
   }

   private async getChecklistMov(){
      let response: any = await this.http.get(Routes.PATH.GET_CHECKLIST_MOV +"/"+ this.chmvId);
      this.checklistMov = response?.payload.checklistMov;
      this.checklistItensMovs = this.checklistMov.checklist_itens_movs;
      this.getChecklistItensMovs(); 
   }

   public async getChecklistItensMovs() {
      try {        
         let data: Map<any, any> = new Map();
         data.set('chmv_id', this.checklistMov.id);
        
         if(this.checklistItensMovs == null || this.checklistItensMovs == '') {
            this.checklistItensMovs = new Array();
         } else {
            this.sectors.push("Todos");
            this.sectorSelected = "Todos";
            this.checklistItensMovs.forEach((checklistItemMov: any) => {
               if(checklistItemMov.sector){
                  this.sectors.push(checklistItemMov.sector.description);
               }
            });
         }
      } catch (error) {

      }
   }

   handleRefresh(event:any) {
      setTimeout(() => {
         this.getChecklistItensMovs();
         event.target.complete();
      }, 2500);
   }

   public async questionPage(checklistItemMov:any){
      StorageService.setSessionItem('checklistItemMov', checklistItemMov);
      this.router.navigateByUrl('checklist-question');
   }

   public disassociateChecklistmov(checklistMov: any){
      try {

         this.msgServ.confirmAction(`Confirma a liberação da tarefa ${checklistMov.id}?`)
         .then(resolv => {
            if(resolv){
               let response = this.http.put(Routes.PATH.DISASSOCIATE_MOV,{checklistMovId: checklistMov.id});
               console.log(response);
               response.then((response: any) => {
                  this.msgServ.toastInfo(response?.message, 'success');
                  this.router.navigateByUrl('/home');
               }).catch((e: any) => {
                  this.msgServ.toastInfo(e?.error?.message, 'danger');
               })
               
            }
         }).catch(e =>{
            this.msgServ.toastInfo(e, 'danger');
         })



         
      } catch (e: any) {
         this.msgServ.toastInfo(e?.error?.message, 'danger');
      }
   }
}
