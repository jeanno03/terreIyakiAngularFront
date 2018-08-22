import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../../services/commande.service';
import { UserFromAppService } from '../../services/user-from-app.service';

@Component({
  selector: 'app-mes-commandes',
  templateUrl: './mes-commandes.component.html',
  styleUrls: ['./mes-commandes.component.scss']
})
export class MesCommandesComponent implements OnInit {

  userFromAp: any;
  page: number;
  size: number;
  myOrders: any;
  order: any;
  myOrderVat: any;


  constructor(
    public commandeService: CommandeService,
    public userFromAppService: UserFromAppService
  ) {
    this.userFromAp = userFromAppService.getFirebaseUser();
  }

  //a l'initialisation je lance toutes les commandes de l'user
  ngOnInit() {
    this.getUserOrders();
  }

  getUserOrders() {
    this.page = 0;
    this.size = 5;
    this.commandeService.getListOrderByMyUserId(this.userFromAp.id, this.page, this.size = 5)
      .subscribe(data => {
        this.myOrders = data;


      }, err => {
        console.log(err);
      })
  }

  getOrderVatPrice(myOrderId: number) {
    this.myOrderVat = 0;
    this.commandeService.returnOrderItemByOrder(myOrderId)
      .subscribe(data => {
        this.order = data;
        this.order.forEach(element => {

          this.myOrderVat = this.myOrderVat + element.vatPrice;

        }, err => {
          console.log(err);
        })
      })

  }

}
