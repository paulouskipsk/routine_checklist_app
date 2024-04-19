import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { App } from '@capacitor/app';
import { ModalController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/commons/UtilsService';
import { StorageService } from 'src/app/services/commons/StorageService';
@Component({
    selector: 'app-modal-config-server',
    templateUrl: './modal-config-server.page.html',
    styleUrls: ['./modal-config-server.page.scss'],
})
export class ModalConfigServerPage implements OnInit {
    public formServer!: FormGroup;

    constructor(
        public formBuilder: FormBuilder,
        public modalCtrl: ModalController,
        private utilService: UtilsService,
        private plataform: PlatformLocation
    ) { }

    ngOnInit() {
        this.initializeFormControlValues();
    }

    public save() {
        if(this.formServer.valid) {
            let data = {
                protocol: this.formServer.get('protocol')?.value,
                ip: this.formServer.get('ip')?.value,
                port: this.formServer.get('port')?.value,
                timeout: this.formServer.get('timeout')?.value 
            }

            StorageService.setSessionItem('provider-routine', data);
            this.modalCtrl.dismiss();

            this.utilService.toastInfo('Configurações salvas. O APP será fechado para aplicar as configurações.','success');
            setTimeout(function () {
                App.exitApp();
            }, 3000);
        }
    }

    public cancel() {
        this.modalCtrl.dismiss();
    }


    protected initializeFormControlValues() {
        this.formServer = this.formBuilder.group({
            ip: ['', Validators.compose([
                Validators.required
            ])],
            port: ['', Validators.compose([
                // Validators.required,
                Validators.min(1),
                Validators.max(65000)
            ])],
            timeout: ['', Validators.compose([
                Validators.required,
                Validators.min(10),
                Validators.max(120)
            ])],
            protocol: ['', Validators.compose([
                Validators.required
            ])],
        });
        this.initializeValuesSaved();
    }

    private initializeValuesSaved(){
        let data = StorageService.getSessionItem('provider-routine');
        if(data){
            this.formServer.setValue({
                protocol: data.protocol,
                ip: data.ip,
                port: data.port,
                timeout: data.timeout
            });
        }
    }

    public isValid(formControll: string){
        return (this.formServer.get(formControll)?.touched && this.formServer.get(formControll)?.valid) || this.formServer.get(formControll)?.untouched;
    }

}
