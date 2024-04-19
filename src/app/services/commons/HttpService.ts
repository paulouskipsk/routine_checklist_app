import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SessionService } from './SessionService';
// import 'rxjs-compat/add/operator/map';
import { UtilsService } from './UtilsService';
import { ModalConfigServerPage } from 'src/app/views/modals/modal-config-server/modal-config-server.page';
import { ModalController } from '@ionic/angular';
import { StorageService } from './StorageService';


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
            utilService.toastInfo('Endereço da API não foi informado. Verifique!', 'danger');
            this.configServer();
        }
    }

    public post(route: string, data: any) {
        try {
            var options = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer "+this.getToken()
                })
            };
            data = JSON.stringify(data);
            return new Promise((resolve, reject) => {
                this.http.post(this.apiAddress + route, data, options).subscribe(data => {
                    resolve(data);
                }, err => {
                    reject(err);
                });
            });
        } catch (error) {
            throw "Erro ao fazer o post";
        }
    }

    private getJson(data:any){
        // if(typeof data == 'Map'){

        // }
    }

    public put(route: string, data: any) {
        try {
            var options = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer "+this.getToken()
                })
            };

            let payload: any;
            if(data instanceof Map){
                payload = JSON.stringify(Object.fromEntries(data));
            }else{
                payload = data;
            }
                                 
            return new Promise((resolve, reject) => {
                this.http.put(this.apiAddress + route, payload, options).subscribe(data => {
                    resolve(data);
                }, err => {
                    reject(err);
                });
            });
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