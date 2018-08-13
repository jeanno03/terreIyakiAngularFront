export class ProductModel {

    private name: string;
    private price: number;
    private picture: string;
    private description: string;
    private theId: any;
    private tax: number;
    private vatPrice: number;

    constructor(
        name: string,
        price: number,
        picture: string,
        description: string,
        theId: any,
        tax: number,
        vatPrice: number) {
        this.name = name;
        this.price = price;
        this.picture = picture;
        this.description = description;
        this.theId = theId;
        this.tax = tax;
        this.vatPrice = vatPrice;
    }

    public getName() {
        return this.name;
    }

    public setName(value) {
        this.name = value;
    }

    public getPrice() {
        return this.price;
    }

    public setPrice(value) {
        this.price = value;
    }

    public getPicture() {
        return this.picture;
    }

    public setPicture(value) {
        this.picture = value;
    }

    public getTheId() {
        return this.theId;
    }

    public setTheId(value) {
        this.theId = value;
    }

    public getTax() {
        return this.tax;
    }

    public setTax(value) {
        this.tax = value;
    }

    public getVatPrice() {
        return this.vatPrice;
    }

    public setVatPrice(value) {
        this.vatPrice = value;
    }

}