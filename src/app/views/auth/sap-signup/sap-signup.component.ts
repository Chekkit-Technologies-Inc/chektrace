import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sap-signup',
  templateUrl: './sap-signup.component.html',
  styleUrls: ['./sap-signup.component.css']
})
export class SapSignupComponent implements OnInit {
  showPassword = false;
  passwordToggleIcon = 'eye';
  password: '';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  togglePassword(): void {
    this.showPassword = !this.showPassword;

    if(this.passwordToggleIcon = 'eye') {
      this.passwordToggleIcon = 'eye-off';
    }else {
      this.passwordToggleIcon = 'eye';
    }
  }

  goToLink(){
    this.router.navigate(['/sap/link-account'])
  }

}
