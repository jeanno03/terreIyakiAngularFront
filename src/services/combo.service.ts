import { Combo } from '../interfaces/combo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})
export class ComboService {

  public API = '//localhost:8080';
  comboCategory : any;

  constructor(public http:HttpClient) { }

  getComboProducts(): Observable<any[]>{
    return this.http.get<any[]>(this.API+'/comboes').
    map((result:any)=>{
      return result._embedded.comboes;
    })

  }

  getComboByName(name:string){
    return this.http.get<Combo>(this.API+'/getComboByName?name='+name);
  }

  getComboCategoryByComboId(id:number){
    return this.http.get(this.API+'/comboes/'+id+'/comboCategories').
    map((result:any)=>{
      return result._embedded.comboCategories;
    })
  }

  getProductsByComboCategoryId(id:number){
    return this.http.get(this.API+'/comboCategories/'+id+'/products').
    map((result:any)=>{
      return result._embedded.products;
    })
  }

  getComboCategoryById(id:number){
    return this.http.get<any[]>(this.API+'/getComboCategoryById?id='+id);

  }
  //ca marche a garder
// findAllProducts(): Observable<Product[]> {
//   return this.http.get<Product[]>(this.API+'/products').
//     map((result:any)=>{
//       console.log(result);
//       this.products = result._embedded.products;
//       this.products.forEach((element)=>{
//         console.log(element.price);
//       }) 
//       return this.products;
//     });
//   }
//comboCategories/2/products

//marche pas a supprimer?
generateArray(obj){
  return Object.keys(obj).map((key)=>{ return obj[key]});
}

}
