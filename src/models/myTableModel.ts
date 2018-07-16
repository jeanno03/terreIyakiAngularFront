export class MyTableModel{

    tableNumber:number;
    statut:string;
    theId:any;

    constructor(tableNumber:number, statut:string, theId:any){
        this.tableNumber = tableNumber;
        this.statut = statut;
        this.theId = theId;
    }

	public getTableNumber() {
		return this.tableNumber;
	}

	public setTableNumber(tableNumber:number) {
		this.tableNumber = tableNumber;
    }
    
    public getStatut (){
        return this.statut
    }

    public setStatut(statut:string){
        this.statut = statut;
    }

    public getTheId(){
        return this.theId;
    }

    public setTheId(theId:any){
        this.theId=theId;
    }

}