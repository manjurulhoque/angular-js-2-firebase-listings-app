import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styleUrls: ['./add-listing.component.css']
})
export class AddListingComponent implements OnInit {
  title: any;
  city: any;
  owner: any;
  bedrooms: any;
  price: any;
  type: any;
  image: any;

  constructor(public fs: FirebaseService, public router: Router) { }

  ngOnInit() {
  }

  onAddSubmit(){
    
    let listing = {
      title: this.title,
      city: this.city,
      owner: this.owner,
      bedrooms: this.bedrooms,
      price: this.price,
      type: this.type
      // //image: this.image,
      // path: "/img/mansion1.jpg"
    }

    console.log(listing);
    this.fs.addListing(listing);
    this.router.navigate(['listings']);
    


    // this.fs.addListing(listing);

    // this.router.navigate(['listings']);
  }

}
