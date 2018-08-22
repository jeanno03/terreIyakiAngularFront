import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Statut } from '../interfaces/statut';

@Injectable({
  providedIn: 'root'
})
export class MyTableService {

  public API = '//localhost:8080';
  // public API = 'http://jeannory.dynamic-dns.net:8080';

  constructor(public http: HttpClient) { }

  getAllTables(): Observable<any[]> {
    return this.http.get<any[]>(this.API + '/myTables?page=0&size=10&sort=tableNumber,asc').
      map((result: any) => {
        return result._embedded.myTables;
      })
  }

  getTableStatut(id: number) {
    return this.http.get(this.API + '/myTables/' + id + '/statut');
  }

  //cette méthode servira plus tard pour les commandes des tables
  getMyTableById(id: number) {
    return this.http.get<any[]>(this.API + '/getMyTableById?id=' + id);
  }

}
