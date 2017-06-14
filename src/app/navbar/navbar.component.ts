import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FirebaseService } from '../firebase.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLoggedIn: Boolean;
  public username: String;
  public email: String;
  constructor(public fs: FirebaseService, private router: Router, private flashMessage: FlashMessagesService) {
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

  login()
  {
    this.fs.loginWithGoogle().then((data) => {
      this.router.navigate(['']);
    });
  }

  logout()
  {
    this.fs.logout();
    this.flashMessage.show('You are logged out', {cssClass: 'alert alert-success', timeout: 2000});
    this.router.navigate(['']);
  }
}
