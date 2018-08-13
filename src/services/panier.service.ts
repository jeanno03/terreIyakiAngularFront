import { Injectable } from '@angular/core';

@Injectable()
export class PanierService {

    private panier = {};

    constructor() { }

    setOption(option, value) {
        this.panier[option] = value;
    }

    getPanier() {
        return this.panier;
    }
}