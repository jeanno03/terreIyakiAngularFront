import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  user = null;
  topics: FirebaseListObservable<any[]>;

  constructor(private auth:AuthService,
    public db: AngularFireDatabase) { }

  ngOnInit() {

  }

  loginWithGoogle() {
    this.auth.getAuthState().subscribe(
      (user) => this.user = user);
      this.topics = this.db.list('/topics');
      
    this.auth.loginWithGoogle();
    console.log("this.user : "+this.user.email);
  }

  logoutWithGoogle(){
    window.alert(this.user.email + " a été déconnecté")
    this.auth.logoutWithGoogle();
  }

}
