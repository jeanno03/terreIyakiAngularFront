import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  private API ;

  constructor(
    public http: HttpClient,
    public urlService:UrlService
  ) { 
this.API=urlService.getAPI();
  }

  getUserByEmail(email: string) {
    return this.http.get<any>(this.API + '/getUserByEmail?email=' + email);
  }

  tryAndSaveMyUser(email: string, login: string, lastName: string, firstName: string) {
    return this.http.get<any>(this.API + '/tryAndSaveMyUser?email=' + email + '&login=' + login + '&lastName=' + lastName + '&firstName=' + firstName);
  }
}
