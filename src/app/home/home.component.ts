import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TheMessageService } from '../../services/the-message.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

message:any;
// theMessage:any;
// categoryMessageNumber:any;
theMessage:any;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router:Router,
    public theMessageService:TheMessageService
    // public theMessageService:TheMessageService
  ) { 
    this.message=activatedRoute.snapshot.params['message'];
    this.theMessage =null;
    this.theMessage = this.theMessageService.getTheMessage();

    // console.log("this.message " + this.message);

    // this.theMessage=activatedRoute.snapshot.params['theMessage'];
    // this.categoryMessageNumber=activatedRoute.snapshot.params['categoryMessageNumber'];


    // console.log("this.theMessage " + this.theMessage);
    // console.log("this.categoryMessageNumber " + this.categoryMessageNumber);

    // this.theMessageService.setOption("theMessage",this.theMessage);
    // this.theMessageService.setOption("categoryMessageNumber",this.categoryMessageNumber);

  }

  ngOnInit() {
  }



}
