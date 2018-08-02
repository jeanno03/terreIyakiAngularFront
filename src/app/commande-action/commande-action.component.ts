import { Router, ActivatedRoute } from '@angular/router';
import { CommandeService } from '../../services/commande.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commande-action',
  templateUrl: './commande-action.component.html',
  styleUrls: ['./commande-action.component.scss']
})
export class CommandeActionComponent implements OnInit {

  orderType:any;
  orderTypeChoice:any;
  message:any=null;

//propriété provenant du composant mere
  email: string;
  userId:number;

  myUserOrders:Array<any>;

  constructor(
    public commandeService: CommandeService, 
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    this.email = activatedRoute.snapshot.params['email'];
    this.userId = activatedRoute.snapshot.params['userId'];
   }

  ngOnInit() {
    this.chooseOrderType();
    this.getMyOrderByMyUser();
  }

  chooseOrderType() {
    this.commandeService.getAllOrderType()
    .subscribe(data=>{
      this.orderType=data;
    }, err => {
      console.log(err);
    })
  }


  enCours(){

  }

  getOrderType(name:string){
    this.commandeService.selectOrder(name,this.email)
    .subscribe(data=>{
      this.message=data;
      this.router.navigate(['homeMessage',this.message.theMessage]);
    }, err => {
      console.log(err);
    })

  }

  //on va rechercher toutes les commande de l'user pour ne garder que la derniere
  getMyOrderByMyUser(){
this.commandeService.getMyOrdersByMyUser(this.userId).subscribe(data => {
  this.myUserOrders=data;
}, err => {
  console.log(err);
})
  }



}
