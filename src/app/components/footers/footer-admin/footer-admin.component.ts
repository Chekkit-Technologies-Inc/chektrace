import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FooterService } from "src/app/core/_services/footer.service";
import { AuthenticationService, UserService, AlertService } from '../../../core/_services';

@Component({
  selector: "app-footer-admin",
  templateUrl: "./footer-admin.component.html",
})
export class FooterAdminComponent implements OnInit {
  date = new Date().getFullYear();
  location: string;
  constructor(
    public footerService: FooterService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.location = router.url;
  }

  ngOnInit(): void {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/authentication/login']);
  }
}
