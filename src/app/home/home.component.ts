import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isLoggedIn: Boolean;
  public username: String;
  public email: String;
  constructor(public fs: FirebaseService, public router: Router) {
    this.fs.af.auth.subscribe((auth) => {
      if(auth == null)
      {
        this.isLoggedIn = false;
        this.username = "";
        this.email = "";
        this.router.navigate(['']);
      }
      else
      {
        this.isLoggedIn = true;
        this.username = auth.google.displayName;
        this.email = auth.google.email;
        this.router.navigate(['/']);
      }
    })
  }

  ngOnInit() {
  }

}
