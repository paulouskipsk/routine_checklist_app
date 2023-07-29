import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
    selector: 'app-splash',
    templateUrl: './splash.page.html',
    styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

    constructor(private router: Router, public menuCtrl: MenuController) { 
        this.menuCtrl.enable(false);
    }

    ngOnInit() {
        setTimeout(() => {
            this.router.navigateByUrl('login');
        }, 3000);
    }

}
