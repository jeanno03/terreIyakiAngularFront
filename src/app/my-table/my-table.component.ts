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

  myTables:any;
  statut:any;
  myTableModel: MyTableModel;
  myTableList:any;

  constructor(public myTableService : MyTableService) { }

  ngOnInit() {
    //je récupère tous les n° de tables
    this.myTableService.getAllTables()
    .subscribe(data => {
      this.myTables = data;
      this.myTableList=[];

      this.myTables.forEach(element => {
       this.myTableService.getTableStatut(1)
       .subscribe(data => {
         this.statut = data;
     //  en fonction de l'id de la table je récupère son statut
       this.myTableService.getTableStatut(element.theId)
       .subscribe(data => {
         this.statut = data;
         this.myTableModel = new MyTableModel(element.tableNumber, this.statut.name, element.theId);
         this.myTableList.push(this.myTableModel);
         
       },err => {
         console.log(err);
       })

    },err => {
      console.log(err);
    })
       
      }, err => {
        console.log(err);
      })

    }, err => {
      console.log(err);
    })
  }

}
