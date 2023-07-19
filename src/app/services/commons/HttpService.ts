import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from './SessionService';
// import 'rxjs-compat/add/operator/map';
import { MessagesService } from './MessagesService';
import { ModalConfigServerPage } from 'src/app/views/modals/modal-config-server/modal-config-server.page';
import { ModalController } from '@ionic/angular';
import { StorageService } from './StorageService';


@Injectable({
    providedIn: 'root'
})
export class HttpService {

    public token: any;
    private apiAddress: any;

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    constructor(
        private http: HttpClient, 
        private msgServ: MessagesService,
        private modalCtrl: ModalController
    ) {
        this.apiAddress = StorageService.getSessionItem('provider-routine');
        if(this.apiAddress){
            this.apiAddress =  `${this.apiAddress.protocol}://${this.apiAddress.ip}:${this.apiAddress.port}/api`;
        }else{
            msgServ.toastInfo('Endereço da API não foi informado. Verifique!', 'error');
            this.configServer();
        }

        this.token = this.getToken();
        if (this.token) {
            this.httpOptions.headers.append('Autorization', 'Bearer ' + this.token)
        }
    }

    public post(route: string, data: any) {
        try {
            data = JSON.stringify(data);
            return new Promise((resolve, reject) => {
                this.http.post(this.apiAddress + route, data, this.httpOptions).subscribe(data => {
                    resolve(data);
                }, err => {
                    reject(err);
                });
            });
        } catch (error) {
            throw "Erro ao fazer o post";
        }
    }

    public getToken() {
        this.token = SessionService.getSessionItem('token');
    }

    public async configServer(){
        let configServerPage = await this.modalCtrl.create({
            component: ModalConfigServerPage
        }).then(modal => {
            modal.present();
        })        
    }

}