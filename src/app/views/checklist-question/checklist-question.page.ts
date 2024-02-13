import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/commons/StorageService';

import { Camera, CameraDirection, CameraResultType, CameraSource } from '@capacitor/camera';
import { HttpService } from 'src/app/services/commons/HttpService';
import { Routes } from 'src/app/models/utils/Routes';
import { MessagesService } from 'src/app/services/commons/MessagesService';
import { Router } from '@angular/router';

@Component({
   selector: 'app-checklist-question',
   templateUrl: './checklist-question.page.html',
   styleUrls: ['./checklist-question.page.scss'],
})
export class ChecklistQuestionPage implements OnInit {
   public checklistItemMov: any;
   public photos: Array<String> = new Array();
   public response: String = '';
   public observation: String = '';

   constructor(private router: Router, private msgServ: MessagesService, private http: HttpService) {
      this.checklistItemMov = StorageService.getAndRemoveSessionItem('checklistItemMov');
      console.log(this.checklistItemMov);
   }

   ngOnInit() {
   }

   back() {
      this.router.navigateByUrl('tarefa-checklist');
   }

   confirm() {
      this.submit();
   }

   public setResponse(response: String) {
      this.responseReset();

      switch (response) {
         case 'N': {
            let btn = document.getElementById('response_n');
            btn?.classList.remove("btn-outline-danger");
            btn?.classList.add("btn-danger");
            this.response = 'N';
            break;
         }
         case 'Y': {
            let btn = document.getElementById('response_y');
            btn?.classList.remove("btn-outline-success");
            btn?.classList.add("btn-success");
            this.response = 'Y';
            break;
         }
         case 'B': {
            let btn = document.getElementById('response_b');
            btn?.classList.remove("btn-outline-danger");
            btn?.classList.add("btn-danger");
            this.response = 'B';
            break;
         }
         case 'G': {
            let btn = document.getElementById('response_g');
            btn?.classList.remove("btn-outline-warning");
            btn?.classList.add("btn-warning");
            this.response = 'G';
            break;
         }
         case 'E': {
            let btn = document.getElementById('response_e');
            btn?.classList.remove("btn-outline-success");
            btn?.classList.add("btn-success");
            this.response = 'E';
            break;
         }
      }
   }

   private responseReset() {
      if (this.checklistItemMov.type == 'S') {
         let btnN = document.getElementById('response_n');
         btnN?.classList.remove("btn-danger");
         btnN?.classList.add("btn-outline-danger");

         let btnY = document.getElementById('response_y');
         btnY?.classList.remove("btn-success");
         btnY?.classList.add("btn-outline-success");
      } else {
         let btnb = document.getElementById('response_b');
         btnb?.classList.remove("btn-danger");
         btnb?.classList.add("btn-outline-danger");

         let btng = document.getElementById('response_g');
         btng?.classList.remove("btn-warning");
         btng?.classList.add("btn-outline-warning");

         let btnE = document.getElementById('response_e');
         btnE?.classList.remove("btn-success");
         btnE?.classList.add("btn-outline-success");
      }
   }

   public async getPhoto() {
      const image = await Camera.getPhoto({
         quality: 100,
         allowEditing: false,
         resultType: CameraResultType.Base64,
         source: CameraSource.Camera,
         height: 800,
         width: 600,
         direction: CameraDirection.Front,
         correctOrientation: true
      });

      let imageBase64: any = image.base64String;
      if (imageBase64 != 'undefined') {
         this.photos.push(imageBase64);
      }
   }

   public async submit() {
      let obj: Map<String, any> = new Map();
      obj.set('id', this.checklistItemMov.id);

      if (this.checklistItemMov.required_photo == 'S') {
         obj.set('photos', this.photos);
      } else {
         obj.set('photos', null);
      }

      if (this.response != '' && this.response != null && this.response != 'undefined') {
         obj.set('response', this.response);
      }else throw 'Resposta não fornecida';

      if (this.checklistItemMov.type_obs == 'R') {
         if (this.observation != '' && this.observation != null && this.observation != 'undefined') {
            obj.set('observation', this.observation);
         } else throw 'Observação não fornecida';
      } else if (this.checklistItemMov.type_obs == 'O') {
         if (this.observation != '' && this.observation != null && this.observation != 'undefined') {
            obj.set('observation', this.observation);
         }
      } else {
         obj.set('observation', null);
      }
      try {
         //const result = Object.fromEntries(obj);
         let response: any = await this.http.put(Routes.PATH.UPDATE_ITEM_CHECKLIST_MOV + "/" + this.checklistItemMov.id, obj);
         this.checklistItemMov = response?.payload?.checklistItemMov;

         if(response.status_code == 201){            
            this.msgServ.toastInfo(response?.message, 'success', 6000);
            this.router.navigateByUrl('home');
         }else{
            this.msgServ.toastInfo(response?.message, 'success');
            this.back();
         }
      } catch (e: any) {
         let msg = '';
         e?.error?.errors.forEach((element: any) => {
            msg += element + " | ";
         });
         this.msgServ.toastInfo(msg, 'error', 10000)
      }
   }
}
