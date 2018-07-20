export class CategoryModel{

    private name:string;
    
    private theId:any;
    private parentComboCategoryId;
    private parentComboCategoryNumber:number;

    constructor(name: string, theId: any, parentComboCategoryId:any, parentComboCategoryNumber : number){
        this.name= name; 
        this.theId= theId;
        this.parentComboCategoryId = parentComboCategoryId;
        this.parentComboCategoryNumber=parentComboCategoryNumber;
    }

    public getName() {
        return this.name;
    }

    public setName(value) {
        this.name = value;
    }

    public getTheId() {
        return this.theId;
    }

    public setTheId(value) {
        this.theId = value;
    }

    public getParentComboCategoryId() {
        return this.parentComboCategoryId;
    }

    public setParentComboCategoryId(value) {
        this.parentComboCategoryId = value;
    }

    public getComboCategoryNumber(){
        return this.parentComboCategoryNumber;
    }

    public setComboCategoryNumber(value){
        this.parentComboCategoryNumber=value;
    }

}