import { map } from 'rxjs-compat/operator/map';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private API;

  constructor(
    public http: HttpClient,
    public urlService:UrlService
  ) { 
this.API=urlService.getAPI();
  }


  //pas utilisé
  getMessage(number: number) {
    return this.http.get(this.API + '/categoryMessages/' + number + '/theMessages').
      map((result: any) => {
        return result._embedded.theMessages;
      })
  }


  getMessageCreateUser(email: string, login: string, lastName: string, firstName: string) {
    return this.http.get<any[]>(this.API + '/getMessageCreateUser?email=' + email + '&login=' + login + '&lastName=' + lastName + '&firstName=' + firstName);
  }

  getMessageEditUser(email: string, login: string, lastName: string, firstName: string) {
    return this.http.get<any[]>(this.API + '/getMessageEditUser?email=' + email + '&login=' + login + '&lastName=' + lastName + '&firstName=' + firstName);
  }
}
