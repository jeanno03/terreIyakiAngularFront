import { LongClassModel } from './../models/longClassModel';
import { OrderItemModel } from '../models/orderItemModel';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  // public API = '//localhost:8080';
  public API = 'http://jeannory.dynamic-dns.net:8080';

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

  returnOrderItemByOrder(idOrder: number) {
    return this.http.get(this.API + '/myOrders/' + idOrder + '/orderItems').
      map((result: any) => {
        return result._embedded.orderItems;
      })
  }

  //on enregistre le numero de table a la commande et on retourne un message de succès
  chooseTable(tableNumber: number, userId: number) {
    return this.http.get(this.API + '/chooseTable?tableNumber=' + tableNumber + '&userId=' + userId);
  }

  //on incremente un produit
  incrementeOrderItem(productId: number, userId: number) {
    return this.http.get(this.API + '/incrementeOrderItem?productId=' + productId + '&userId=' + userId);
  }
  //on decremente un produit
  decrementeOrderItem(productId: number, userId: number) {
    return this.http.get(this.API + '/decrementeOrderItem?productId=' + productId + '&userId=' + userId);
  }

  // on supprime la ligne de commande
  deleteOrderItem(productId: number, userId: number) {
    return this.http.get(this.API + '/deleteOrderItem?productId=' + productId + '&userId=' + userId);
  }

  //A partir de ces 2 méthodes on va trouver tous les ordersItem du combo commandés
  //on recherche l'id de historisation
  getHistorisationFromOrderItem(orderItemId: number) {
    return this.http.get(this.API + '/orderItems/' + orderItemId + '/historisations').
      map((result: any) => {
        return result._embedded.historisations;
      })
  }

  //on recherche les orderItems de historisation
  getOrderItemsFromHistorisation(historisationId: number) {
    return this.http.get(this.API + '/historisations/' + historisationId + '/orderItems').
      map((result: any) => {
        return result._embedded.orderItems;
      })
  }

  //on supprime tous les orders items du menu
  deleteComboOrderItem(arrayLongClassModel: Array<LongClassModel>) {
    return this.http.post(this.API + '/deleteComboOrderItem', arrayLongClassModel);
  }


  //on valide la commande
  confirmOrder(userId: number) {
    return this.http.get(this.API + '/confirmOrder?userId=' + userId)
  }

  //on delete la commande et ses dépendances
  deleteOrder(userId: number) {
    return this.http.get(this.API + '/deleteOrder?userId=' + userId)
  }
}