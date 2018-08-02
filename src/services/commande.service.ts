import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  public API = '//localhost:8080';

  constructor(public http:HttpClient) { }

getAllOrderType():Observable<any[]>{
  return this.http.get<any[]>(this.API+'/orderTypes?page=0&size=10&sort=name,asc').
  map((result:any)=>{
    return result._embedded.orderTypes;
  })
}

///selectOrder

selectOrder(name:string, email:string){
return this.http.get<any[]>(this.API+'/selectOrder?name='+name+'&email='+email);
}

//non utilisé
//on récupère toutes les commandes de l'user
getMyOrdersByMyUser(id:number){
return this.http.get(this.API+'/myUsers/'+id+'/myOrders').
map((result:any)=>{
  return result._embedded.myOrders;
})

}

selectLastMyOrderByUser(id:number){
return this.http.get<any[]>(this.API+'selectLastMyOrderByUser?userId='+id);
}




}
