export class MyOrderModelModify {

    private orderDate: Date;
    private theId: any;
    private tableNumber: number;
    private orderTypeName: string;
    private statutName: string;
    private orderVatPrice: number;

    constructor(orderDate: Date, theId: any, tableNumber: number, orderTypeName: string, statutName: string, orderVatPrice: number) {
        this.orderDate = orderDate;
        this.theId = theId;
        this.tableNumber = tableNumber;
        this.statutName = statutName;
        this.orderVatPrice = orderVatPrice;
    }

    public getOrderDate() {
        return this.orderDate;
    }

    public setOrderDate(value) {
        this.orderDate = value;
    }

    public getTheId() {
        return this.theId;
    }

    public setTheId(value) {
        this.theId = value;
    }

    public getTableNumber() {
        return this.tableNumber;
    }

    public setTableNumber(value) {
        this.tableNumber = value;
    }

    public getOrderTypeName() {
        return this.orderTypeName;
    }

    public setOrderTypeName(value) {
        this.orderTypeName = value;
    }

    public getStatutName() {
        return this.statutName;
    }

    public setStatutName(value) {
        this.statutName = value;
    }

    public getOrderVatPrice() {
        return this.orderVatPrice;
    }

    public setOrderVatPrice(value) {
        this.orderVatPrice = value;
    }

}