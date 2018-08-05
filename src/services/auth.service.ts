import { ProfilService } from './profil.service';
import { UserFromAppService } from './user-from-app.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState: Observable<firebase.User>
  private currentUser: firebase.User = null;
  private userFromAp:any=null;

  constructor(
    public afAuth: AngularFireAuth,
    public profilService: ProfilService,
    public userfromAppService: UserFromAppService
  ) {
    this.authState = this.afAuth.authState;
    this.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
        
        window.alert("bienvenue " + this.currentUser.displayName);
        this.profilService.getUserByEmail(this.currentUser.email).subscribe(data=>{
           this.userFromAp = data;
           //on renvoie les donnees de l'user vers userfromAppService pour partage
           if(this.userFromAp!=null){         
           userfromAppService.setOption("id",this.userFromAp.id);
           userfromAppService.setOption("email",this.userFromAp.email);
           userfromAppService.setOption("login",this.userFromAp.login);
           userfromAppService.setOption("firstName",this.userFromAp.firstName);
           userfromAppService.setOption("lastName",this.userFromAp.lastName);
           }
        })

      } else {
        this.currentUser = null;
      }
    });
  }

  getAuthState() {
    return this.authState;
  }

  loginWithGoogle() {
    return this.afAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider());
  }

  logoutWithGoogle() {
    return this.afAuth.auth.signOut();
  }

}
