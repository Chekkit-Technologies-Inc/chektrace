import { Component, OnInit } from "@angular/core";
import {  AuthenticationService, UserService } from '../../../core/_services';
import { User } from '../../../core/_models';
import { Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-index-navbar",
  templateUrl: "./index-navbar.component.html",
})
export class IndexNavbarComponent implements OnInit {
  navbarOpen = false;
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(
    private authenticationService: AuthenticationService, 
    private router: Router,
    ) {
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        this.currentUser = user;
        console.log('User value', this.currentUser);
      });

    }

  ngOnInit(): void {}

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/authentication/login']);
  }
}
