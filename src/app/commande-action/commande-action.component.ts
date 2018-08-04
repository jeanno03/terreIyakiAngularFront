import { PanierService } from './../../services/panier.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommandeService } from '../../services/commande.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commande-action',
  templateUrl: './commande-action.component.html',
  styleUrls: ['./commande-action.component.scss']
})
export class CommandeActionComponent implements OnInit {

  //test
  public size: number;
  public square: number;

  orderType: any;
  orderTypeChoice: any;
  message: any = null;

  //propriété provenant du composant mere
  email: string;
  userId: number;

  //objet quon va envoyer au panier.service
  lastOrder: any;


  myUserOrder: any;

  constructor(
    public commandeService: CommandeService,
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public panierService: PanierService
  ) {
    this.email = activatedRoute.snapshot.params['email'];
    this.userId = activatedRoute.snapshot.params['userId'];

    //test
    // this.size = 16;
    // this.square = Math.sqrt(this.size);

    // Here I call the service to put my data ==> test
    // panierService.setOption('size', this.size);
    // panierService.setOption('square', this.square);
  }

  ngOnInit() {
    this.chooseOrderType();
    this.getMyOrderByMyUser();
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



    this.commandeService.selectOrder(name, this.email)
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
  getMyOrderByMyUser() {
    this.commandeService.getMyOrdersByMyUser(this.userId).subscribe(data => {
      this.myUserOrder = data;
    }, err => {
      console.log(err);
    })
  }


  //on va rechercher la derniere commande de l user
  //on la met dans le panier.service pour la transferer vers d autre ts
  selectLastMyOrderByUser() {
    this.commandeService.selectLastMyOrderByUser(this.userId).subscribe(data => {
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
