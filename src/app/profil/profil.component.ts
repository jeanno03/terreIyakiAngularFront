import { ProfilService } from './../../services/profil.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  userFromAp:any;
  user:any;
  email:string;

  constructor(public activatedRoute: ActivatedRoute,
    public router:Router,
    public profilService: ProfilService) {
this.email=activatedRoute.snapshot.params['email'];
     }

  ngOnInit() {
    console.log("this.email : " + this.email);
    // this.profilService.getUserByEmail(this.user.email);
    // console.log("this.user.email : " + this.user.email);
  }

}
