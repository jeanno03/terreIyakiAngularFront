import { MessageService } from './../../services/message.service';
import { MyUserModel } from '../../models/myUserModel';
import { ProfilService } from '../../services/profil.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {


  email: string;
  userFromAp: any;
  myUserModel: MyUserModel = new MyUserModel(null, null, null, null);
  newMyUserModel: MyUserModel;

  theMessage: any;
  creer: string = null;
  modifier: string = null;



  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    public profilService: ProfilService,
    public messageService: MessageService
  ) {
    this.email = activatedRoute.snapshot.params['email'];
  }

  ngOnInit() {

    this.userFromAp = [];
    //cette méthode récupère l'utilisateur de l'app s'il existe
    //soit this.userFromAp
    this.getUserByEmail(this.email);
  }

  getUserByEmail(email: string) {
    this.profilService.getUserByEmail(email).subscribe(data => {
      this.userFromAp = data;
      // console.log("this.userFromAp.login : "+this.userFromAp.login);
      // console.log("this.userFromAp.firstName : "+this.userFromAp.firstName);
    }, err => {
      console.log(err);
    })
  }

  creerProfil() {
    this.creer = "true";
  }

  modifierProfil() {
    this.modifier = "true";
//on réinterroge le serveur pour récupérer l'utilisateur sil a été créé dans l'application
 this.getUserByEmail(this.email);

 

  }

  enCours() {

  }


  creerUserFromAp() {
    //Les infos de myUserModel sont récupéré par le formulaire html
    //seul l email doit etre rajouté 
    this.myUserModel.setEmail(this.email);
    this.messageService.getMessageCreateUser(this.myUserModel.getEmail(),
      this.myUserModel.getLogin(),
      this.myUserModel.getFirstName(),
      this.myUserModel.getLastName()
    ).subscribe(data => {
      this.theMessage = data;
      //on réinterroge le serveur pour récupérer l'utilisateur sil a été créé dans l'application
      this.getUserByEmail(this.email);
    }, err => {
      console.log(err);
    })
  }

  modifierUserFromAp(){

    this.messageService.getMessageEditUser(this.userFromAp.email,
    this.userFromAp.login,
    this.userFromAp.firstName,
    this.userFromAp.lastName
    ).subscribe(data => {
      this.theMessage = data;
      console.log("this.theMessage.number : "+this.theMessage.number);

      //en cas de reussite on retire le formulaire
      //number==3 ==> succès
      if(this.theMessage.number==3){
        this.modifier='done';
      }

      //en cas d'échec on remet le formulaire
      //number==4 ==> echec
      if(this.theMessage.number==4){
        this.modifier='true';
      }

      //en cas d'échec on remet le formulaire
      //number==2 ==> echec
      if(this.theMessage.number==2){
        this.modifier='true';
      }

    }, err => {
      console.log(err);
    })
  }

}