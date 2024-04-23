import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/commons/StorageService';

import { Camera, CameraDirection, CameraResultType, CameraSource } from '@capacitor/camera';
import { HttpService } from 'src/app/services/commons/HttpService';
import { Routes } from 'src/app/models/utils/Routes';
import { UtilsService } from 'src/app/services/commons/UtilsService';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ShowImagePage } from '../modals/show-image/show-image.page';

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

   constructor(
      private router: Router,
      private utilService: UtilsService,
      private http: HttpService,
      private modalCtrl: ModalController
   ) {
      this.checklistItemMov = StorageService.getAndRemoveSessionItem('checklistItemMov');
   }

   ngOnInit() {
   }

   back() {
      this.router.navigateByUrl('tarefa-checklist');
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
         quality: 80,
         allowEditing: false,
         saveToGallery: false,
         resultType: CameraResultType.Base64,
         source: CameraSource.Camera,
         width: 1024,
         height: 1024,
         direction: CameraDirection.Front,
         correctOrientation: true
      });

      let imageBase64: any = image.base64String;
      if (imageBase64 != 'undefined') {
         this.photos.push(imageBase64);
      }
   }

   public async showPhoto(photo: String){
      let showImage = await this.modalCtrl.create({
         component: ShowImagePage,
         componentProps: {
            photo: photo,
            checklistItemMov: this.checklistItemMov,
         },
     }).then(modal => {
         modal.present();
     }) 
   }

   public deletePhoto(indexPhoto: number){
      this.utilService.confirmAction("Deseja realmente deletar a foto?").then((resolv: any) => {
         if(resolv) this.photos.splice(indexPhoto, 1);
      });
   }

   public async submit() {
      let errors = [];
      let loading: any;

      try {
         let obj: Map<String, any> = new Map();
         obj.set('id', this.checklistItemMov.id);       
   
         if (this.response != '' && this.response != null && this.response != 'undefined') {
            obj.set('response', this.response);
         }else {
            errors.push('Resposta não fornecida');
         }

         if (this.checklistItemMov.required_photo == 'S') {
            if(this.photos.length >= this.checklistItemMov.quant_photo)
               obj.set('photos', this.photos);
            else {
               errors.push('Quantidade de fotos menor que o exigido.');
            }
         } else {
            obj.set('photos', this.photos);
         }
   
         obj.set('observation', null);
         if (this.checklistItemMov.type_obs == 'R') {
            if (this.observation != '' && this.observation != null && this.observation != 'undefined') {
               obj.set('observation', this.observation);
            } else {
               errors.push('Observação obrigatória não fornecida.');
            }
         } else if (this.checklistItemMov.type_obs == 'O') {
            if (this.observation != '' && this.observation != null && this.observation != 'undefined') {
               obj.set('observation', this.observation);
            } 
         }

         if(errors.length > 0) {
            throw 'Erros no formulário foram encontrados';
         }

         loading = this.utilService.loadingStart('Salvando...');

         let response: any = await this.http.put(Routes.PATH.UPDATE_ITEM_CHECKLIST_MOV + "/" + this.checklistItemMov.id, obj);
         this.checklistItemMov = response?.payload?.checklistItemMov;

         if(response.status_code == 201){      
            this.utilService.loaderDismiss(loading);
            this.utilService.toastInfo(response?.message, 'success');
            this.router.navigateByUrl('home');
         }else{
            this.utilService.loaderDismiss(loading);
            this.utilService.toastInfo(response?.message, 'success');
            this.back();
         }
      } catch (e: any) {
         this.utilService.loaderDismiss(loading);
         const errorMark = String.fromCharCode(0x2736)+ '  ';
         
         let msg = '';
         if(e.error){
            e?.error?.errors.forEach((element: any) => {
               msg += errorMark + element + "\n";
            });

            this.utilService.toastInfo(msg, 'danger', 8000);
         }else{
            msg = '';
           errors.forEach(element => {
            msg += errorMark + element+"\n";
           });
           this.utilService.toastInfo(msg, 'danger', 8000);
         }
         
      }
   }
}
