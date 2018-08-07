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

  constructor(
    public myTableService: MyTableService,
    public activatedRoute: ActivatedRoute,
    public userFromAppService: UserFromAppService,
    public commandeService: CommandeService,
    public router: Router
  ) {
    this.message = activatedRoute.snapshot.params['message'];
    console.log("message message message : " + this.message);
    this.userFromAp = userFromAppService.getFirebaseUser();
  }

  ngOnInit() {
    //je met mode = 1 ==> possibilité de choisir une table
    this.mode = 1;
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
            console.log("mode mode mode : " + this.mode);

        }, err => {
          console.log(err);
        })
    }, err => {
        console.log(err)
    })

  }

  //la table est déjà choisi ==> mess d erreur
  tableDejaChoisi() {
    this.errMessage = ("Vous avez déjà choisie la table n°" + this.tablePersiter + " ,veuillez choisir vos produits"))
    this.theMessage.theMessage = this.errMessage;
  }

}
