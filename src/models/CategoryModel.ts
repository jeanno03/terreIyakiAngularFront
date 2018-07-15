export class CategoryModel{

    private name:string;
    private theId:any;
    private parentComboCategoryId;

    constructor(name: string, theId: any, parentComboCategoryId:any){
        this.name= name;
        this.theId= theId;
        this.parentComboCategoryId = parentComboCategoryId;
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

}