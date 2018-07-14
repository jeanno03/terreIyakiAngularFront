import { Product } from '../interfaces/product';
import { Category } from '../interfaces/category';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product :Product;
  products: Array<Product>;
  productsWithVat: Array<Product>;
  productTest:any;
  productsTest :Array<any>;

  public API = '//localhost:8080';

  constructor(public http:HttpClient) { }

findAllCategories(): Observable<any[]>{
  return this.http.get<any[]>(this.API+'/categories').
  map((result:any)=>{
    return result._embedded.categories;
})
}

getCategoryByName(name:string){
  return this.http.get<Category>(this.API+'/getCategoryByName?name='+name);
}

findProductById(id:number){
  return this.http.get(this.API+'/categories/'+id+'/products').
  map((result:any)=>{
    return result._embedded.products;
})
}

}