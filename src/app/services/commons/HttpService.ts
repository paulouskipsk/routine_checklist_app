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
    private timeout: number = 30000;

    constructor(
        private http: HttpClient, 
        private utilService: UtilsService,
        private modalCtrl: ModalController
    ) {
        let apiData = StorageService.getSessionItem('provider-routine');
        console.log("APIDATA: ", apiData);
        if(apiData){
            this.apiAddress = `${apiData.protocol}://${apiData.ip}`;
            this.apiAddress += (apiData?.port && apiData.port == 80 || apiData.port == 443) ? '/api' : `:${apiData.port}/api`;
            this.timeout = apiData.timeout ? apiData.timeout * 1000 : 80000;
        }else{
            this.utilService.toastInfo('Endereço da API não foi informado. Verifique!', 'danger');
            this.configServer();
        }
    }

    public async post(route: string, data: any) {
        let response: HttpResponse = {} as HttpResponse;
        try {
            const options = {
                url: this.apiAddress + route,
                connectTimeout: this.timeout,
                readTimeout: this.timeout,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + this.getToken()
                },
                data: data,
            };        
            response = await CapacitorHttp.post(options);
            return response.data;
        } catch (error:any) {
            throw this. getErrorMessage(error);
        }
    }

   

    public async put(route: string, data: any) {
        try {
            let payload = this.prepareBody(data);
            const options = {
                url: this.apiAddress + route,
                connectTimeout: this.timeout,
                readTimeout: this.timeout,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + this.getToken()
                },
                data: payload,
            };        
            const response: HttpResponse = await CapacitorHttp.put(options);
            return response.data;
        } catch (error) {
            throw this. getErrorMessage(error);
        }
    }

    public get(route: string, data: Map<any, any> = new Map()) {
        try {
            let params = '';
            var options = {
                connectTimeout: this.timeout,
                readTimeout: this.timeout,
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
            throw this. getErrorMessage(error);
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

    private prepareBody(data: any) {
        let payload: any;
        if(data instanceof Map){
            payload = JSON.stringify(Object.fromEntries(data));
        }else{
            payload = data;
        }
        return payload;
    }

    private getErrorMessage(error: any) {
        if (error?.code == 'SSLHandshakeException') 
            return "* Erro ao estabelecer conexão SSL com o servidor remoto.\n\n" + 
                   "* Este erro pode ser configuração da porta SSL. A porta padrão constuma ser a '445', experimente alterar esta configuração!";

        if (error?.code == 'SocketTimeoutException')
            return "* Erro ao receber resposta do Servidor. \n"+
                   "* Tempo de espera Excedido!\n"+
                   "* Verifique a conexão com a internet\n";
                   "  ou as configurações de conexão com a API.";

        if (error?.code == 'MalformedURLException')
            return "* Erro ao processar requisição ao servidor. \n\n"+
                   "* Verifique o endereço da API e porta nas configurações!";

        return "Erro ao executar requisição com servidor, verifique a conexão com a Internet ou se o servidor está respondendo.";
    }

}