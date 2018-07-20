import { MyTableModel } from '../../models/myTableModel';
import { MyTableService } from '../../services/my-table.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs-compat/operator/map';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.scss']
})
export class MyTableComponent implements OnInit {

  myTables: any;
  statut: any;
  myTableModel: MyTableModel;
  myTableList: Array<MyTableModel>;
  myTableListProvisoire: Array<MyTableModel>;
  i: number;
  myTableModelProvisoire: MyTableModel = null;

  constructor(public myTableService: MyTableService) { }

  ngOnInit() {
    //je récupère tous les n° de tables
    this.myTableService.getAllTables()
      .subscribe(data => {
        this.myTables = data;
        this.myTableList = this.getAllTableStatut(this.myTables);
        console.log("this.myTableList.length : " + this.myTableList.length);
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

//faire un tri croissant en fonction du numéro de table avant le retour
//boucle while bolean tant que n>n+1 est true
//2eme boucle si n<n+1 ne rien faire si n>n+1 alors on permut
console.log("this.myTableListProvisoire.length in for each : " + this.myTableListProvisoire.length);
  
for (this.i = 0; this.i < this.myTableListProvisoire.length-1; this.i++) {

    if (this.myTableListProvisoire[this.i].tableNumber > this.myTableListProvisoire[(this.i + 1)].tableNumber) {
  
      this.myTableModelProvisoire = this.myTableListProvisoire[this.i];
      this.myTableListProvisoire[this.i] = this.myTableListProvisoire[(this.i + 1)];
      this.myTableListProvisoire[(this.i + 1)] = this.myTableModelProvisoire;
    }
  
  }

}, err => {
  console.log(err);
})

}, err => {
console.log(err);
})
console.log("this.myTableListProvisoire.length : " + this.myTableListProvisoire.length);
return this.myTableListProvisoire;
}

}
