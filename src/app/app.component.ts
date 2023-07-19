import { Component } from '@angular/core';
import { SessionService } from './services/commons/SessionService';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
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
  constructor(private router: Router, private menuCtrl: MenuController) {}

  public logout(){
      SessionService.destroySession();
      this.menuCtrl.enable(false);
      this.router.navigate(['login']);
  }
}
