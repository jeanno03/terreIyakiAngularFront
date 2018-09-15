export class CommentModel {

    comment: string;

    constructor() {
    }

    public getComment(){
        return this.comment;
    }

    public setComment(value){
        this.comment=value;
    }

}