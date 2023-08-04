import { Component, OnInit, Input } from "@angular/core";
import { AuthenticationService, UserService, AlertService } from '../../../core/_services';
import { Router } from '@angular/router';

@Component({
  selector: "app-footer-small",
  templateUrl: "./footer-small.component.html",
})
export class FooterSmallComponent implements OnInit {
  date = new Date().getFullYear();

  @Input()
  get absolute(): boolean {
    return this._absolute;
  }
  set absolute(absolute: boolean) {
    this._absolute = absolute === undefined ? false : absolute;
  }
  private _absolute = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/authentication/login']);
  }
}
