import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

message:any;

  constructor(
    public activatedRoute: ActivatedRoute,
    public router:Router,
  ) { 
    this.message=activatedRoute.snapshot.params['message'];
  }

  ngOnInit() {
  //  this.message="bienvenue";
  }



}
