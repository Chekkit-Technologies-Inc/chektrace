import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/core/_services/navbar.service';

@Component({
  selector: 'app-gaming-nav',
  templateUrl: './gaming-nav.component.html',
  styleUrls: ['./gaming-nav.component.css']
})
export class GamingNavComponent {
  location: string;
  Fusername: string;
  Lusername: string;
  userCompany: string;

  constructor(
    private _router: Router,
    public nav: NavbarService
  ) {
    this.location = _router.url;
    this.Fusername = this.nav.currentUser.first_name;
    this.Lusername = this.nav.currentUser.last_name;
    this.userCompany = this.nav.currentUser.company_rep;
  }

}
