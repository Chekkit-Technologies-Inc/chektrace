import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/core/_services/navbar.service';

@Component({
  selector: 'app-select-module',
  templateUrl: './select-module.component.html',
  styleUrls: ['./select-module.component.css']
})
export class SelectModuleComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  goToMas(){
    this.router.navigate(['MAS/product-onboarding']);
  }

}
