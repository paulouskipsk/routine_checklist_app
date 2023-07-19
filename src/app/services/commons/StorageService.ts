import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class StorageService {
    
    constructor() { }

    public static getSessionItem(key: string) {
        let data: any = localStorage.getItem(key);
        return JSON.parse(data);
    }

    public static setSessionItem(key: string, value: any) {
        let valueAux = JSON.stringify(value);
        localStorage.setItem(key, valueAux);
    }

    public static removeItem(key:string){
        localStorage.removeItem(key);
    }

    public static destroySession() {
        localStorage.clear
    }   

}