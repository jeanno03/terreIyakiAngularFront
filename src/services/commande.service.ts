import { OrderItemModel } from './../models/orderItemModel';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  public API = '//localhost:8080';

  orderItemModel: OrderItemModel;

  constructor(public http: HttpClient) { }

  getAllOrderType(): Observable<any[]> {
    return this.http.get<any[]>(this.API + '/orderTypes?page=0&size=10&sort=name,asc').
      map((result: any) => {
        return result._embedded.orderTypes;
      })
  }

  ///selectOrder

  selectOrder(name: string, email: string) {
    return this.http.get<any[]>(this.API + '/selectOrder?name=' + name + '&email=' + email);
  }

  //non utilisé
  //on récupère toutes les commandes de l'user
  getMyOrdersByMyUser(id: number) {
    return this.http.get(this.API + '/myUsers/' + id + '/myOrders').
      map((result: any) => {
        return result._embedded.myOrders;
      })

  }

  selectLastMyOrderByUser(id: number) {
    return this.http.get(this.API + '/selectLastMyOrderByUser?userId=' + id);
  }

  //méthode pour ajouter un orderItem simple
  //ne sera pas utilisé car méthode CRUD simple non adapté
  //gardé pour exemple 
  newOrderItem(price: number, tax: number, comment: string) {
    this.orderItemModel = new OrderItemModel(price, tax, comment);
    return this.http.post(this.API + '/orderItems', this.orderItemModel)
  }

  createOrderItem(productId: number, userId: number) {
    return this.http.get<any>(this.API + '/createOrderItem?productId=' + productId + '&userId=' + userId);
  }
}