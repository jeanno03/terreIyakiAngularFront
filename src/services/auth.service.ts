import { PanierVatPriceService } from './panier-vat-price.service';
import { PanierService } from './panier.service';
import { CommandeService } from './commande.service';
import { ProfilService } from './profil.service';
import { UserFromAppService } from './user-from-app.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState: Observable<firebase.User>
  private currentUser: firebase.User = null;
  private userFromAp: any = null;
  private lastOrder: any = null;
  private returnOrderItem: Array<any> = null;
  private retourVatpriceTotal: number;
  private i: number;

  constructor(
    public afAuth: AngularFireAuth,
    public profilService: ProfilService,
    public userfromAppService: UserFromAppService,
    public commandeService: CommandeService,
    public panierService: PanierService,
    public panierVatPriceService: PanierVatPriceService
  ) {
    this.authState = this.afAuth.authState;
    this.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;

        // window.alert("bienvenue " + this.currentUser.displayName);
        this.profilService.getUserByEmail(this.currentUser.email).subscribe(data => {

          //on initialise tous les objets partagés
          this.userfromAppService.setOption("id", null);
          this.userfromAppService.setOption("email", null);
          this.userfromAppService.setOption("login", null);
          this.userfromAppService.setOption("firstName", null);
          this.userfromAppService.setOption("lastName", null);
          this.panierService.setOption('theId', null);
          this.panierService.setOption('theDate', null);
          this.panierService.setOption('type', null);
          this.panierService.setOption('statut', null);
          this.panierService.setOption('myTable', null);
          this.panierVatPriceService.setOption('vatPriceTotal', null);

          this.userFromAp = null;
          this.userFromAp = data;

          //on renvoie les donnees de l'user vers userfromAppService pour partage
          if (this.userFromAp != null) {
            userfromAppService.setOption("id", this.userFromAp.id);
            userfromAppService.setOption("email", this.userFromAp.email);
            userfromAppService.setOption("login", this.userFromAp.login);
            userfromAppService.setOption("firstName", this.userFromAp.firstName);
            userfromAppService.setOption("lastName", this.userFromAp.lastName);

            //on va chercher le dernier panier commande en cours s'il existe
            //et on le partage s'il existe
            this.commandeService.selectLastMyOrderByUser(this.userFromAp.id).subscribe(data => {

              
              this.lastOrder = null;
              this.lastOrder = data;
              if (this.lastOrder != null) {
                this.panierService.setOption('theId', this.lastOrder.theId);
                this.panierService.setOption('theDate', this.lastOrder.orderDate);
                this.panierService.setOption('type', this.lastOrder.orderType.name);
                this.panierService.setOption('statut', this.lastOrder.statut.name);
                //si table existe je l'envo pour partage
                if (this.lastOrder.myTable != null) {
                  this.panierService.setOption('myTable', this.lastOrder.myTable.tableNumber);
                }

                //on va récupérer toutes les orderItem de la commande
                //on va les envoyer à panierItemService
                this.commandeService.returnOrderItemByOrder(this.lastOrder.theId).subscribe(data => {
                  this.returnOrderItem = data;
                  //on doit trouver le montant total de vatPrice de la list returnOrderItem
                  this.retourVatpriceTotal = 0;
                  for (this.i = 0; this.i < this.returnOrderItem.length; this.i++) {
                    this.retourVatpriceTotal = this.retourVatpriceTotal + (this.returnOrderItem[this.i].vatPrice * this.returnOrderItem[this.i].quantite);
                  }
                  this.panierVatPriceService.setOption('vatPriceTotal', this.retourVatpriceTotal);

                }, err => {
                  console.log(err);
                })

              }

            }, err => {
              console.log(err);
            })
          }
        }, err => {
          console.log(err);
        })

      } else {
        this.currentUser = null;
      }
    });
  }

  getAuthState() {
    return this.authState;
  }

  loginWithGoogle() {
    return this.afAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider());
  }

  logoutWithGoogle() {
    return this.afAuth.auth.signOut();
  }

}
