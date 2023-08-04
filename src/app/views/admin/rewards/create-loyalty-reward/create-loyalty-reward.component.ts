import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService, UserService, AlertService, SurveyService } from '../../../../core/_services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-loyalty-reward',
  templateUrl: './create-loyalty-reward.component.html',
  styleUrls: ['./create-loyalty-reward.component.css']
})
export class CreateLoyaltyRewardComponent implements OnInit {
  stage = 1;
  dataForm: FormGroup;
  loading = false;
  submitted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private surveyService: SurveyService,
    private alertService: AlertService
    ) { }


    ngOnInit() {
      this.dataForm = this.formBuilder.group({
        loyalty_name: ['', Validators.required],
        loyalty_reward_value: ['', Validators.required]
      });

    }
  
    // convenience getter for easy access to form fields
    get f() { return this.dataForm.controls; }
  
    onSubmit() {
      console.log("get here");
      this.submitted = true;
      // stop here if form is invalid
      console.log(this.dataForm.invalid);
      if (this.dataForm.invalid) {
        return;
      }
      this.loading = true;
      console.log(this.dataForm.value);
      this.surveyService.addLoyaltyPoint(this.dataForm.value)
        .pipe(first())
        .subscribe(
          data => {
            if (data['status']) {
              this.alertService.showAlertNotification('Success!','Your request is successful', 'success');

              this.router.navigate(['/dashboard/rewards/loyalty-points']);
            } else {
              console.log("here 1");
            }
          },
          error => {
            console.log("here 2", error);          
            this.alertService.showAlertNotification('warning!',error, 'warning');
            this.loading = false;
          });
    }

}
