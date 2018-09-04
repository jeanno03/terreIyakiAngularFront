import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  //  private API = '//localhost:8080';

  private API = 'http://jeannory.dynamic-dns.net:8080/main';


  //non utilisé
  // private API = 'http://jeannory.dynamic-dns.net:8080';
  // private API = 'http://jeannory.ovh:8080/main';
  constructor() { }

  getAPI() {
    return this.API;
  }
}

