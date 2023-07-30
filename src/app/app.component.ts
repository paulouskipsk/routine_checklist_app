import { Component } from '@angular/core';
import { SessionService } from './services/commons/SessionService';
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { AuthGuard } from './guards/auth/auth.guard';
@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent {
    public appPages = [
        { title: 'Home', url: '/home', icon: 'home' },
        { title: 'Configurações', url: '/login', icon: 'construct' },
    ];

    constructor(
        private router: Router, 
        private menuCtrl: MenuController, 
        private platform: Platform,
        private authGuard: AuthGuard
    ) {
        this.menuCtrl.enable(false);
       this.initializeApp();
    }

    public initializeApp(){
        this.platform.ready().then(async () => {
            await this.authGuard.checkAuth() ? this.router.navigateByUrl('home'): this.router.navigateByUrl('splash');            
        });
    }

    public logout() {
        SessionService.destroySession();
        this.menuCtrl.enable(false); 
        this.router.navigate(['login']);
    }
}
