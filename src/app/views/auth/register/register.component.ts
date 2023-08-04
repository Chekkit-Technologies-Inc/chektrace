import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService, UserService, AlertService } from '../../../core/_services';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
})
export class RegisterComponent implements OnInit {

  
  registerForm: FormGroup;
  loading = false;
  termsAccepted = false;
  submitted = false;
  returnUrl: string;
  error = '';
  err_msg: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: [null, [Validators.required, Validators.email]],
      company_rep: ['', Validators.required],
      company_name: ['', Validators.required],
      call_code: [''],
      country: ['', Validators.required],
      currency: [''],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard/overview';
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }


  onSubmit() {
    console.log("get here");
    this.submitted = true;
    // stop here if form is invalid
    console.log(this.registerForm.invalid);
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.registerForm.value);
    this.authenticationService.register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          if (data['status']) {
            this.err_msg = data['message'];
            this.alertService.showAlertNotification('Registration successful','Your account has been created successfully', 'success');

            this.router.navigate(['/authentication/choose-plan']);
          } else {
            console.log("here 1");
            this.err_msg = data['message'];
          }
        },
        error => {
          console.log("here 2", error);
          this.err_msg = error;
          // this.alertService.error(error);
          this.alertService.showAlertNotification('warning!',error, 'warning');

          this.loading = false;
        });
  }

}
