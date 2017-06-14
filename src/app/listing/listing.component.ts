import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  id: any;
  listing: any;
  imageUrl: any;
  constructor(public fs: FirebaseService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.fs.getListing(this.id).subscribe(listing => {
      this.listing = listing;

      let storageRef = firebase.storage().ref();
      storageRef.child(this.listing.path).getDownloadURL().then((url) => {
        this.imageUrl =  url;
      }).catch((error) => {
        console.log(error);
      })
    })
  }

  onDeleteClick()
  {
    this.fs.deleteListing(this.id);
    this.router.navigate(['listings']);
  }

}
