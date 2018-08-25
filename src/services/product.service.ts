import { Product } from '../interfaces/product';
import { Category } from '../interfaces/category';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { UrlService } from './url.service';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product: Product;
  products: Array<Product>;
  productsWithVat: Array<Product>;
  productTest: any;
  productsTest: Array<any>;

  private API ;

  constructor(
    public http: HttpClient,
    public urlService:UrlService
  ) { 
this.API=urlService.getAPI();
  }

  findAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.API + '/categories').
      map((result: any) => {
        return result._embedded.categories;
      })
  }

  getCategoryByName(name: string) {
    return this.http.get(this.API + '/getCategoryByName?name=' + name);
  }

  //nom de méthode pouvant porter a confusion
  //elle va retrouver les products en fonction de l'id de categories
  findProductById(id: number) {
    return this.http.get(this.API + '/categories/' + id + '/products').
      map((result: any) => {
        return result._embedded.products;
      })
  }

}