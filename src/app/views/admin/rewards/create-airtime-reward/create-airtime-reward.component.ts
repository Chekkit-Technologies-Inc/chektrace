import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService, UserService, AlertService, SurveyService, SurveyRewardService } from '../../../../core/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { noWhitespaceValidator } from '../../../../core/_helpers/whitespace-validator';
import { Subscription } from 'rxjs';
import { User } from '../../../../core/_models/user';

@Component({
  selector: 'app-create-airtime-reward',
  templateUrl: './create-airtime-reward.component.html',
  styleUrls: ['./create-airtime-reward.component.css']
})
export class CreateAirtimeRewardComponent implements OnInit {
  stage = 1;
  dataForm: FormGroup;
  loading = false;
  submitted: boolean;
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private surveyRewardService: SurveyRewardService,
    private surveyService: SurveyService,
    private alertService: AlertService
    ) {
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        this.currentUser = user;
        console.log('User value', this.currentUser);
      });
     }


    ngOnInit() {
      this.dataForm = this.formBuilder.group({
        reward_value: [null, [Validators.required, Validators.maxLength(20), noWhitespaceValidator]],
        reward_type: ['Airtime', [Validators.required, Validators.maxLength(20), noWhitespaceValidator]],
        reward_quant: [null, [Validators.required, Validators.maxLength(20), noWhitespaceValidator]],
      });

    }
  
    // convenience getter for easy access to form fields
    get f() { return this.dataForm.controls; }
  
    onSubmit() {
      this.submitted = true;
      let rewards = [];
      // stop here if form is invalid
      console.log(this.dataForm.invalid);
      if (this.dataForm.invalid) {
        return;
      }
      this.loading = true;
      console.log(this.dataForm.value);


    const formData = this.dataForm.value;
    const rewardObject = {
      reward_value: formData.reward_value,
      reward_quant: formData.reward_quant,
      reward_type: formData.reward_type,
    };
    rewards.push(rewardObject);


      this.surveyRewardService.createReward(this.currentUser.id, { rewards: rewards })
        .pipe(first())
        .subscribe(
          data => {
            console.log(data);
            if (data['status']) {
              // console.log(this.data);
              setTimeout(() => { 
                // this.utilitiesService.showSuccessToast('Reward Creation Done')
                this.alertService.showAlertNotification('Success!','Your request is successful', 'success');
                this.router.navigate(['/dashboard/rewards']);
              }, 500);
            }
          },
          error => {            
            this.alertService.showAlertNotification('warning!',error, 'warning');
            this.loading = false;
          });
    }

}
