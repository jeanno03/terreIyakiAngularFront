import { PanierVatPriceService } from '../services/panier-vat-price.service';
import { PanierService } from '../services/panier.service';
import { CommandeService } from '../services/commande.service';
import { ProfilService } from '../services/profil.service';
import { AuthService } from '../services/auth.service';
import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { Router } from '@angular/router';


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

  user = null;
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
    public panierService:PanierService,
    public panierVatPriceService:PanierVatPriceService
  ) { 
this.panier = panierService.getPanier();
this.panierVatprice = panierVatPriceService.getPanierVatPrice();
// <h3>{{panierVatprice.vatPriceTotal}}</h3
// if(this.panierItem[0]!=null){
//   console.log("this.panierItem.orderItems[0].vatPrice : "+this.panierItem.orderItems[0].vatPrice);
// }
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
      console.log("this.userFromAp.theId : " + this.userFromAp.theId);
    }, err => {
      console.log(err);
    })
    return this.userFromAp;
  }


  allerCommander(email: string) {

    //on va chercher l'id de l'user
    this.profilService.getUserByEmail(email).subscribe(data => {
      this.userFromAp = data;
      // this.router.navigate(['commandeAction', email, this.userFromAp.theId]);
      //console.log("this.userFromAp.theId : " + this.userFromAp.theId);

      //si userFromAp is true on execute la route sinon on invite l'utilisateur a s'enregistrer


      if (this.userFromAp) {
        //on envoie en paramètre le mail de l'user et l'id de l'user
        this.router.navigate(['commandeAction', email, this.userFromAp.theId]);
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
console.log("on va au panier");
    // on va chercher l'id de l'user
    this.profilService.getUserByEmail(email).subscribe(data => {
      this.userFromAp = data;
   
      // this.commandeService.selectLastMyOrderByUser(this.userFromAp.theId).subscribe(data => {
      //   this.lastOrder = data;
        //on envoie en paramètre la last commande de l user
        this.router.navigate(['panier',this.userFromAp.theId]);
    })
      //si userFromAp is true on execute la route sinon on invite l'utilisateur a s'enregistrer
      
      // if (this.userFromAp) {
      //   this.commandeService.selectLastMyOrderByUser(this.userFromAp.theId).subscribe(data => {
      //     this.lastOrder = data;
      //     //on envoie en paramètre la last commande de l user
      //     this.router.navigate(['panier', this.lastOrder]);
      //   })

      // }
      // else {
      //   this.message = "veuillez d'abord choisir un type de commande"
      //   this.router.navigate(['homeMessage', this.message]);

      // }
    
      // })
    


  // })




}

}