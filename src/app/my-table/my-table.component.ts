import { PanierService } from './../../services/panier.service';
import { CommandeService } from './../../services/commande.service';
import { UserFromAppService } from './../../services/user-from-app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MyTableModel } from '../../models/myTableModel';
import { MyTableService } from '../../services/my-table.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs-compat/operator/map';
import { Observable } from 'rxjs/Observable';


import 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.scss']
})
export class MyTableComponent implements OnInit {

  myTables: any;
  message: any
  userFromAp: any = null;
  theMessage: any;
  mode: number;
  errMessage: string;
  tablePersiter: number;
  panier: any;


  constructor(
    public myTableService: MyTableService,
    public activatedRoute: ActivatedRoute,
    public userFromAppService: UserFromAppService,
    public commandeService: CommandeService,
    public router: Router,
    public panierService: PanierService
  ) {
    this.message = activatedRoute.snapshot.params['message'];
    this.userFromAp = userFromAppService.getFirebaseUser();
    {
      this.panier = panierService.getPanier();

    }



  }

  ngOnInit() {
    //je met mode = 1 ==> possibilité de choisir une table
    this.mode = 1;
    // je met les conditions pour autoriser l user a ouvrir table ou non
    if (this.panier.myTable != null) {
      console.log("table non null ***** table non null *****");
      this.mode = 2;
      console.log("this.mode ***** this.mode ***** :" + this.mode);
    }
    else {
      this.mode = 1;
    }
    //je récupère tous les n° de tables déjà trié par springBoot (asc)
    this.myTableService.getAllTables()
      .subscribe(data => {
        this.myTables = data;
        // this.myTableList = this.getAllTableStatut(this.myTables);

      }, err => {
        console.log(err);
      })

  }

  //la table est sélectionné je l'ajoute a la commande
  tableChoisi(tableId: number) {

    this.commandeService.chooseTable(tableId, this.userFromAp.id)

      .subscribe(data => {
        this.theMessage = data;
        this.message = null;
        //on récupère l id de la table
        this.tablePersiter = tableId;
        //on doit rafraichir la page
        this.myTableService.getAllTables()
          .subscribe(data => {
            this.myTables = data;
            //une fois la table choisi ==> impossibilité de choisir une table
            this.mode = 2;
            //
            this.panierService.setOption('myTable', tableId);
          }, err => {
            console.log(err);
          })
      }, err => {
        console.log(err)
      })

  }

  //la table est déjà choisi ==> mess d erreur
  tableDejaChoisi() {
    // this.errMessage = ("Vous avez déjà choisie une table");
    // this.theMessage.theMessage =[];
    // this.theMessage.theMessage = this.errMessage;
    this.theMessage = null;
    this.message = ("Vous avez déjà choisie une table");
  }

}
