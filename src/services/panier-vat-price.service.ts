import { Injectable } from '@angular/core';

@Injectable()
export class PanierVatPriceService {

    private panierVatPrice = {};

    constructor() { }

    setOption(option, value) {
        this.panierVatPrice[option] = value;
    }

    getPanierVatPrice() {
        return this.panierVatPrice;
    }
}