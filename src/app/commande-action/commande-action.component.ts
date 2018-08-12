import { LongClassModel } from './../../models/longClassModel';
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
  histo: any;
  orderItemsToErase: any;

  longClassModel: LongClassModel;
  arrayLongClassModel: Array<LongClassModel>;



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

    this.commandeService.selectOrder(name, this.userFromAp.email).
    finally(this.message).
      subscribe(data => {
        //on créé la commande
        //on renvoi le message du type de commande choisi
        this.message = data;

        //je met d'abord le panier a jour avant routage vers page table pour initialisation du mode
        this.commandeService.selectLastMyOrderByUser(this.userFromAp.id).subscribe(data => {
          this.lastOrder = data;
          this.panierService.setOption('theId', this.lastOrder.theId);
          this.panierService.setOption('theDate', this.lastOrder.orderDate);
          this.panierService.setOption('type', this.lastOrder.orderType.name);
          this.panierService.setOption('statut', this.lastOrder.statut.name);

          //puis je route en fonction de la demande
          //si numero du message = 5 on renvoie vers home
          if (this.message.number == 5) {
            this.router.navigate(['homeMessage', this.message.theMessage]);
          }
          //si numero du message = 6 on renvoie vers table pour choix
          else if (this.message.number == 6) {
            this.router.navigate(['myTable', this.message.theMessage]);
          }

        }, err => {
          console.log(err);
        })

        // console.log("test pour voiri si cest synchrone : "+ this.message.theMessage);

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

  deleteOrderItemCombo(idChose: number) {
    console.log("Numéro 0 idChose : " + idChose);
    //on récupère l'historisation à partir de l id de l orderItem du combo
    this.commandeService.getHistorisationFromOrderItem(idChose).subscribe(data => {
      this.histo = data;
      //historisation contient une liste de orderItem
      //on cherche l indice 0
      console.log("Numéro 1-1 ==> this.histo : " + this.histo);
      console.log("Numéro 1-2 ==> this.histo.theId : " + this.histo[0].theId);

      //puis on récupère tous les ordersItems à supprimer
      this.commandeService.getOrderItemsFromHistorisation(this.histo[0].theId).
        subscribe(data => {
          this.orderItemsToErase = data;
          console.log("Numéro 2 ids de la list de orderItem : " + this.orderItemsToErase[0].theId + " - " + this.orderItemsToErase[1].theId);
          //je créé l'array de LongClassModel de orderItemsToErase
          this.arrayLongClassModel = [];
          //je créé l'array de longClassModel

          this.orderItemsToErase.forEach(element => {
            this.longClassModel = new LongClassModel(element.theId)
            this.arrayLongClassModel.push(this.longClassModel);
            console.log("Numéro 3 foreach de longClassModel : " + this.longClassModel.getIdLong());
          });

          this.commandeService.deleteComboOrderItem(this.arrayLongClassModel).
            subscribe(data => {
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

        }, err => {
          console.log(err);
        })

    }, err => {
      console.log(err);
    })

  }


  confirmOrder(userId:number){
this.commandeService.confirmOrder(this.userFromAp.id).
finally(this.message).
subscribe(data=>{
  this.message=data;

  // on refraichit le panier et cette page

  this.panierService.setOption('theId', null);
  this.panierService.setOption('theDate', null);
  this.panierService.setOption('type', null);
  this.panierService.setOption('statut', null);
  this.panierService.setOption('myTable', null);
  this.panierVatPriceService.setOption('vatPriceTotal', null);
  this.retourVatpriceTotal=null;

this.returnOrderItem=null;
this.router.navigateByUrl('commandeAction');


}, err => {
  console.log(err);
})

    
  }


  deleteOrder(userId:number){
    this.commandeService.deleteOrder(this.userFromAp.id).
    finally(this.message).
    subscribe(data=>{
      this.message=data;
    
      // on refraichit le panier et cette page
    
      this.panierService.setOption('theId', null);
      this.panierService.setOption('theDate', null);
      this.panierService.setOption('type', null);
      this.panierService.setOption('statut', null);
      this.panierService.setOption('myTable', null);
      this.panierVatPriceService.setOption('vatPriceTotal', null);
      this.retourVatpriceTotal=null;
    
    this.returnOrderItem=null;
    this.router.navigateByUrl('commandeAction');
    
    
    }, err => {
      console.log(err);
    })
    
        
      }
}
