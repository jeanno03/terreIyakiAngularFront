import { PanierVatPriceService } from './../../services/panier-vat-price.service';
import { UserFromAppService } from './../../services/user-from-app.service';
import { PanierService } from '../../services/panier.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommandeService } from '../../services/commande.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commande-action',
  templateUrl: './commande-action.component.html',
  styleUrls: ['./commande-action.component.scss']
})
export class CommandeActionComponent implements OnInit {

  userFromAp: any;

  orderType: any;
  orderTypeChoice: any;
  message: any = null;

  //objet quon va envoyer au panier.service
  lastOrder: any;

  myUserOrder: any;
  panier: any = null;
  returnOrderItem: Array<any>;
  retourVatpriceTotal: number;
  i: number;
  hashOrderItem:Map<number, number>;

  constructor(
    public commandeService: CommandeService,
    public router: Router,
    public panierService: PanierService,
    public userFromAppService: UserFromAppService,
    public panierVatPriceService: PanierVatPriceService
  ) {
    this.userFromAp = userFromAppService.getFirebaseUser();
    this.panier = panierService.getPanier();

    //on récupère tous les orderItems de la derniere commade
    this.commandeService.returnOrderItemByOrder(this.panier.theId).subscribe(data => {
      this.returnOrderItem = data;
      //on récupère le montant total du panier
      this.retourVatpriceTotal = 0;
      for (this.i = 0; this.i < this.returnOrderItem.length; this.i++) {
        this.retourVatpriceTotal = this.retourVatpriceTotal + (this.returnOrderItem[this.i].vatPrice * this.returnOrderItem[this.i].quantite);
      }

    }, err => {
      console.log(err);
    })

  }

  ngOnInit() {
    this.chooseOrderType();
    // this.getMyOrderByMyUser();
  }

  chooseOrderType() {
    this.commandeService.getAllOrderType()
      .subscribe(data => {
        this.orderType = data;
      }, err => {
        console.log(err);
      })
  }


  enCours() {
  }

  getOrderType(name: string) {

    this.commandeService.selectOrder(name, this.userFromAp.email)
      .subscribe(data => {
        this.message = data;
        //on va rechercher la derniere commande
        //je dois chercher l id de l user puis je met l objet dans panier
        this.selectLastMyOrderByUser();
        this.router.navigate(['homeMessage', this.message.theMessage]);
      }, err => {
        console.log(err);
      })

  }

  //on va rechercher toutes les commandes de l user
  //pas utilisé
  getMyOrderByMyUser() {
    this.commandeService.getMyOrdersByMyUser(this.userFromAp.id).subscribe(data => {
      this.myUserOrder = data;
    }, err => {
      console.log(err);
    })
  }


  //on va rechercher la derniere commande de l user
  //on la met dans le panier.service pour partage
  selectLastMyOrderByUser() {
    this.commandeService.selectLastMyOrderByUser(this.userFromAp.id).subscribe(data => {
      this.lastOrder = data;
      this.panierService.setOption('theId', this.lastOrder.theId);
      this.panierService.setOption('theDate', this.lastOrder.orderDate);
      this.panierService.setOption('type', this.lastOrder.orderType.name);
      this.panierService.setOption('statut', this.lastOrder.statut.name);
    }, err => {
      console.log(err);
    })

  }

}
