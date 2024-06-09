import { Component, EventEmitter, Output } from '@angular/core';
import { SessionService } from './services/commons/SessionService';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { AuthGuard } from './guards/auth/auth.guard';
import { StatusBar } from '@capacitor/status-bar';
import { Constants } from './models/utils/Constants';
import { SplashScreen } from '@capacitor/splash-screen';
import { UtilsService } from './services/commons/UtilsService';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    public user : any;
    public unity : any;
    public version: string;

    public setUser(){ this.user = SessionService.getSessionItem('userLogged'); }
    public setUnity(){ this.unity = SessionService.getSessionItem('unityLogged'); }

    public appPages = [
        { title: 'Home', url: '/home', icon: 'home' },
        // { title: 'Configurações', url: '/login', icon: 'construct' },
    ];

    constructor(
        private router: Router, 
        private menuCtrl: MenuController, 
        private platform: Platform,
        private authGuard: AuthGuard,
        private utilService: UtilsService
    ) {
        StatusBar.setBackgroundColor({
            color: "#520404"
        });
        this.version = Constants.version;
        this.menuCtrl.enable(false);
       this.initializeApp();
    }

    public initializeApp(){
        this.platform.ready().then(async () => {
            this.setUser();
            this.setUnity();

            setTimeout(async () => { await SplashScreen.hide(); }, 2000);
            if(await this.authGuard.checkAuth()) {
                this.router.navigateByUrl('home');
            }    
        });
    }

    public async logout() {
        if(await this.utilService.confirmAction(`Realmente deseja sair do aplicativo?`)) {
            SessionService.destroySession();
            this.menuCtrl.enable(false); 
            this.router.navigate(['login']);
        }       
    }
}
