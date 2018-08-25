import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { Statut } from '../interfaces/statut';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class MyTableService {

  private API;

  constructor(
    public http: HttpClient,
    public urlService:UrlService
  ) { 
this.API=urlService.getAPI();
  }

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
