import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TheMessageService {

  private theMessage = {};

  constructor() { }


    setOption(option, value) {
        this.theMessage[option] = value;
    }

    getTheMessage() {
        return this.theMessage;
    }
}