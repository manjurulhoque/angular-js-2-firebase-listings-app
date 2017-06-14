import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styleUrls: ['./edit-listing.component.css']
})
export class EditListingComponent implements OnInit {
  id: any;
  title: any;
  city: any;
  owner: any;
  bedrooms: any;
  price: any;
  type: any;

  constructor(public fs: FirebaseService, public router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.fs.getListing(this.id).subscribe(listing => {
      this.title = listing.title;
      this.city = listing.city;
      this.owner = listing.owner;
      this.bedrooms = listing.bedrooms;
      this.price = listing.price;
      this.type = listing.type;
    })
  }

  onEditSubmit()
  {
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
    this.fs.updateListing(this.id, listing);
    this.router.navigate(['listings']);
  }

}
