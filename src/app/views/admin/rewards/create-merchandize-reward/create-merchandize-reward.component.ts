import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ProductService } from '../../../../core/_services/product.service';
import { AuthenticationService } from '../../../../core/_services/authentication.service';
import { AlertService } from '../../../../core/_services/alert.service';
import { User } from '../../../../core/_models/user';
import { SurveyService } from '../../../../core/_services/survey.service';
import { SurveyRewardService } from '../../../../core/_services';

@Component({
  selector: 'app-create-merchandize-reward',
  templateUrl: './create-merchandize-reward.component.html',
  styleUrls: ['./create-merchandize-reward.component.css']
})
export class CreateMerchandizeRewardComponent implements OnInit {

  imageUrl: any;
  success_msg: any;
  // surveyMerchantForm: FormGroup;  
  stage = 1;
  dataForm: FormGroup;
  loading = false;
  save_products: any;
  save_surveyReward: any;
  save_survey: any;
  selectChange: any;
  currentUser: User;
  submitted: any;
  currentUserSubscription: Subscription;

  constructor(
    private productService: ProductService, 
    private formBuilder: FormBuilder, 
    private router: Router,
    private authenticationService: AuthenticationService, 
    private surveyService: SurveyService,
    // private utilityService: UtilitiesService, 
    private alertService: AlertService, 
    private surveyrewardServices: SurveyRewardService
    ) {

    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('User value', this.currentUser);
    });
  }
  ngOnInit() {
    // this.alertService.showAlertNotification('Success!','Your request is successful', 'success');
    // this.alertService.alertConfirmation("ee","ee")
    this.dataForm = this.formBuilder.group({
      reward_value: ['', Validators.required],
      reward_quant: ['', Validators.required],
      reward_type: ['Merchandize', Validators.required],
      reward_point: ['', Validators.required],
      photo: ['', Validators.required],
    });
  }
  /* Select Dropdown error handling */
  public handleError = (controlName: string, errorName: string) => {
    console.log('get here ');
    console.log(this.dataForm.controls[controlName].hasError(errorName));
    if (this.dataForm.controls[controlName].hasError(errorName)) {
      this.selectChange = false;
    }
    else {
      this.selectChange = true;
    }
    return this.dataForm.controls[controlName].hasError(errorName);
  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.dataForm.get('photo').setValue(file);
    }
  }
  get f() { return this.dataForm.controls; }

  onSubmit() {
    console.log('get here');
    // stop here if form is invalid
    console.log(this.dataForm.invalid);
    if (this.dataForm.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.dataForm.value);
    const formData = new FormData();
    formData.append('photo', this.dataForm.get('photo').value);
    formData.append('reward_value', this.dataForm.get('reward_value').value);
    formData.append('reward_type', this.dataForm.get('reward_type').value);
    formData.append('reward_quant', this.dataForm.get('reward_quant').value);
    formData.append('reward_point', this.dataForm.get('reward_point').value);

    this.surveyrewardServices.createMerchatReward(this.currentUser.id, formData)
      .pipe(first())
      .subscribe(
        data => {
          console.log('ok>>', data['data']);
          if (data['status']) {
            console.log('oka 3 >>', data['data']);
            // this.data = this.save_products;
            this.alertService.showAlertNotification('Success!','Your request is successful', 'success');
            console.log(432224)
            setTimeout(() => { 
              this.router.navigate(['/dashboard/rewards/merchandize']);
            }, 500);
          }
          else {
            this.success_msg = data['message'];
          }
        },
        error => {
          this.alertService.showAlertNotification('warning!',error, 'warning');
          this.loading = false;
        });
  }

}
