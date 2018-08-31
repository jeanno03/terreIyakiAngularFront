import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../../services/commande.service';
import { UserFromAppService } from '../../services/user-from-app.service';
import { MyOrderModelModify } from '../../models/myOrderModelModify';
import { TheMessageService } from '../../services/the-message.service';

@Component({
  selector: 'app-mes-commandes',
  templateUrl: './mes-commandes.component.html',
  styleUrls: ['./mes-commandes.component.scss']
})
export class MesCommandesComponent implements OnInit {

  userFromAp: any;

  myOrders: any;
  orderItems: any;
  myOrderVat: any;
  hashCommande: Map<number, any>;
  orderItemsDetail: any;
  orderItemsDetailChoose: any;

  maCommande:any;
  selectedDevice:any;
  // //test a faire
  // myOrdersModelModify: MyOrderModelModify;
  // myOrdersModelModifyList: Array<MyOrderModelModify>;

  // i: number;
  // j:number;
  // k:number;
  // table: any;


  constructor(
    public commandeService: CommandeService,
    public userFromAppService: UserFromAppService,
    public theMessageService:TheMessageService
  ) {
    this.userFromAp = userFromAppService.getFirebaseUser();
  }

  //a l'initialisation je lance toutes les commandes de l'user
  ngOnInit() {
    this.getUserOrders();
            //on reinitialise les messages
            this.theMessageService.setOption("theMessage", null);
            this.theMessageService.setOption("categoryMessageNumber", null);
  }

  getUserOrders() {
     this.commandeService.getListOrderByMyUserIdNoPagination(this.userFromAp.id)
      .subscribe(data => {
        this.myOrders = data;

        // this.myOrdersModelModifyList = [];

        // for (this.i = 0; this.i < this.myOrders.length; this.i++) {

        //   this.table = null;
        //   if (this.myOrders[this.i].myTable != null) {
        //     this.table = this.myOrders[this.i].myTable.tableNumber;
        //   }
        //   // console.log("date de la commande : " + this.myOrders[this.i].orderDate) ;
        //   // console.log("numéro de la commande : " + this.myOrders[this.i].theId) ;
        //   // console.log("table de la commande : " + this.table) ;
        //   // console.log("type de la commande : " + this.myOrders[this.i].orderType.name) ;
        //   // console.log("statut de la commande : " + this.myOrders[this.i].statut.name) ;

        //   this.myOrdersModelModify = new MyOrderModelModify(
        //     this.myOrders[this.i].orderDate,
        //     this.myOrders[this.i].theId,
        //     this.table,
        //     this.myOrders[this.i].orderType.name,
        //     this.myOrders[this.i].statut.name,
        //     0
        //   );

        //   this.myOrdersModelModifyList.push(this.myOrdersModelModify);

        // }

        // for (this.k = 0; this.k < this.myOrdersModelModifyList.length; this.k++) {
        //   console.log("n° commande : " + this.myOrdersModelModifyList[this.k].getTheId());
        //   this.commandeService.returnOrderItemByOrder(this.myOrdersModelModifyList[this.k].getTheId())
        //     .subscribe(data => {
        //       this.orderItems = data;
        //       this.myOrderVat = 0;


        //       for (this.j = 0; this.j < this.orderItems.length; this.j++) {
        //         this.myOrderVat = this.myOrderVat + this.orderItems[this.j].vatPrice;
        //         if ((this.j == (this.orderItems.length - 1))) {
        //           console.log("n° commande : " +this.k + " - nouveau montant : " + this.myOrderVat);
      
        //         }
        //       }


        //     }, err => {
        //       console.log(err);
        //     })

        // }

        this.hashCommande = new Map();

        //pour chaque commande ***********début **************************
        this.myOrders
          .forEach(element => {

            //A chaque commande je rempli la hashMap avec les orderItems détaillés
            this.commandeService.getOrderItemsByOrder(element.theId)
              .subscribe(data => {

                //contient l arrayList des orderItem de l order
                this.orderItemsDetail = data;

                //pour chaques list d orderItem je l ajoute a la HashMap
                if (this.orderItemsDetail) {
                  this.hashCommande.set(element.theId, this.orderItemsDetail);
                }


              }, err => {
                console.log(err);
              })

          });

      }, err => {
        console.log(err);
      })
  }


  getOrderVatPrice(myOrderId: number) {
    this.myOrderVat = 0;
    this.commandeService.returnOrderItemByOrder(myOrderId)
      .subscribe(data => {
        this.orderItems = data;
        this.orderItems.forEach(element => {

          this.myOrderVat = this.myOrderVat + element.vatPrice;

        }, err => {
          console.log(err);
        })
      })


  }

  //return la list de orderItems en fonction de la key de la hashMap
  getOrderItemsFromMap(id: number) {
    this.orderItemsDetailChoose = Array.from(this.hashCommande.get(id));
    console.log("myOrderId : "+ id);
    this.getTheOrder(id);
  }
  
  //récupère les ordersItems détaillé de la commande en fonction de l'id commande
  // getOrderItemsByOrder(myOrderId: number) {

  //   this.commandeService.getOrderItemsByOrder(myOrderId)
  //     .subscribe(data => {
  //       this.orderItemsDetail = data;
        
  //     }, err => {
  //       console.log(err);
  //     })
  // }

  //parcours de larrayList pour ne récupérer que certains éléments
  getTheOrder(id: number){
    
    this.myOrders.forEach(element => {
      if(element.theId==id){
       this.maCommande=element;
       
      }
    });
  }


}
