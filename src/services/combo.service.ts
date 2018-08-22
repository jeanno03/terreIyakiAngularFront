import { LongClassModel } from './../models/longClassModel';
import { Combo } from '../interfaces/combo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})
export class ComboService {

  public API = '//localhost:8080';
  // public API = 'http://jeannory.dynamic-dns.net:8080';

  constructor(public http: HttpClient) { }

  getComboProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.API + '/comboes').
      map((result: any) => {
        return result._embedded.comboes;
      })
  }

  getComboByName(name: string) {
    return this.http.get<Combo>(this.API + '/getComboByName?name=' + name);
  }

  getComboCategoryByComboId(id: number) {
    return this.http.get(this.API + '/comboes/' + id + '/comboCategories').
      map((result: any) => {
        return result._embedded.comboCategories;
      })
  }

  getComboCategoryById(id: number) {
    return this.http.get<any[]>(this.API + '/getComboCategoryById?id=' + id);
  }

  getComboCategoriesByCategory(id: number) {
    return this.http.get(this.API + '/categories/' + id + '/comboCategories').
      map((result: any) => {
        return result._embedded.comboCategories;
      })
  }

  findProductById(id: number) {
    return this.http.get<any>(this.API + '/products/' + id);
  }

  createComboOrderItems(userId: number, comboId: number, arrayLongClassModel: Array<LongClassModel>) {
    return this.http.put(this.API + '/createComboOrderItems/' + userId + '/' + comboId, arrayLongClassModel);
  }

}
