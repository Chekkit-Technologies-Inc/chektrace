import { Component, OnInit } from '@angular/core';
import { FooterService } from 'src/app/core/_services/footer.service';
import { NavbarService } from 'src/app/core/_services/navbar.service';

@Component({
  selector: 'app-get-connected',
  templateUrl: './get-connected.component.html',
  styleUrls: ['./get-connected.component.css']
})
export class GetConnectedComponent implements OnInit {

  constructor(
    public navService: NavbarService,
    public footerService: FooterService
  ) { }

  ngOnInit(): void {
    this.navService.hide();
    this.footerService.hide();
  }

}
