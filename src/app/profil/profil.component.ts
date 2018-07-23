import { MyUserModel } from './../../models/myUserModel';
import { ProfilService } from './../../services/profil.service';
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
  newMyUserModel : MyUserModel;


  constructor(public activatedRoute: ActivatedRoute,
    public router: Router,
    public profilService: ProfilService) {
    this.email = activatedRoute.snapshot.params['email'];
  }

  ngOnInit() {

    this.userFromAp = [];
    this.getUserByEmail(this.email);
  }

  getUserByEmail(email: string) {
    this.profilService.getUserByEmail(email).subscribe(data => {
      this.userFromAp = data;
    })
  }

  enCours() {
    //en cours
  }


  creerUserFromAp() {
    this.myUserModel.setEmail(this.email);

  this.profilService.tryAndSaveMyUser(this.myUserModel.getEmail(),
  this.myUserModel.getLogin(),
  this.myUserModel.getFirstName(),
  this.myUserModel.getLastName()
).subscribe(data=>{
  this.newMyUserModel=data;
}, err => {
  console.log(err);
})
}
}