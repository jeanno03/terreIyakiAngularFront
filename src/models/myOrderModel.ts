export class MyOrderModel{

    private orderDate:Date;
    private theId:any;

    constructor(orderDate:Date, theId:any){
        this.orderDate = orderDate;
        this.theId = theId;
    }

    public getOrderDate(){
        return this.orderDate;
    }

    public setOrderDate(value){
        this.orderDate = value;
    }

    public getTheId() {
        return this.theId;
    }

    public setTheId(value) {
        this.theId = value;
    }

}