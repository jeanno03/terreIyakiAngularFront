import { PanierService } from './../../services/panier.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {

  userId:any;

//test
// public panier;
// public header = [];

  constructor(
    panierService:PanierService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) { 
    // issue is here, the _configService.getConfig() get an empty object 
    // but I had filled it just before
// this.panier = panierService.getPanier();
this.userId=activatedRoute.snapshot.params['userId'];
  }

  ngOnInit() {
    // console.log(this.panier);
    // console.log(this.userId);
  }

}
