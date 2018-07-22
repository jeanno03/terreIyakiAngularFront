import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  public API = '//localhost:8080';

  constructor(public http:HttpClient) { }

  getUserByEmail(email:string){
    return this.http.get<any>(this.API+'/getUserByEmail?email='+email);
  }
}
