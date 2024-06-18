import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from './SessionService';
import { UtilsService } from './UtilsService';
import { ModalConfigServerPage } from 'src/app/views/modals/modal-config-server/modal-config-server.page';
import { ModalController } from '@ionic/angular';
import { StorageService } from './StorageService';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';


@Injectable({
    providedIn: 'root'
})
export class HttpService {

    public token: any;
    private apiAddress: any;

    constructor(
        private http: HttpClient, 
        private utilService: UtilsService,
        private modalCtrl: ModalController
    ) {
        let apiData = StorageService.getSessionItem('provider-routine');
        if(apiData){
            this.apiAddress = `${apiData.protocol}://${apiData.ip}`;
            this.apiAddress += apiData.port ? `:${apiData.port}/api` : '/api';
        }else{
            this.utilService.toastInfo('Endereço da API não foi informado. Verifique!', 'danger');
            this.configServer();
        }
    }

    public async post(route: string, data: any) {
        try {
            const options = {
                url: this.apiAddress + route,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + this.getToken()
                },
                data: data,
            };        
            const response: HttpResponse = await CapacitorHttp.post(options);
            return response.data;
        } catch (error) {
            throw "Erro ao fazer o post";
        }
    }

    private prepareBody(data: any) {
        let payload: any;
        if(data instanceof Map){
            payload = JSON.stringify(Object.fromEntries(data));
        }else{
            payload = data;
        }
        return payload;
    }

    public async put(route: string, data: any) {
        try {
            let payload = this.prepareBody(data);
            const options = {
                url: this.apiAddress + route,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + this.getToken()
                },
                data: payload,
            };        
            const response: HttpResponse = await CapacitorHttp.put(options);
            return response.data;
        } catch (error) {
            throw "Erro ao fazer o Put";
        }
    }

    public get(route: string, data: Map<any, any> = new Map()) {
        try {
            let params = '';
            var options = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer "+this.getToken()
                })
            };

            if(data.size > 0){
                data.forEach((value: any, key: any) => {
                    if(params == '') params = '?'
                    else params += '&';
                    params += `${key}=${value}`
                });
            }

            return new Promise((resolve, reject) => {
                this.http.get(this.apiAddress + route + params, options).subscribe(data => {
                    resolve(data);
                }, err => {
                    reject(err);
                });
            });
        } catch (error) {
            throw "Erro ao fazer o GET";
        }
    }

    public getToken() {
        return SessionService.getSessionItem('token');
    }

    public async configServer(){
        let configServerPage = await this.modalCtrl.create({
            component: ModalConfigServerPage
        }).then(modal => {
            modal.present();
        })        
    }

}