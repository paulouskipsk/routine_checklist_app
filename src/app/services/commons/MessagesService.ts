import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Constants } from 'src/app/models/utils/Constants';

@Injectable({
    providedIn: 'root'
})

export class MessagesService {
    public toastController: ToastController = new ToastController();

    public async toastInfo(message: string, typeMsg: string = 'info', duration: number = 3000) {
        let color: string;
        switch (typeMsg) {
            case 'error':
                color = 'danger';
                break;
            case 'success':
                color = 'success';
                break;
            case 'info':
                color = 'secondary';
                break;
            case 'warning':
                color = 'warning';
                break;
            default:
                color = 'dark';
                break;
        }
        const toast = await this.toastController.create({
            message: message,
            animated: true,
            color: color,
            position: 'top',
            duration: duration,
            id: 'toast',
            buttons: [
                {
                    icon:'close-outline',
                    role: 'cancel',
                    handler: () => {},
                },
              ],
            
        });
        toast.present();
    }
}