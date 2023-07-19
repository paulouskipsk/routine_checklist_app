import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class SessionService {
    
    constructor() { }

    public static getSessionItem(key: string) {
        let data: any = sessionStorage.getItem(key);
        return JSON.parse(data);
    }

    public static setSessionItem(key: string, value: any) {
        let valueAux = JSON.stringify(value);
        sessionStorage.setItem(key, valueAux);
    }

    public static removeItem(key:string){
        sessionStorage.removeItem(key);
    }

    public static destroySession() {
        sessionStorage.clear();
    }   

}