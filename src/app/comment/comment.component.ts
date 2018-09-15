import { Component, OnInit } from '@angular/core';
import { UserFromAppService } from '../../services/user-from-app.service';
import { ProfilService } from '../../services/profil.service';
import { TheMessageService } from '../../services/the-message.service';
import { CommentModel } from '../../models/commentModel';
import { PageCommentService } from '../../services/page-comment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  userFromAp: any;
  theMessage: any;
  commentModel = new CommentModel();
  comment: any;
  pageElement: any;
  // numerotation: any;
  pageList: Array<number>;
  i: number;
  pageActuel: number;
  elementPageCommentService: any;
  // currentPage:number;

  constructor(
    public userFromAppService: UserFromAppService,
    public profilService: ProfilService,
    public theMessageService: TheMessageService,
    public pageCommentService: PageCommentService,
    public router: Router
  ) {
    this.userFromAp = userFromAppService.getFirebaseUser();
    // on réinitialise les messages
    this.theMessageService.setOption("theMessage", null);
    this.theMessageService.setOption("categoryMessageNumber", null);

    this.elementPageCommentService = this.pageCommentService.getPageComment();
    this.pageActuel = this.elementPageCommentService.pageEnCours;
    // console.log("this.pageActuel : " + this.pageActuel);

    if (this.elementPageCommentService.pageEnCours == null) {
      this.pageActuel = 0;
    }
    this.getPaginationComment(this.pageActuel);
    this.countComments();
  }

  ngOnInit() {

  }

  insertComment() {

    if (this.userFromAp.id != null) {
      this.profilService.insertComment(this.userFromAp.id, this.commentModel)
        .subscribe(data => {
          this.theMessage = data;
          this.theMessageService.setOption("theMessage", this.theMessage.theMessage);
          this.theMessageService.setOption("categoryMessageNumber", this.theMessage.categoryMessage.number);

          //j efface le textAera
          this.commentModel.setComment(null);



          //je réinitialise la page des commentaire et le choix des pages
          this.comment = null;
          this.pageElement = null;

          //Je rémet la derniere page
          this.pageActuel = 0;
          this.getPaginationComment(this.pageActuel);
          this.countComments();

          this.pageCommentService.setOption("pageEnCours", this.pageActuel);


          // this.pageCommentService.setOption("pageEnCours", this.pageActuel)

          //this.router.navigateByUrl('comment');

        }, err => {
          console.log(err)
        })



    }
    else {
      this.theMessageService.setOption("theMessage", "Connexion et enregistrement requis (Google-connexion puis Profil)");
      this.theMessageService.setOption("categoryMessageNumber", 2);
    }
  }


  getPaginationComment(page: number) {
    this.profilService.getPaginationComments(page)
      .subscribe(data => {
        this.comment = data;
      }, err => {
        console.log(err)
      })
  }

  //dans la méthode j'ai déjà défini 5 commentaires par pagination
  countComments() {
    this.profilService.countComments()
      .subscribe(data => {
        this.pageElement = data;

        this.pageList = [];
        for (this.i = 0; this.i < this.pageElement.pageTotal; this.i++) {
          this.pageList.push(this.i);
        }


      }, err => {
        console.log(err)
      })
  }

  goToPage(page: number) {
    this.pageActuel = page;

    this.getPaginationComment(this.pageActuel);
    this.pageCommentService.setOption("pageEnCours", this.pageActuel);
  }
}
