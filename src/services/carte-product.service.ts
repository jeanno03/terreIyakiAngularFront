import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarteProductService {

  private carteElement = {};

  constructor() { }

      setOption(option, value) {
        this.carteElement[option] = value;
    }

        getCarteElement() {
        return this.carteElement;
    }


}


