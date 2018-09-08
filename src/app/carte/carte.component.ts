import { PanierVatPriceService } from '../../services/panier-vat-price.service';
import { CommandeService } from '../../services/commande.service';
import { PanierService } from '../../services/panier.service';
import { Router } from '@angular/router';
// import { Product } from '../../interfaces/product';

import { ProductService } from '../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../interfaces/category';

import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';
import 'rxjs/add/operator/mergeMap';
import { UserFromAppService } from '../../services/user-from-app.service';
import { TheMessageService } from '../../services/the-message.service';
import { CarteProductService } from '../../services/carte-product.service';


//vatPrice calulé dans app et commande action
//a l'initialisation
//calul a supprimer ici

@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent implements OnInit {

  userFromAp: any;
  categories: Array<any>;
  products: Array<any>;
  productsReturn: Array<any>;
  category: any;
  products2: any;
  id: number = 0;
  currentPage: string;
  product: any;
  panier: any;
  commentAchat: string = "produit ajouté";
  orderItem: any;
  message: any;
  returnOrderItem: Array<any>;
  i: number;
  retourVatpriceTotal: number;
  theMessage:any;
  carteProduct:any;

  constructor(
    public productService: ProductService,
    public router: Router,
    public panierService: PanierService,
    public commandeService: CommandeService,
    public panierVatPriceService: PanierVatPriceService,
    public userFromAppService: UserFromAppService,
    public theMessageService:TheMessageService,
    public carteProductService : CarteProductService
  ) {
    this.panier = panierService.getPanier();
    this.userFromAp = userFromAppService.getFirebaseUser();
  }

  ngOnInit() {

    //on reinitialise les messages
    this.theMessageService.setOption("theMessage", null);
    this.theMessageService.setOption("categoryMessageNumber", null);

    this.message=null;
    this.productService.findAllCategories()
      .subscribe(data => {
        this.categories = data;

        this.carteProduct=this.carteProductService.getCarteElement();

        if(this.carteProduct.name!=null){
          
          this.getPlatsByCategory(this.carteProduct.name);
        }

        else {
          this.carteProductService.setOption("name","Plats");
          this.categories.forEach(element => {
            if(element.name=="Plats"){
              this.id=element.theId;
            }
          });
          this.getPlatsByCategory("Plats");
         } ;

      }, err => {
        console.log(err);
      })

  }

  getPlatsByCategory(name: string) {

    //on reinitialise les messages
    this.theMessageService.setOption("theMessage", null);
    this.theMessageService.setOption("categoryMessageNumber", null);
    this.theMessage=null;

    this.carteProductService.setOption("name",name);
    console.log("je choisi litem :" +name);
    // this.carteProduct=this.carteProductService.getCarteElement();

    this.message=null;
    this.currentPage = name;
    this.getCategoryByName(name);
  }

  getCategoryByName(name: string) {
    this.message=null;
    //je réinitilialise le produit a chaque clik
    this.product = null;

    this.productService.getCategoryByName(name).subscribe(data => {
      this.category = data;
      this.id = this.category.theId;
      this.productsReturn = this.getProductsById(this.id);
    }, err => {
      console.log(err);
    })
    return this.id;
  }

  getProductsById(id: number) {
    this.message=null;
    this.productService.findProductById(id)
      .subscribe(data => {
        this.products = data;
      }, err => {
        console.log(err);
      })
    return this.products;
  }

  //this.product est la key ==> les infos vont servir pour etre enregistrer a orderItem
  selectProduct(theId: number) {
    this.message=null;
    this.product = null;
    this.products.forEach(element => {
      if (element.theId == theId) {

        this.product = element;
        //cette méthode fonctionne ne sera plus utilisé car pas adapté
        // this.newOrderItem(this.product.price, this.product.tax, this.commentAchat);


        //on ajoute le produit a order item qu'on ajoute a myOrder
        this.createOrderItem(this.product.theId, this.userFromAp.id);


      }
    }, err => {
      console.log(err);
    })
    return this.product;
  }

  // productTheIdOnCommande(theId: number) {
  //   this.router.navigate(['commande', theId]);
  // }

  test() {
  }

  newOrderItem(price: number, tax: number, comment: string) {
    this.message=null;
    this.commandeService.newOrderItem(price, tax, comment).subscribe(data => {
      // alert("produit choisi");
      this.orderItem = data;
    }, err => {
      console.log(err);
    })
  }


  createOrderItem(productId: number, userId: number) {
    this.message=null;
    this.commandeService.createOrderItem(productId, userId).subscribe(data => {
      // alert("produit choisi");
      this.message = data;

      // this.theMessageService.setOption("theMessage", null);
      // this.theMessageService.setOption("categoryMessageNumber", null);
      // this.theMessage = this.theMessageService.getTheMessage();
      // this.router.navigateByUrl('carte');



      if(this.theMessage==null){
        this.theMessageService.setOption("theMessage", this.message.theMessage);
        this.theMessageService.setOption("categoryMessageNumber", this.message.categoryMessage.number);
        this.theMessage = this.theMessageService.getTheMessage();
      }



      if(this.theMessage!=null){

        if(this.theMessage.theMessage=="Produit ajouté au panier!"){
          this.theMessageService.setOption("theMessage", "Autre produit ajouté au panier!!!!!");
          this.theMessageService.setOption("categoryMessageNumber", 1);
          this.theMessage = this.theMessageService.getTheMessage();
          // this.router.navigateByUrl('carte');
        }
        else if(this.theMessage.theMessage=="Autre produit ajouté au panier!!!!!"){
          this.theMessageService.setOption("theMessage", "Produit ajouté au panier!");
          this.theMessageService.setOption("categoryMessageNumber", 1);
          this.theMessage = this.theMessageService.getTheMessage();
          // this.router.navigateByUrl('carte');
        }
    
      }



      //bloc qui va calculer mt panier en fonction de tous les orderItem de la commande
      {
        //panier.theId ==> id de la commande 
        //on va récupérer toutes les orderItem de la commande
        //on va les envoyer à panierItemService
        this.commandeService.returnOrderItemByOrder(this.panier.theId).subscribe(data => {
          this.returnOrderItem = data;
          //on doit trouver le montant total de vatPrice de la list returnOrderItem
          this.retourVatpriceTotal = 0;
          for (this.i = 0; this.i < this.returnOrderItem.length; this.i++) {
            this.retourVatpriceTotal = this.retourVatpriceTotal + (this.returnOrderItem[this.i].vatPrice * this.returnOrderItem[this.i].quantite);
          }
          this.panierVatPriceService.setOption('vatPriceTotal', this.retourVatpriceTotal);
        }, err => {
          console.log(err);
        })

      }

      //on rafraichit la page pour MAJ du mt du panier
      this.router.navigateByUrl('carte');
    }, err => {
      console.log(err);
    })
  }

  veuillezCommander() {
    // this.message = null;
    // this.router.navigate(['homeMessage', 'Veuillez ouvrir une commande']);
    // this.theMessage=this.theMessageService.getTheMessage();

  if(this.theMessage!=null){

    if(this.theMessage.theMessage=="Merci d'ouvrir une commande"){
      this.theMessageService.setOption("theMessage", "Veuillez ouvrir une commande SVP!!!!!");
      this.theMessageService.setOption("categoryMessageNumber", 2);
      this.theMessage = this.theMessageService.getTheMessage();
      this.router.navigateByUrl('carte');
    }
    else if(this.theMessage.theMessage=="Veuillez ouvrir une commande SVP!!!!!"){
      this.theMessageService.setOption("theMessage", "Merci d'ouvrir une commande");
      this.theMessageService.setOption("categoryMessageNumber", 2);
      this.theMessage = this.theMessageService.getTheMessage();
      this.router.navigateByUrl('carte');
    }

  }
  if(this.theMessage==null){
    this.theMessageService.setOption("theMessage", "Merci d'ouvrir une commande");
    this.theMessageService.setOption("categoryMessageNumber", 2);
    this.theMessage = this.theMessageService.getTheMessage();
    this.router.navigateByUrl('carte');
  }

    
    
  
  }

}
