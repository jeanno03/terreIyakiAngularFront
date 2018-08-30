import { Component, OnInit, Input } from '@angular/core';
import { UserFromAppService } from '../../services/user-from-app.service';
import { TheMessageService } from '../../services/the-message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {


  theMessage:any;

  constructor(

    public theMessageService: TheMessageService
  ) { 
    this.theMessage=null;
    this.theMessage = this.theMessageService.getTheMessage();
  }

  ngOnInit() {
    // this.theMessageService.setOption("theMessage",null);
    // this.theMessageService.setOption("categoryMessageNumber",null);
    // this.theMessage = this.theMessageService.getTheMessage();
    // this.theMessage.theMessage=null;
    // this.theMessage.categoryMessageNumber=null;
    // this.theMessage = this.theMessageService.getTheMessage();
    // console.log("this.theMessage.theMessage OK : "+this.theMessage.theMessage);
  }



}
