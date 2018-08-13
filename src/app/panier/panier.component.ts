import { UserFromAppService } from './../../services/user-from-app.service';
import { PanierService } from '../../services/panier.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})
export class PanierComponent implements OnInit {

  userFromAp: any = null;

  constructor(
    panierService: PanierService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public userFromAppService: UserFromAppService
  ) {
    this.userFromAp = userFromAppService.getFirebaseUser();
  }

  ngOnInit() {
  }

}
