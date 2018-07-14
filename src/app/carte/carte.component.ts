
import { ProductService } from '../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../interfaces/category';


@Component({
  selector: 'app-carte',
  templateUrl: './carte.component.html',
  styleUrls: ['./carte.component.scss']
})
export class CarteComponent implements OnInit {

  categories: Array<any>;
  products: Array<any>;
  category: Category=null;
  products2: any;
  id:number=0;
  currentPage:string;

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
    this.productService.getCategoryByName(name).subscribe(data => {
    this.category=data;
    this.id= this.category[0].id;
    this.getProductsById(this.id);
    }, err => {
      console.log(err);
    })
    return this.id;
  }

  getProductsById(id: number) {
    this.productService.findProductById(id).
      subscribe(data => {
        this.products = data;
               this.products.forEach((element) => {
                 console.log(element.vatPrice);
      })
  })

}

}