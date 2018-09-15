import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PageCommentService {

  private pageComment = {};

  constructor() { }

  setOption(option, value){
    this.pageComment[option] = value ;
  }

  getPageComment(){
    return this.pageComment;
  }
}


