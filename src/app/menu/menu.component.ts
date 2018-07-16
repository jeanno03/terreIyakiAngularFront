import { CategoryModel } from '../../models/categoryModel';
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
  comboes: any; 
  combo: Combo; 
   id: number;
  comboCat: any; 
   comboCategory: any = null;
  products: any; 
  comboCategoryId: number;
  productList: Array<any> = [];
  category: Array<CategoryModel>; 
  i: number;
  categoryMother:any;
  parentComboCategoryId:any;
 categoryModel : CategoryModel;

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
//je reinitilise le choix des categories
this.category = [];
//je réinitiliase le choix des produits
this.products=null;

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
      this.parentComboCategoryId=null;
      this.category = [];
      this.comboCat.forEach((element) => {
        this.comboService.getComboCategoryById(element.theId).subscribe(data => {
          this.comboCategory = data;
          this.parentComboCategoryId = element.theId;
          this.categoryModel = new CategoryModel(this.comboCategory.category.name, this.comboCategory.category.theId, element.theId);
          this.category.push(this.categoryModel);
        })
      })
    }, err => {
      console.log(err);
    })
  }

  getProductsFromComboCat(id:number){
    console.log("id du cat : " + id);
    this.comboService.getProductsByComboCategoryId(id).subscribe(data => {
      this.products = data;
    }, err => {
      console.log(err);
    })
}
}