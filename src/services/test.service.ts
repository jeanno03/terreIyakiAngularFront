import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  hashExemple3: Map<string, number> = new Map();
  nombre: number;

  constructor(public http: HttpClient) { }

  testHashMap(numero: string) {

    if (this.hashExemple3.get(numero) == null) {
      this.nombre = 0;
    }
    else {
      this.nombre = (this.hashExemple3.get(numero) + 1);
    }
    this.hashExemple3.set(numero, this.nombre);

    return this.hashExemple3;

  }


}
