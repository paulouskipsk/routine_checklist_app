import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from "@ionic/angular";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpService } from 'src/app/services/commons/HttpService';
import { Routes } from 'src/app/models/utils/Routes';
import { Constants } from 'src/app/models/utils/Constants';
import { SessionService } from 'src/app/services/commons/SessionService';
import { Router } from '@angular/router';
import { ModalConfigServerPage } from '../modals/modal-config-server/modal-config-server.page';
import { ModalSelectUnityPage } from '../modals/modal-select-unity/modal-select-unity.page';
import { AppComponent } from 'src/app/app.component';
import { UtilsService } from 'src/app/services/commons/UtilsService';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    private loading: any;
    public form!: FormGroup;
    public version: string = Constants.version.description;
    public passwordTypeAttr = 'password';
    public iconPasswordColor = 'text-secondary';
    private data = {
        login: '',
        password: '',
        unity: 0
    };

    constructor(
        public formBuilder: FormBuilder,
        public menuCtrl: MenuController,
        private http: HttpService,
        private utilService: UtilsService,
        private router: Router,
        public modalCtrl: ModalController,
        private appComponent: AppComponent,
    ) { 
        this.menuCtrl.enable(false);
    }

    ngOnInit() {
        if(SessionService.getSessionItem('token')){
            this.menuCtrl.enable(true);
            this.utilService.toastInfo('Você já está logado.', 'success');
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
            this.loading = this.utilService.loadingStart(); 

            let response: any;
            this.data.login = this.form.get('login')?.value
            this.data.password = this.form.get('password')?.value

            response = await this.http.post(Routes.PATH.GET_USER_DATA_BY_CREDENTIALS, this.data);
            this.utilService.loaderDismiss(this.loading);

            let units = response.payload.units;
            if(!units) throw 'O usuário não possui acesso a nenhuma unidade ativa.';
            this.selectUnity(units);
        } catch (responseError : any) {
            let msg = responseError.message;
            this.utilService.loaderDismiss(this.loading);
            if(responseError.status == 401){
                msg = responseError.error ? responseError.error.message : responseError;
                this.utilService.toastInfo(msg, 'danger', 10000);
            }if(responseError.status == 400){
                this.utilService.toastInfo("Erro ao efetuar login. "+ msg, 'danger', 10000);
            }
        }
        this.clearForm();
    }

    public async selectUnity(units: any){
        const modalSelectUnityPage = await this.modalCtrl.create({
            component: ModalSelectUnityPage,
            componentProps: {units: units},
        });
        modalSelectUnityPage.present();

        const {data, role} = await modalSelectUnityPage.onWillDismiss();
        this.data.unity = data;
        this.authenticate();
    }

    private async authenticate(){
        try {
            if(this.data.unity){
                this.loading = this.utilService.loadingStart();
                
                let response: any = await this.http.post(Routes.PATH.AUTH, this.data);
                SessionService.setSessionItem('token', response.payload.token);
                SessionService.setSessionItem('unityLogged', response.payload.unity);
                SessionService.setSessionItem('userLogged', response.payload.user);
        
                this.appComponent.setUser();
                this.appComponent.setUnity();
                this.menuCtrl.enable(true);
                this.utilService.loaderDismiss(this.loading);
        
                this.router.navigate(['home']);
                this.utilService.toastInfo(response.message, 'success');
            }
        } catch (e: any) {
            this.utilService.loaderDismiss(this.loading);
            this.utilService.toastInfo(e?.error?.message, 'danger');
        }
    }

    public showPassord(){
        if(this.passwordTypeAttr == 'text'){
            this.passwordTypeAttr = 'password';
            this.iconPasswordColor = 'text-secondary';
        } else{
            this.passwordTypeAttr = 'text';
            this.iconPasswordColor = 'text-purple';
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
            component: ModalConfigServerPage,
            cssClass: 'fullscreen'
        }).then(modal => {
            modal.present();
        })        
    }


}
