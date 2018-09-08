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
import { UserFromAppService } from '../services/user-from-app.service';
import { TheMessageService } from '../services/the-message.service';
import { FalseUser } from '../models/falseUser';

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
  theMessage: any;
  falseUser: FalseUser;
  //   currentMainPage: any;

  //   elementChoice: Array<string>;
  // choice:string;


  constructor(
    private auth: AuthService,
    public db: AngularFireDatabase,
    public router: Router,
    public profilService: ProfilService,
    public commandeService: CommandeService,
    public panierService: PanierService,
    public panierVatPriceService: PanierVatPriceService,
    public userFromAppService: UserFromAppService,
    public theMessageService: TheMessageService
  ) {
    this.panier = panierService.getPanier();
    this.panierVatprice = panierVatPriceService.getPanierVatPrice();
    // this.elementChoice = [
    //   'La Carte',
    //   'Nos Menus',
    //   'Nos tables',
    //   'Page Test'
    // ]

    // this.theMessageService.setOption("theMessage", null);
    // this.theMessageService.setOption("categoryMessageNumber", null);

    //on initialise tous les objets partagés
    // this.theMessageService.setOption("theMessage", null);
    // this.theMessageService.setOption("categoryMessageNumber", null);
    //  this.router.navigateByUrl('/home');
    //  this.theMessage=null;
  }


  loginWithGoogle() {
    this.auth.getAuthState().subscribe(
      (user) => {
        this.user = user
        // this.userFromAppService.setOption("email",this.user.email);
        // this.userFromAppService.setOption("displayName",this.user.displayName);
        if (this.user) {
          this.theMessage = "Connexion de " + this.user.email + " réussi !";
          this.theMessageService.setOption("theMessage", this.theMessage);
          this.theMessageService.setOption("categoryMessageNumber", 1);
        }


        // console.log("this.theMessage : " + this.theMessage);
        ;
      }, err => {
        console.log(err);
      })
    this.topics = this.db.list('/topics');
    this.auth.loginWithGoogle();
    // this.router.navigate(['homeMessage','Vous êtes connecté']);
    this.router.navigateByUrl('/home');

  }

  //fausse connection
  falseLoginWithGoogle() {
    this.falseUser = new FalseUser("test@getMail.com", "test original");
    this.user = this.falseUser;
    if (this.user) {
      this.theMessage = "Connexion de " + this.user.email + " réussi !";
      this.theMessageService.setOption("theMessage", this.theMessage);
      this.theMessageService.setOption("categoryMessageNumber", 1);
    }
    this.router.navigateByUrl('/home');
  }

  logoutWithGoogle() {
    // window.alert(this.user.email + " a été déconnecté")
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


        this.theMessageService.setOption("theMessage", "veuillez d'abord vous enregistrer dans profil");
        this.theMessageService.setOption("categoryMessageNumber", 2);
        this.router.navigate(['profil', this.user.email]);
        // this.message = "veuillez d'abord vous enregistrer dans profil"
        // this.router.navigate(['homeMessage', this.message]);

      }

    }, err => {
      console.log(err);
    })
  }


  allerPanier(email: string) {
    // console.log("on va au panier");
    this.router.navigateByUrl('panier');
  }

  mesCommandes(email: string) {

    this.router.navigateByUrl('mesCommandes');
  }


  // 'La Carte',
  // 'Nos Menus',
  // 'Nos tables',
  // 'Page Test'
  // goOnPage(leChoix:string){
  //   this.choice=null;
  //   if(leChoix=='La Carte'){
  //     this.choice='carte';
  //   }
  //   if(leChoix=='Nos Menus'){
  //     this.choice='menu';
  //   }
  //   if(leChoix=='Page Test'){
  //     this.choice='test';
  //   }
  //   if(this.choice){
  //     this.router.navigateByUrl(this.choice);
  //   }
  // if(leChoix=='Nos tables'){
  //   this.router.navigate(['myTable', 'Nos tables']);
  // }
  // }

  allerCommanderNon() {
    this.theMessage = "Veuillez d'abord vous connecter";
    this.theMessageService.setOption("theMessage", this.theMessage);
    this.theMessageService.setOption("categoryMessageNumber", 2);
  }


  getChoice(choix: number) {
    if (choix == 1) {
      this.router.navigateByUrl('mesCommandes');
    }
    if (choix == 2) {
      this.router.navigate(['profil', this.user.email]);
    }
    if (choix == 3) {
      this.logoutWithGoogle();
      this.theMessage = "vous avez été déconnecté";
      this.theMessageService.setOption("theMessage", this.theMessage);
      this.theMessageService.setOption("categoryMessageNumber", 2);
    }
  }

  allerTables() {
    //on reinitialise les messages
    this.theMessageService.setOption("theMessage", null);
    this.theMessageService.setOption("categoryMessageNumber", null);
    this.router.navigateByUrl('myTable');
  }
}
