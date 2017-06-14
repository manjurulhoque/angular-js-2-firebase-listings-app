import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class FirebaseService {
  loggedIn: Boolean;
  listings: FirebaseListObservable<any[]>;
  listing: FirebaseObjectObservable<any>;
  folder: string;

  constructor(public af: AngularFire) { 
    this.folder = 'listingsimages';
    this.listings = this.af.database.list('/listings');
  }

  getListings() {
    this.listings = this.af.database.list('/listings') as FirebaseListObservable<Listing[]>;
    return this.listings;
  }

  getListing(id)
  {
    this.listing = this.af.database.object('/listings/'+id) as FirebaseObjectObservable<Listing>;

    return this.listing;
  }

  deleteListing(id)
  {
    return this.listings.remove(id);
  }

  addListingDemo(listing){
    let storageRef = firebase.storage().ref();
    this.listings.push(listing);
  }

  updateListing(id, listing)
  {
    return this.listings.update(id, listing);
  }

  addListing(listing)
  {
    let storageRef = firebase.storage().ref();
    for(let selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]])
    {
      let path = `/${this.folder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      iRef.put(selectedFile).then((snapsot) => {
        listing.image = selectedFile.name;
        listing.path = path;
        console.log("Added");
        this.listings.push(listing);
      });
    }
  }

  loginWithGoogle(){
    return this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    });
  }

  logout(){
    return this.af.auth.logout();
  }
}

interface Listing
{
  $key?: string;
  title?: string;
  type?: string;
  image?: string;
  city?: string;
  owner?: string;
  bedrooms?: string;
  path?: string;
}
