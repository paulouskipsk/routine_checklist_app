import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Routes } from 'src/app/models/utils/Routes';
import { HttpService } from 'src/app/services/commons/HttpService';
import { StorageService } from 'src/app/services/commons/StorageService';
import { UtilsService } from 'src/app/services/commons/UtilsService';

@Component({
   selector: 'app-home',
   templateUrl: './home.page.html',
   styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
   public pendingTasks: any = new Array();
   public myTasks: any = new Array();
   public selectedTab: string = "pending";

   public messageEmpty = 'Não há tarefas pendentes';

   constructor(
      private http: HttpService,
      private router: Router,
      private utilService: UtilsService
   ) { }

   ngOnInit() { }
   
   ionViewWillEnter() {
      this.getPendingTasksForUser();
   }
   
   handleRefresh(event:any) {
      let loading = this.utilService.loadingStart();
      this.messageEmpty = '';
      setTimeout(() => {
         this.getPendingTasksForUser();
         event.target.complete();
         this.utilService.loaderDismiss(loading);
      }, 2000);
   }

   public async getPendingTasksForUser() {
      try {
         this.utilService.loadingStart();
         let data: Map<any, any> = new Map();
         data.set('unity_id', 1);
         let response:any = await this.http.get(Routes.PATH.GET_TASKS_BY_USER, data);
         this.pendingTasks = response?.payload?.freeChecklistsMovs
         this.myTasks = response?.payload?.userChecklistsMovs
         
         if(this.pendingTasks == null || this.pendingTasks == '')
            this.pendingTasks = new Array();
         else{
            this.setTimeLeftInTask(this.pendingTasks);
         }

         if(this.myTasks == null || this.myTasks == '')
            this.myTasks = new Array();
         else{
            this.setTimeLeftInTask(this.myTasks);
         }
         this.utilService.loaderDismiss();
         this.messageEmpty = 'Não há tarefas pendentes';
      } catch (error) {
         this.messageEmpty = 'Não há tarefas pendentes';
         this.utilService.loaderDismiss();
         throw error;
      }

   }

   private setTimeLeftInTask(tasks:any){
      let now = new Date();
      tasks.forEach((checklistMov:any) => {
         let endDate = new Date(checklistMov.end_date);
         let timeDiff = endDate.getTime() - now.getTime();
         let diff = Math.ceil(timeDiff / (1000 * 60)); 
         checklistMov['time_left'] = diff;
      });
   }

   public getTimeLeftText(minutes: number){
      let text: String = '';
      let showTextMinute: boolean = false;
      if(Math.abs(minutes) >= 60 ){
         text += `${Math.floor(minutes / 60).toString()}h`;
         minutes = minutes % 60;
      }else showTextMinute = true;

      if(Math.abs(minutes) < 60 ) {
         text += `${Math.abs(minutes)}`;
         if(showTextMinute) text += 'min';
      }
      return text;
   }

   public async openTask(checklistMov: any){
      try {
         if(checklistMov.is_free == 'S'){
            await this.utilService.confirmAction(`Tem certeza que deseja assumir a tarefa ${checklistMov.id}?`)
            .then(async (executeTask : any) => {
               if (executeTask) {
                  let response:any = await this.http.put(Routes.PATH.ASSOCIATE_MOV, {checklistMovId: checklistMov.id});
                  this.utilService.toastInfo(response?.message, 'success');
                  this.executeTask(checklistMov.id);                 
               }
            });
         }else{
            this.executeTask(checklistMov.id);
         }
      } catch (e: any) {
         this.utilService.toastInfo(e?.error?.message, 'danger');
      }
   }

   private executeTask(checklistMovId: number){
      StorageService.setSessionItem('checklistMovId', checklistMovId);
      this.router.navigate(['tarefa-checklist']);
   }

}
