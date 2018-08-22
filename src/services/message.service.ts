import { map } from 'rxjs-compat/operator/map';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public API = '//localhost:8080';
  // public API = 'http://jeannory.dynamic-dns.net:8080';

  constructor(public http: HttpClient) { }

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
