import { MyTableModel } from '../../models/myTableModel';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  myExemple01: any;
  myExemple02: any;
  myExemple03: any;
  myExemple04: any;
  MyExempleArray01: Array<any>;
  MyExempleArray02: Array<any>;

  myTableModelArray01: Array<MyTableModel>;
  myTableModelArray03: Array<MyTableModel>;

  string01: any;
  i: number;
  j: number;

  // tableNumber:number;
  // statut:string;
  // theId:any;

  constructor() { }

  ngOnInit() {
    this.myTableModelArray01 = [];

    this.myExemple01 = 9;
    this.myExemple02 = 1;
    this.myExemple03 = 2;
    this.myExemple04 = 5;

    this.MyExempleArray02 = this.createMyExempleArray(this.myExemple01,
      this.myExemple02,
      this.myExemple03,
      this.myExemple04, )

    console.log("this.MyExempleArray02.length : " + this.MyExempleArray02.length + " - It works!");


    this.myTableModelArray03 = this.createMyTableModelArray01(this.MyExempleArray02);
    console.log("this.myTableModelArray03.length : " + this.myTableModelArray03.length + " - It works!");

  }


  createMyExempleArray(myExemple01: any,
    myExemple02: any,
    myExemple03: any,
    myExemple04: any, ) {
    this.MyExempleArray01 = [];
    this.MyExempleArray01.push(myExemple01);
    this.MyExempleArray01.push(myExemple02);
    this.MyExempleArray01.push(myExemple03);
    this.MyExempleArray01.push(myExemple04);
    return this.MyExempleArray01;
  }

  createMyTableModelArray01(MyExempleArray02: Array<any>) {
    this.myTableModelArray01 = [];
    this.string01 = "actif";
    MyExempleArray02.forEach(element => {
      this.myTableModelArray01.push(element, this.string01, element);
    })
    return this.myTableModelArray01;
  }

  testComponent(){
    this.myTableModelArray01 = [];

    this.myExemple01 = 9;
    this.myExemple02 = 1;
    this.myExemple03 = 2;
    this.myExemple04 = 5;

    this.MyExempleArray02 = this.createMyExempleArray(this.myExemple01,
      this.myExemple02,
      this.myExemple03,
      this.myExemple04, )

    console.log("this.MyExempleArray02.length : " + this.MyExempleArray02.length + " - It works!");


    this.myTableModelArray03 = this.createMyTableModelArray01(this.MyExempleArray02);
    console.log("this.myTableModelArray03.length : " + this.myTableModelArray03.length + " - It works!");

  }

}
