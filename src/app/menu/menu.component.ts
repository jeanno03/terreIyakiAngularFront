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

  //va comporter le menu avant valiation commande
  hashMenu: Map<number, number>;
  menuAValider: number;
  productTest:any;

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
    this.productsMap = null;

    this.currentPage = name;

    this.comboService.getComboByName(name).subscribe(data => {
      this.combo = data;
      this.id = this.combo.id;

    }, err => {
      console.log(err);
    })
  }

  selectCombo(id: number) {

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
          for (this.j = 0; this.j < 2; this.j++) {

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

    //key idParent de comboCategory
    //this.currentCat reste enfoncé voir méthode getProductsFromComboCat(id: number)
    //value => id du produit
    this.hashMenu.set(this.currentCat, idProduct);

    //on va parcourir la hashmap et si taille this.category = taille productMap alors on propose de valider
    if (this.category.length == this.hashMenu.size) {
      this.menuAValider = 1;
    }
    //méthode pour voir contenu de la map si plusieurs clik ==> test ok
    console.log("key : " + this.currentCat + " value  : "+ this.hashMenu.get(this.currentCat)) ;
  }



  validerMenu(){
    //métier a faire
  }
}