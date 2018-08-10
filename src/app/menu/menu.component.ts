import { PanierService } from './../../services/panier.service';
// menu.component.ts


import { Router } from '@angular/router';
import { PanierVatPriceService } from './../../services/panier-vat-price.service';
import { CommandeService } from './../../services/commande.service';
import { LongClassModel } from './../../models/longClassModel';
import { UserFromAppService } from './../../services/user-from-app.service';
import { ProductService } from './../../services/product.service';
import { CategoryModel } from '../../models/categoryModel';
import { Combo } from '../../interfaces/combo';
import { ComboService } from '../../services/combo.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { map } from 'rxjs-compat/operator/map';

//vatPrice calulé dans app et commande action
//a l'initialisation
//calul a supprimer ici

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
  // products: any;
  comboCategoryId: number;
  productList: Array<any> = [];
  category: Array<CategoryModel>;
  i: number;
  j: number;
  categoryMother: any;
  parentComboCategoryId: any;
  categoryModel: CategoryModel;
  categoryModelProvisoire: CategoryModel;
  //HashMap qui va contenir les produits qu'on pourra reselectionner
  productMap: Map<number, Array<Product>>;
  //conversion de la HashMap en ArrayList pour l'affichage
  productsMap: any;
  currentPage: string;

  currentCat: number;

  //le produit que l'user va choisir
  productChoose: any;
  //va comporter le menu avant valiation commande
  hashMenu: Map<number, any>;
  menuAValider: number;
  ProductDeHashMenu: any;
  arrayDeHashMenu: Array<any>;
  arrayLongClassModel: Array<LongClassModel>;
  longClassModel: LongClassModel;
  userFromAp: any;

  message: any;

  panier: any;
  returnOrderItem: any;
  retourVatpriceTotal: number;

  constructor(
    public comboService: ComboService,
    public router: Router,
    public userFromAppService: UserFromAppService,
    public commandeService: CommandeService,
    public panierVatPriceService: PanierVatPriceService,
    public panierService: PanierService
  ) {
    this.userFromAp = userFromAppService.getFirebaseUser();
    this.panier = panierService.getPanier();
  }

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
    this.category = null;
    //je réinitiliase le choix des produits
    this.productsMap = null;
    //je réinitialise le produit choisi
    this.productChoose = null
    //je réinitiliase l'arrayList de la map
    this.arrayDeHashMenu = null;
    //je reinitiliase les boutons enfoncés

    this.currentCat = null;
    //je reinitialise le produit choisi
    this.productChoose = null;

    this.currentPage = name;

    this.comboService.getComboByName(name).subscribe(data => {
      this.combo = data;
      this.id = this.combo.id;

    }, err => {
      console.log(err);
    })
  }

  selectCombo(id: number) {

    //cette méthode va donner le choix de la catégorie déjà trié par SpringBoot
    this.comboService.getComboCategoryByComboId(id).subscribe(data => {

      this.comboCat = data;
      this.parentComboCategoryId = null;
      this.category = [];
      //Cette hashMap va servir pour afficher les produits (values)
      //en fonction du parentComboCategoryId (keys)
      this.productMap = new Map();
      this.comboCat.forEach((element) => {
        this.comboService.getComboCategoryById(element.theId).subscribe(data => {
          this.comboCategory = data;
          this.parentComboCategoryId = element.theId;
          this.categoryModel = new CategoryModel(
            this.comboCategory.category.name,
            this.comboCategory.category.theId,
            element.theId,
            this.comboCategory.number);
          this.category.push(this.categoryModel);

          //algo de tri provisoire
          //le mieux c'est d attendre la creation définitive avant de lancer la méthode de trie 
          // realisé en java
          for (this.j = 0; this.j < this.category.length; this.j++) {

            for (this.i = 0; this.i < this.category.length - 1; this.i++) {

              if (this.category[this.i].getComboCategoryNumber() > this.category[(this.i + 1)].getComboCategoryNumber()) {

                this.categoryModelProvisoire = this.category[this.i];
                this.category[this.i] = this.category[(this.i + 1)];
                this.category[(this.i + 1)] = this.categoryModelProvisoire;

              }
            }
          }

          this.productMap.set(this.parentComboCategoryId, this.comboCategory.products);

        })
      })

      // on met a 0 la condition pour valider le menu
      //on initialise la hashMap contenant le menu
      this.menuAValider = 0;
      this.hashMenu = new Map();

    }, err => {
      console.log(err);
    })
  }

  getProductsFromComboCat(id: number) {
    this.productsMap = this.getProductsFromMap(id);
    //idParent ==> key
    this.currentCat = id;
  }

  //return la list de produit en fonction de l id parent
  getProductsFromMap(id: number) {
    return Array.from(this.productMap.get(id));
  }

  //on met les produits dans hashmap avant validation du menu
  productOnHashMenu(idProduct: number) {

    //puis a partir de l id on va recréé le produit choisi
    this.comboService.findProductById(idProduct).subscribe(
      data => {
        this.productChoose = data;

        {
          //key idParent de comboCategory
          //this.currentCat reste enfoncé voir méthode getProductsFromComboCat(id: number)
          //value => le produit choisi
          this.hashMenu.set(this.currentCat, this.productChoose);
          //je créé l 'arrayList de toutes les valeures de la HashMap pour affichage

          this.arrayDeHashMenu = this.getValues(this.hashMenu);


          //on va parcourir la hashmap et si taille this.category = taille productMap alors on propose de valider
          if (this.category.length == this.hashMenu.size) {
            this.menuAValider = 1;
            //je récupère que les theId une fois l'array complete
            this.arrayLongClassModel = [];

            //je créé l'array de longClassModel
            this.arrayDeHashMenu.forEach((element => {
              this.longClassModel = new LongClassModel(element.theId);
              this.arrayLongClassModel.push(this.longClassModel);
            }))

          }

        }

      }, err => {
        console.log(err);
      })

  }


  createComboOrderItems() {
    //J'appel la méthode put qui va sauvegarger le combo dans commade et retourner mess de succes
    this.comboService.createComboOrderItems(this.userFromAp.id, this.combo.id, this.arrayLongClassModel)
      .subscribe(data => {
        this.message = data;

        //bloc qui va calculer mt panier en fonction de tous les orderItem de la commande

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


          //je reinitilise le choix des categories
          this.category = null;
          //je réinitiliase le choix des produits
          this.productsMap = null;
          //je réinitialise le produit choisi
          this.productChoose = null
          //je réinitiliase l'arrayList de la map
          this.arrayDeHashMenu = null;
          //je reinitiliase les boutons enfoncés
          this.currentPage = null;
          this.currentCat = null;
          //je reinitialise le produit choisi
          this.productChoose = null;
          this.menuAValider = 0;

          //on rafraichit la page pour MAJ du mt du panier
          this.router.navigateByUrl('menu');



        }, err => {
          console.log(err);
        })



      }, err => {
        console.log(err);
      })




  }

  getValues(map) {
    return Array.from(map.values());
  }

  //a definir
  deleteOrderItemCombo() {

  }
}