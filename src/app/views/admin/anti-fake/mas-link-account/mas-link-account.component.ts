import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/core/_services/navbar.service';

@Component({
  selector: 'app-mas-link-account',
  templateUrl: './mas-link-account.component.html',
  styleUrls: ['./mas-link-account.component.css']
})
export class MasLinkAccountComponent implements OnInit {

  constructor(
    public navService: NavbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  linkAccount(){
    this.router.navigate(['/MAS/product-onboarding'])
  }

}
