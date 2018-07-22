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

  // //HashMap qui va contenir les produits qu'on pourra reselectionner
  // productMap: Map<number, Product>;
  // productMapReturn : Map<number, Product>;
 
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
    // this.productMapReturn = this.insertProductsInHashMap(this.productsReturn);
    // console.log("this.productMapReturn.get(0).name : " + this.productMapReturn.get(0).name);

    }, err => {
      console.log(err);
    })
    return this.id;
  }

  getProductsById(id: number) {
    this.productService.findProductById(id)
      .subscribe(data => {
        this.products = data;
        console.log("this.products[0].name : "+this.products[0].name)
  })
return this.products;
}

// insertProductsInHashMap(products:Array<Product>){
//       //je met les produits dans la hashmap
//       this.productMap = new Map();
//       products.forEach(element=>{
//         this.productMap.set(element.theId, element)
//         console.log("element.name : "+element.name );
//       })
//       console.log("bonjour : ") ;
//     //   console.log("this.productMap.get(1): "+this.productMap.get(1)) ;
//     //  console.log("this.productMap.get(1).name : "+this.productMap.get(1).name) ;
// return this.productMap;
// }

//récupère le produit de la hashmap
// selectProductFromHashMap(theId:number){
// this.productMapReturn.get(theId);
//   return this.productMapReturn.get(theId);
// }

selectProduct(theId:number){
  // this.product= this.selectProductFromHashMap(theId);
  console.log("theId : "+theId);
this.product=null;
  this.products.forEach(element=>{
    if(element.theId==theId){
      this.product=element;
      console.log("product find : " + this.product.name);
    }
  })

return this.product;
  
}
//abandon de la hashMap
//parcours de l array pour obtenir produit?


}