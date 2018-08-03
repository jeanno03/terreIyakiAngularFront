export class OrderItemModel {

    private price: number = null;
    private tax: number = null;
    private comment: string = "";
    private theId: any = null;

    constructor(price: number, tax: number, comment: string) {
        this.price = price;
        this.tax = tax;
        this.comment = comment;
    }

    public getPrice() {
        return this.price;
    }

    public setprice(value) {
        this.price = value;
    }

    public getTax() {
        return this.tax;
    }

    public setTax(value) {
        this.tax = value;
    }

    public getComment() {
        return this.comment;
    }

    public setComment(value) {
        this.comment = value;
    }

    public getTheId() {
        return this.theId;
    }

    public setTheId(value) {
        this.theId = value;
    }

}