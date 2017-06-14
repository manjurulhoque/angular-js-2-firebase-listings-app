import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { FirebaseService } from './firebase.service';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListingsComponent } from './listings/listings.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListingComponent } from './listing/listing.component';
import { AddListingComponent } from './add-listing/add-listing.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';

export const firebaseConfig = {
  apiKey: "AIzaSyD-oX_DEgJAuR7in9jeop_CnAl7EZsEDuU",
  authDomain: "propslistings.firebaseapp.com",
  databaseURL: "https://propslistings.firebaseio.com",
  projectId: "propslistings",
  storageBucket: "propslistings.appspot.com",
  messagingSenderId: "206945184854"
};

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'listing/:id', component: ListingComponent},
  {path: 'edit-listing/:id', component: EditListingComponent},
  {path: 'listings', component: ListingsComponent},
  {path: 'add-listing', component: AddListingComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListingsComponent,
    NavbarComponent,
    ListingComponent,
    AddListingComponent,
    EditListingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FlashMessagesModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes)
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
