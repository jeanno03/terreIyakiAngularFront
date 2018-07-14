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

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'carte', component: CarteComponent },
  { path: 'menu', component: MenuComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CarteComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    OrderModule
  ],
  providers: [
    ProductService,
    ComboService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
