import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/core/_services/navbar.service';

@Component({
  selector: 'app-anti-fake',
  templateUrl: './anti-fake.component.html',
  styleUrls: ['./anti-fake.component.css']
})
export class AntiFakeComponent implements OnInit {

  constructor(
    private navService: NavbarService
  ) {
    // this.navService.hide()
   }

  ngOnInit(): void {
  }

}
