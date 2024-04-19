import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/services/commons/UtilsService';
import { SessionService } from 'src/app/services/commons/SessionService';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private navCtrl: NavController, private utilService: UtilsService) {}

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