import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/commons/HttpService';
import { Constants } from './models/utils/Constants';
import { SessionService } from './services/commons/SessionService';
import { MessagesService } from './services/commons/MessagesService';
import { Routes } from './models/utils/Routes';
import { StorageService } from './services/commons/StorageService';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    HttpService,
    Constants,
    SessionService,
    StorageService,
    MessagesService,
    Routes,
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
