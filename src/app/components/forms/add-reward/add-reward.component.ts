import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProductService, AuthenticationService, SurveyService, AlertService, SurveyRewardService } from '../../../core/_services';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../../../core/_models/user';


@Component({
  selector: 'add-reward',
  templateUrl: './add-reward.component.html',
  styleUrls: ['./add-reward.component.css']
})
export class AddRewardComponent implements OnInit {

  rewardType = "";
  rewardForm: FormGroup;
  currentUserSubscription: Subscription;
  currentUser: User;
  save_surveyReward: any;
  loyalt_points: any;
  loading: boolean;
  @Input() pId: any;

  constructor(
    private productService: ProductService, 
    private formBuilder: FormBuilder, 
    private router: Router,
    private authenticationService: AuthenticationService, 
    private surveyService: SurveyService,
    private alertService: AlertService, 
    private surveyrewardServices: SurveyRewardService, 
    private fb: FormBuilder

  ) { 
      
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('User value', this.currentUser);
    });
    this.getAllSurveyRewards();
    this.getAllLoyaltyPoints();

  }

  ngOnInit(): void {
    this.rewardForm = this.formBuilder.group({
      rewardId: ['', Validators.required],
    });
  }

  getAllSurveyRewards(shouldSelect = false) {
    this.surveyrewardServices.getAllUserSurveyReward(this.currentUser.id).pipe(first()).subscribe(data => {
      console.log("result of reward", data['data']);
      if (data['data']) {
        this.save_surveyReward = data['data'];
        console.log("rewards", this.save_surveyReward);
        localStorage.setItem('allsurveyRewards', JSON.stringify(data['data']));
      }
    });
  }

  getAllLoyaltyPoints(shouldSelect = false) {
    this.surveyService.getAllUserLoyaltyPoints(this.currentUser.id).pipe(first()).subscribe(data => {
      console.log("loyalty points", data['data'].loyaltypoints);
      if (data['data'].loyaltypoints) {
        this.loyalt_points = data['data'].loyaltypoints;
        if(shouldSelect){
          this.rewardForm.get('rewardId').setValue(this.save_surveyReward[0].id);
        }
      }
    });
  }


  updateRewardProduct() {
    this.surveyrewardServices.updateProductReward(this.rewardForm.get('rewardId').value, { productId: this.pId })
      .pipe(first())
      .subscribe(
        dataobjct => {
          if (dataobjct['status']) {
            // this.router.navigate(['/pages/product']);
            const data = JSON.stringify({
              batch: dataobjct['data'].batch,
              product: dataobjct['data'].product
            });
            // this.utilityService.showSuccessToast('Product Creation Done')
            this.router.navigate(['/dashboard/products']);

            // if(this.currentUser.access_level < 1){
            //   this.router.navigate(['/dashboard/product']);
            // }else{
            //   this.router.navigate(['/dashboard/new-pin'], { queryParams: { data } , skipLocationChange: true});
            // }

          }
          else {
            // this.success_msg = dataobjct['message'];
          }
        },
        error => {
          this.alertService.showAlertNotification('warning!','Error processing request, please contact support', 'warning');
          this.loading = false;
        });
  }

}
