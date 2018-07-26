import { Product } from '../../interfaces/product';

import { ProductService } from '../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../interfaces/category';

import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';



@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent implements OnInit {

  categories: Array<any>;
  products: Array<Product>;
  productsReturn : Array<Product>;
  category: Category=null;
  products2: any;
  id:number=0;
  currentPage:string;
 
  product: Product;


  constructor(public productService: ProductService) { }

  ngOnInit() {
    this.productService.findAllCategories()
      .subscribe(data => {
        this.categories = data;
      }, err => {
        console.log(err);
      })
  }

  getPlatsByCategory(name: string){
    this.currentPage=name;
  this.getCategoryByName(name);
  }

  getCategoryByName(name: string){
//je réinitilialise le produit a chaque clik
this.product=null;

    this.productService.getCategoryByName(name).subscribe(data => {
    this.category=data;
    this.id= this.category[0].id;
    this.productsReturn = this.getProductsById(this.id);

    }, err => {
      console.log(err);
    })
    return this.id;
  }

  getProductsById(id: number) {
    this.productService.findProductById(id)
      .subscribe(data => {
        this.products = data;
  })
return this.products;
}


selectProduct(theId:number){
this.product=null;
  this.products.forEach(element=>{
    if(element.theId==theId){
      this.product=element;
    }
  })

return this.product;
  
}



}