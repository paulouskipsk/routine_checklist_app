import { Component, OnInit } from '@angular/core';
import { Routes } from 'src/app/models/utils/Routes';
import { HttpService } from 'src/app/services/commons/HttpService';

@Component({
   selector: 'app-home',
   templateUrl: './home.page.html',
   styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
   public pendingTasks: any;

   constructor(
      private http: HttpService,
   ) { }

   ngOnInit() {
      this.getPendingTasksForUser();
   }

   public async getPendingTasksForUser() {
      try {
         let data: Map<any, any> = new Map();
         data.set('unity_id', 1);
         let response:any = await this.http.get(Routes.PATH.GET_TASKS_BY_USER, data);
         this.pendingTasks = response?.payload?.checklistsMovs
         if(this.pendingTasks == null || this.pendingTasks == '')
            this.pendingTasks = new Array();
         else{
            let now = new Date();
            this.pendingTasks.forEach((checklistMov:any) => {
               let endDate = new Date(checklistMov.end_date);
               let timeDiff = endDate.getTime() - now.getTime();
               let diff = Math.ceil(timeDiff / (1000 * 60)); 
               checklistMov['time_left'] = diff;
            });
         }

         console.log("tarefas pendentes", this.pendingTasks)

      } catch (error) {

      }

   }

   public getTimeLeftText(minutes: number){
      let text: String = '';
      if(Math.abs(minutes) >= 60 ){
         text += `${Math.floor(minutes / 60).toString()}h`;
         minutes = minutes % 60;
      }
      if(Math.abs(minutes) < 60 ) text += `${Math.abs(minutes)}min`;
      return text;
   }

   public openChecklist(checklistMov: any){

      alert("Abrindo checklistMov cod: "+ checklistMov.id)
   }

}
