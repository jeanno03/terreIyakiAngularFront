import { PanierVatPriceService } from '../services/panier-vat-price.service';
import { PanierService } from '../services/panier.service';
import { CommandeService } from '../services/commande.service';
import { ProfilService } from '../services/profil.service';
import { AuthService } from '../services/auth.service';
import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { Router } from '@angular/router';
import { Alert } from 'selenium-webdriver';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  //test
  public panier;
  public header = [];

  public panierVatprice;

  user: firebase.User = null;
  topics: FirebaseListObservable<any[]>;
  orderType: any;
  orderTypeChoice: any;
  userFromAp: any = null;
  message: string = null;
  lastOrder: any;



  constructor(
    private auth: AuthService,
    public db: AngularFireDatabase,
    public router: Router,
    public profilService: ProfilService,
    public commandeService: CommandeService,
    public panierService: PanierService,
    public panierVatPriceService: PanierVatPriceService,
  ) {
    // //j'initialise
    // this.panier =null;
    // this.panierVatprice=null;
    //on récupère le dernier panier commande en cours et son montant
    this.panier = panierService.getPanier();
    this.panierVatprice = panierVatPriceService.getPanierVatPrice();
  }

  loginWithGoogle() {
    this.auth.getAuthState().subscribe(
      (user) => this.user = user);
    this.topics = this.db.list('/topics');
    this.auth.loginWithGoogle();
  }

  logoutWithGoogle() {
    window.alert(this.user.email + " a été déconnecté")
    this.auth.logoutWithGoogle();
    this.router.navigateByUrl('/home');
  }

  emailOnProfil(email: string) {
    this.router.navigate(['profil', email]);
  }

  getUserByEmail(email: string) {
    this.profilService.getUserByEmail(email).subscribe(data => {
      this.userFromAp = data;
    }, err => {
      console.log(err);
    })
    return this.userFromAp;
  }


  allerCommander(email: string) {
    //on va chercher l'id de l'user
    this.profilService.getUserByEmail(email).subscribe(data => {
      this.userFromAp = data;

      if (this.userFromAp) {
        this.router.navigateByUrl('/commandeAction');
      }
      else {
        this.message = "veuillez d'abord vous enregistrer dans profil"
        this.router.navigate(['homeMessage', this.message]);

      }

    }, err => {
      console.log(err);
    })
  }


  allerPanier(email: string) {
    // console.log("on va au panier");
    this.router.navigateByUrl('panier');
  }

}

