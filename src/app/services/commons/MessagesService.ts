import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Constants } from 'src/app/models/utils/Constants';

@Injectable({
    providedIn: 'root'
})

export class MessagesService {

    constructor(
        private toastController: ToastController,
        private alertController: AlertController
    ){}

    public async toastInfo(message: string, typeMsg: string = 'info', duration: number = 4000) {
        let color: string;
        let icon: string;
        switch (typeMsg) {
            case 'danger':
                color = 'danger';
                icon = 'thumbs-down-outline';
                break;
            case 'success':
                color = 'success';
                icon = 'thumbs-up-outline';
                break;
            case 'info':
                color = 'secondary';
                icon = 'information-circle-outline';
                break;
            case 'warning':
                color = 'warning';
                icon = 'hand-left-outline';
                break;
            default:
                color = 'dark';
                icon = 'help-outline';
                break;
        }
        const toast = await this.toastController.create({
            message: message,
            animated: true,
            color: color,
            position: 'top',
            duration: duration,
            id: 'toast',
            cssClass:"line-break fw-bold",
            icon: icon,
            buttons: [
                {
                    icon:'close-outline',
                    role: 'cancel',
                    handler: () => {},
                },
              ],
            
        });
        this.toastController.dismiss();
        toast.present();
    }

    public async confirmAction(
        message: string = 'Confirma?', 
        header: string = 'Confirmação', 
        confirmButtonText:string = 'Confirmar', 
        cancelButtonText:string = 'Cancelar',
        subHeader: string = '', 
    ) {
        return new Promise(async (resolve) => {
            const alert = await this.alertController.create({
                header: header,
                subHeader: subHeader,
                message: message,
                backdropDismiss: false,
                keyboardClose: false,
                buttons:[
                    {
                        text: cancelButtonText,
                        role: 'cancel',
                        cssClass: 'alert-button-cancel',
                        handler: () => {
                            resolve(false);
                        },
                    },
                    {
                        text: confirmButtonText,
                        role: 'confirm',
                        cssClass: 'alert-button-confirm',
                        handler: () => {
                            resolve(true);
                        },
                    },                                    
                ]
            });
            this.alertController.dismiss();
            await alert.present();
        });           
    }
}