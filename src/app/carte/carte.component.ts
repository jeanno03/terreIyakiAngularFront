import { CommandeService } from './../../services/commande.service';
import { PanierService } from './../../services/panier.service';
import { Router } from '@angular/router';
// import { Product } from '../../interfaces/product';

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
  products: Array<any>;
  productsReturn: Array<any>;
  category: Category = null;
  products2: any;
  id: number = 0;
  currentPage: string;
  product: any;
  panier: any;
  commentAchat: string = "produit ajouté";
  orderItem: any;
  message: any;

  constructor(
    public productService: ProductService,
    public router: Router,
    public panierService: PanierService,
    public commandeService: CommandeService
  ) {
    this.panier = panierService.getPanier();
  }

  ngOnInit() {
    this.productService.findAllCategories()
      .subscribe(data => {
        this.categories = data;
      }, err => {
        console.log(err);
      })
  }

  getPlatsByCategory(name: string) {
    this.currentPage = name;
    this.getCategoryByName(name);
  }

  getCategoryByName(name: string) {
    //je réinitilialise le produit a chaque clik
    this.product = null;

    this.productService.getCategoryByName(name).subscribe(data => {
      this.category = data;
      this.id = this.category[0].id;
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

  //this.product est la key les infos vont servir pour etre enregistrer a orderItem
  selectProduct(theId: number) {
    this.product = null;
    this.products.forEach(element => {
      if (element.theId == theId) {
        //****************************key*************
        this.product = element;
        //cette méthode fonctionne ne sera plus utilisé car pas adapté
        // this.newOrderItem(this.product.price, this.product.tax, this.commentAchat);

        //pour le test j'ai mit userId = 1
        this.createOrderItem(this.product.theId, 1);

        //****************************key*************
      }
    })

    return this.product;

  }

  productTheIdOnCommande(theId: number) {
    this.router.navigate(['commande', theId]);
  }

  test() {

  }

  newOrderItem(price: number, tax: number, comment: string) {
    this.commandeService.newOrderItem(price, tax, comment).subscribe(data => {
      alert("produit choisi");
      this.orderItem = data;
    }, err => {
      console.log(err);
    })
  }


  createOrderItem(productId: number, userId: number) {

    this.commandeService.createOrderItem(productId, userId).subscribe(data => {
      alert("produit choisi");
      this.message = data;
    }, err => {
      console.log(err);
    })
  }

}