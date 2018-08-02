import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {
  lastOrder: any;
  constructor(
    public activedRoute: ActivatedRoute,
    public router: Router
  ) { 
   this.lastOrder=activedRoute.snapshot.params['lastOrder'] ;
  }

  ngOnInit() {
  }

}
