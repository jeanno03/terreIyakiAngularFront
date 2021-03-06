import { UserFromAppService } from '../services/user-from-app.service';
import { PanierVatPriceService } from '../services/panier-vat-price.service';
import { PanierService } from '../services/panier.service';
import { MessageService } from '../services/message.service';
import { CommandeService } from '../services/commande.service';
import { AuthService } from '../services/auth.service';
import { environment } from '../environments/environment.prod';
import { MyTableService } from '../services/my-table.service';
import { ComboService } from '../services/combo.service';
import { ProductService } from '../services/product.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { CarteComponent } from './carte/carte.component';
import { HomeComponent } from './home/home.component';
import { OrderModule } from 'ngx-order-pipe';
import { MyTableComponent } from './my-table/my-table.component';
import { TestComponent } from './test/test.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database-deprecated';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database-deprecated";
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfilComponent } from './profil/profil.component';
import { TestService } from '../services/test.service';
import { CommandeActionComponent } from './commande-action/commande-action.component';
import { PanierComponent } from './panier/panier.component';
import { ProfilService } from '../services/profil.service';
import { MesCommandesComponent } from './mes-commandes/mes-commandes.component';
import { UrlService } from '../services/url.service';
import { TheMessageService } from '../services/the-message.service';
import { TvaTransformPipe } from '../pipes/tva-transform.pipe';
import { MessageComponent } from './message/message.component';
import { CarteProductService } from '../services/carte-product.service';
import { CommentComponent } from './comment/comment.component';
import { PageCommentService } from '../services/page-comment.service';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'homeMessage/:message', component: HomeComponent },
  { path: 'profil/:email', component: ProfilComponent },
  { path: 'commandeAction', component: CommandeActionComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'carte', component: CarteComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'myTable', component: MyTableComponent },
  { path: 'test', component: TestComponent },
  { path: 'mesCommandes', component: MesCommandesComponent },
  { path: 'comment', component: CommentComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  
  // { path: 'homeTheMessage/:theMessage /:categoryMessageNumber', component: HomeComponent },
  // { path: 'homeTheMessage/:theMessage', component: HomeComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CarteComponent,
    HomeComponent,
    MyTableComponent,
    TestComponent,
    ProfilComponent,
    CommandeActionComponent,
    PanierComponent,
    MesCommandesComponent,
    TvaTransformPipe,
    MessageComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    RouterModule.forChild(appRoutes),
    OrderModule,
    AngularFireModule.initializeApp(environment.firebase, 'letslearn-dev'),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    ProductService,
    ComboService,
    MyTableService,
    AuthService,
    TestService,
    CommandeService,
    MessageService,
    ProfilService,
    PanierService,
    PanierVatPriceService,
    UserFromAppService,
    UrlService,
    TheMessageService,
    CarteProductService,
    PageCommentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
