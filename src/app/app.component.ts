import { AuthService } from '../services/auth.service';
import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  user = null;
  topics: FirebaseListObservable<any[]>;

  constructor(private auth: AuthService,
    public db: AngularFireDatabase,
    public router: Router) { }

  loginWithGoogle() {
    this.auth.getAuthState().subscribe(
      (user) => this.user = user);
    this.topics = this.db.list('/topics');

    this.auth.loginWithGoogle();
  }

  logoutWithGoogle() {
    window.alert(this.user.email + " a été déconnecté")
    this.auth.logoutWithGoogle();
    this.router.navigateByUrl('/home');
  }

  emailOnProfil(email: string) {
    this.router.navigate(['profil', email]);
  }

}

