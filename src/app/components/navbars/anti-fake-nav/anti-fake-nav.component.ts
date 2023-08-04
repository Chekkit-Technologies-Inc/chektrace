import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/core/_services/navbar.service';

@Component({
  selector: 'app-anti-fake-nav',
  templateUrl: './anti-fake-nav.component.html',
  styleUrls: ['./anti-fake-nav.component.css']
})
export class AntiFakeNavComponent implements OnInit {

  location: string;

  constructor(
    private _router: Router,
    public nav: NavbarService
  ) {
    this.location = _router.url;
  }
  ngOnInit(): void {
  }

}
