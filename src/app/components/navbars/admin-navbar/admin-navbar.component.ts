import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin-navbar",
  templateUrl: "./admin-navbar.component.html",
})
export class AdminNavbarComponent implements OnInit {
  location: string;
  constructor(
    private _router: Router
  ) {
    this.location = _router.url;
  }

  ngOnInit(): void {}
}
