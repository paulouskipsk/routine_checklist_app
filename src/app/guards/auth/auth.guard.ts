import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { MessagesService } from 'src/app/services/commons/MessagesService';
import { SessionService } from 'src/app/services/commons/SessionService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private navCtrl: NavController, private msgServ: MessagesService) {}

  async canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return await this.checkAuth();
  }

  public async checkAuth() {
    let authenticated = SessionService.getSessionItem('token');
    authenticated = authenticated ? true : false;
    return authenticated || this.routeToLogin();
  }

  private routeToLogin(): boolean {
    this.navCtrl.navigateRoot('/login');
    return false;
  }
}