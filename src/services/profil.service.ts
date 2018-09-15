import { CommentModel } from './../models/commentModel';
import { LongClassModel } from './../models/longClassModel';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  private API ;
  //nombre d elements par page pour la pagination
  private nbParPage :number = 5;

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

  insertComment(userId: number, commentModel :CommentModel) {
    return this.http.put(this.API + '/insertComment/' + userId, commentModel);
  }

  getPaginationComments(page:number) {
    return this.http.get(this.API + '/comments?page=' + page + '&size='+this.nbParPage+'&sort=id,desc').
      map((result: any) => {
        return result._embedded.comments;
      })
  }

  countComments(){
    return this.http.get(this.API+'/countComments?nbParPage='+this.nbParPage);
  }

}
