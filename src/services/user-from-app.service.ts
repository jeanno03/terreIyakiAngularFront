import { Injectable } from '@angular/core';

@Injectable()
export class UserFromAppService{

    private userFromApp = {};

    constructor() { }

    setOption(option, value){
        this.userFromApp[option]=value;
    }

    getFirebaseUser(){
        return this.userFromApp;
    }
}