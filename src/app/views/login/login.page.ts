import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpService } from 'src/app/services/commons/HttpService';
import { Routes } from 'src/app/models/utils/Routes';
import { MessagesService } from 'src/app/services/commons/MessagesService';
import { Constants } from 'src/app/models/utils/Constants';
import { SessionService } from 'src/app/services/commons/SessionService';
import { Router } from '@angular/router';
import { ModalConfigServerPage } from '../modals/modal-config-server/modal-config-server.page';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    public form!: FormGroup;
    public version: string = Constants.version.description;

    constructor(
        public formBuilder: FormBuilder,
        public menuCtrl: MenuController,
        private http: HttpService,
        private msgServ: MessagesService,
        private router: Router,
        public modalCtrl: ModalController
    ) { 
        this.menuCtrl.enable(false);
    }

    ngOnInit() {
        if(SessionService.getSessionItem('token')){
            this.menuCtrl.enable(true);
            this.msgServ.toastInfo('Você já está logado.', 'success');
            this.router.navigate(['home']);
        }else{
            this.menuCtrl.enable(false);
            this.initializeFormControlValues();
            this.clearForm();
        }

    }

    protected initializeFormControlValues() {
        this.form = this.formBuilder.group({
            login: [null, Validators.compose([
                Validators.minLength(3),
                Validators.maxLength(20),
                Validators.required
            ])],
            password: [null, Validators.compose([
                Validators.minLength(3),
                Validators.maxLength(20),
                Validators.required
            ])],
        });
    }

    public async submit() {
        let response: any;

        let data = {
            login: this.form.get('login')?.value,
            password: this.form.get('password')?.value,
        };

        try {
            this.clearForm();

            response = await this.http.post(Routes.PATH.AUTH, data);
            SessionService.setSessionItem('token', response.payload.token);
            this.router.navigate(['home']);
            this.msgServ.toastInfo(response.message, 'success');
            this.menuCtrl.enable(true);
        } catch (responseError : any) {

            console.log(responseError)

            let msg = responseError.message;
            if(responseError.status == 401){
                msg = responseError.error ? responseError.error.message : responseError;
                this.msgServ.toastInfo(msg, 'error', 10000);
            }if(responseError.status == 0){
                this.msgServ.toastInfo("Erro ao efetuar login. "+ msg, 'error', 10000);
            }else{
                this.msgServ.toastInfo("Erro ao efetuar login. " + msg, 'error', 10000);
            }            
        }
    }

    public clearForm(){
        this.form.setValue({
            login: '',
            password: ''
        });
    }

    public async configServer(){
        let configServerPage = await this.modalCtrl.create({
            component: ModalConfigServerPage
        }).then(modal => {
            modal.present();
        })        
    }
}
