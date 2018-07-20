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
  //myTable:any;
  statut: any;
  myTableModel: MyTableModel;
  myTableList: Array<MyTableModel>;
  myTableListProvisoire: Array<MyTableModel>;
  i: number;
  j: number;
  myTableModelProvisoire: MyTableModel = null;

  constructor(public myTableService: MyTableService) { }

  ngOnInit() {
    //je récupère tous les n° de tables
    this.myTableService.getAllTables()
      .subscribe(data => {
        this.myTables = data;
        this.myTableList = this.getAllTableStatut(this.myTables);
  //      console.log("this.myTableList.length : " + this.myTableList.length);
      }, err => {
        console.log(err);
      })

  }


  getAllTableStatut(myTables: any) {
    this.myTableListProvisoire = [];


    myTables.forEach(element => {
      //  en fonction de l'id de la table je récupère son statut
      this.myTableService.getTableStatut(element.theId)
        .subscribe(data => {
          this.statut = data;
          this.myTableModel = new MyTableModel(element.tableNumber, this.statut.name, element.theId);
          this.myTableListProvisoire.push(this.myTableModel);

          //faire un tri croissant en fonction du numéro de table
          //1ere boucle si n<n+1 ne rien faire si n>n+1 alors on permut
          //2eme boucle tant que n>n+1 au moin une fois on recommande 1ere boucle
          //Cet algo ne correspond pas a celle annoncé et consomme de la ressource
          //Elle permet de réaliser le trie et reste provisoire
          for (this.j = 0; this.j < 2; this.j++) {

            for (this.i = 0; this.i < this.myTableListProvisoire.length - 1; this.i++) {

              if (this.myTableListProvisoire[this.i].tableNumber > this.myTableListProvisoire[(this.i + 1)].tableNumber) {

                this.myTableModelProvisoire = this.myTableListProvisoire[this.i];
                this.myTableListProvisoire[this.i] = this.myTableListProvisoire[(this.i + 1)];
                this.myTableListProvisoire[(this.i + 1)] = this.myTableModelProvisoire;
              }

            }
          }
        }, err => {
          console.log(err);
        })

    }, err => {
      console.log(err);
    })

    return this.myTableListProvisoire;
  }

}
