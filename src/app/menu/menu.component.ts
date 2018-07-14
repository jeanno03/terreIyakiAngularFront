import { ComboCategory } from '../../interfaces/combo-category';
import { Combo } from '../../interfaces/combo';
import { ComboService } from '../../services/combo.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { map } from 'rxjs-compat/operator/map';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  comboes: any; //oui
  combo: Combo; //oui
   id: number;//oui
  comboCat: any; //oui
   comboCategory: any = null;//oui
  products: any; //oui
  comboCategoryId: number;
  productList: Array<any> = [];//oui
  product: any = []; //oui
  category: any; //oui
  i: number;

  constructor(public comboService: ComboService) { }

  ngOnInit() {
    this.comboService.getComboProducts()
      .subscribe(data => {
        this.comboes = data;
      }, err => {
        console.log(err);
      })
  }

  getComboByName(name: string) {
    this.comboService.getComboByName(name).subscribe(data => {
      this.combo = data;
      this.id = this.combo.id;

    }, err => {
      console.log(err);
    })
  }

  getProductsByComboCategoryId(id: number) {
    this.comboService.getProductsByComboCategoryId(id).subscribe(data => {
      this.productList = data;
    }, err => {
      console.log(err);
    })
  }

  selectCombo(id:number){
    console.log("id du combo : " + id);
    this.comboService.getComboCategoryByComboId(id).subscribe(data => {
      this.comboCat = data;
      this.category = [];
      this.product = [];
      this.products = [];

      this.comboCat.forEach((element) => {

        this.comboService.getComboCategoryById(element.theId).subscribe(data => {
          this.comboCategory = data;
          this.category.push(this.comboCategory.category);

          this.comboService.getProductsByComboCategoryId(element.theId).subscribe(data => {
            this.products = data;

            for (this.i = 0; this.i < this.products.length; this.i++) {
              this.product.push(this.products[this.i]);
              console.log("produits de l arrayList : " + this.products[this.i].name);
            }
          })
        })
      })
    }, err => {
      console.log(err);
    })
    
  }

}