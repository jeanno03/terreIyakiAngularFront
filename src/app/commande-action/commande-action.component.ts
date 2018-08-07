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
  hashOrderItem: Map<number, number>;

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

  //le choix du type de la commande
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

  //on choisi le type de la commande
  getOrderType(name: string) {

    this.commandeService.selectOrder(name, this.userFromAp.email)
      .subscribe(data => {
        //on créé la commande
        //on renvoi le message du type de commande choisi
        this.message = data;
        //on va rechercher la derniere commande
        //je dois chercher l id de l user puis je met l objet dans panier

        //si numero du message = 5 on renvoie vers home
        if (this.message.number == 5) {
          this.router.navigate(['homeMessage', this.message.theMessage]);
        }
        else if (this.message.number == 6) {
          this.router.navigate(['myTable', this.message.theMessage]);
        }

        //si numero du message = 6 on renvoie vers table pour choix

        this.commandeService.selectLastMyOrderByUser(this.userFromAp.id).subscribe(data => {
          this.lastOrder = data;
          this.panierService.setOption('theId', this.lastOrder.theId);
          this.panierService.setOption('theDate', this.lastOrder.orderDate);
          this.panierService.setOption('type', this.lastOrder.orderType.name);
          this.panierService.setOption('statut', this.lastOrder.statut.name);

        }, err => {
          console.log(err);
        })

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

  incrementeOrderItem(idProduct) {
    this.commandeService.incrementeOrderItem(idProduct, this.userFromAp.id)
      .subscribe(data => {
        this.message = data;
        //on doit rafraichir page

        //on récupère tous les orderItems de la derniere commade
        this.commandeService.returnOrderItemByOrder(this.panier.theId).subscribe(data => {
          this.returnOrderItem = data;
          //on récupère le montant total du panier
          this.retourVatpriceTotal = 0;
          for (this.i = 0; this.i < this.returnOrderItem.length; this.i++) {
            this.retourVatpriceTotal = this.retourVatpriceTotal + (this.returnOrderItem[this.i].vatPrice * this.returnOrderItem[this.i].quantite);
          }
          //on remet a jour le montant total du panier
          this.panierVatPriceService.setOption('vatPriceTotal', this.retourVatpriceTotal);
        }, err => {
          console.log(err);
        })
      }, err => {
        console.log(err);
      })
  }

  decrementeOrderItem(idProduct) {
    this.commandeService.decrementeOrderItem(idProduct, this.userFromAp.id)
      .subscribe(data => {
        this.message = data;
        //on doit rafraichir page

        //on récupère tous les orderItems de la derniere commade
        this.commandeService.returnOrderItemByOrder(this.panier.theId).subscribe(data => {
          this.returnOrderItem = data;
          //on récupère le montant total du panier
          this.retourVatpriceTotal = 0;
          for (this.i = 0; this.i < this.returnOrderItem.length; this.i++) {
            this.retourVatpriceTotal = this.retourVatpriceTotal + (this.returnOrderItem[this.i].vatPrice * this.returnOrderItem[this.i].quantite);
          }
          //on remet a jour le montant total du panier
          this.panierVatPriceService.setOption('vatPriceTotal', this.retourVatpriceTotal);
        }, err => {
          console.log(err);
        })
      }, err => {
        console.log(err);
      })
  }

  deleteOrderItem(idProduct) {
    this.commandeService.deleteOrderItem(idProduct, this.userFromAp.id)
    .subscribe(data => {
      this.message = data;
      //on doit rafraichir page

      //on récupère tous les orderItems de la derniere commade
      this.commandeService.returnOrderItemByOrder(this.panier.theId).subscribe(data => {
        this.returnOrderItem = data;
        //on récupère le montant total du panier
        this.retourVatpriceTotal = 0;
        for (this.i = 0; this.i < this.returnOrderItem.length; this.i++) {
          this.retourVatpriceTotal = this.retourVatpriceTotal + (this.returnOrderItem[this.i].vatPrice * this.returnOrderItem[this.i].quantite);
        }
        //on remet a jour le montant total du panier
        this.panierVatPriceService.setOption('vatPriceTotal', this.retourVatpriceTotal);
      }, err => {
        console.log(err);
      })
    }, err => {
      console.log(err);
    })

  }
}
