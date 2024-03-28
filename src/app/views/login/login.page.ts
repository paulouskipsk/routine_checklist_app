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
import { ModalSelectUnityPage } from '../modals/modal-select-unity/modal-select-unity.page';
import { AppComponent } from 'src/app/app.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    public form!: FormGroup;
    public version: string = Constants.version.description;
    // private login: any = null;
    // private password: any = null;
    // private unity: any = null;
    private data = {
        login: '',
        password: '',
        unity: 0
    };

    constructor(
        public formBuilder: FormBuilder,
        public menuCtrl: MenuController,
        private http: HttpService,
        private msgServ: MessagesService,
        private router: Router,
        public modalCtrl: ModalController,
        private appComponent: AppComponent
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

    public async submitCredentials() {
        try {
            
            let response: any;
            this.data.login = this.form.get('login')?.value
            this.data.password = this.form.get('password')?.value

            response = await this.http.post(Routes.PATH.GET_USER_DATA_BY_CREDENTIALS, this.data);
            let units = response.payload.units;
            if(!units) throw 'O usuário não possui acesso a nenhuma unidade ativa.';

            this.selectUnity(units);
        } catch (responseError : any) {
            let msg = responseError.message;
            if(responseError.status == 401){
                msg = responseError.error ? responseError.error.message : responseError;
                this.msgServ.toastInfo(msg, 'error', 10000);
            }if(responseError.status == 0){
                this.msgServ.toastInfo("Erro ao efetuar login. "+ msg, 'error', 10000);
            }
        }
        this.clearForm();
    }

    public async selectUnity(units: any){
        const modalSelectUnityPage = await this.modalCtrl.create({
            component: ModalSelectUnityPage,
        });
        modalSelectUnityPage.present();
        const {data, role} = await modalSelectUnityPage.onWillDismiss();
        this.data.unity = data;
        this.authenticate();
    }

    private async authenticate(){
        let response: any = await this.http.post(Routes.PATH.AUTH, this.data);
        SessionService.setSessionItem('token', response.payload.token);
        SessionService.setSessionItem('unityLogged', response.payload.unity);
        SessionService.setSessionItem('userLogged', response.payload.user);

        this.appComponent.setUser();
        this.appComponent.setUnity();

        this.router.navigate(['home']);
        this.msgServ.toastInfo(response.message, 'success');
        this.menuCtrl.enable(true);
    }

    public clearForm(){
        this.form.setValue({
            login: '',
            password: ''
        });
    }

    public async configServer(){
        let configServerPage = await this.modalCtrl.create({
            component: ModalConfigServerPage,
            cssClass: 'fullscreen'
        }).then(modal => {
            modal.present();
        })        
    }


}
