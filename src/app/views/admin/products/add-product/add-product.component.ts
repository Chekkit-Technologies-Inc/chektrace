import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../../../core/_models/user';
import { Subscription } from 'rxjs';
import { ProductService, AuthenticationService, SurveyService, AlertService, SurveyRewardService } from '../../../../core/_services';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { of } from 'rxjs';
// import { AddSurveyModal } from '../../../../core/shared/modals/add-survey/add-survey.component';
// import { AddRewardComponent } from '../../shared/modals/add-reward/add-reward.component';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  firstForm: FormGroup;
  secondForm: FormGroup;
  thirdForm: FormGroup;
  imageUrl: any;
  editing = {};
  rows = [];
  temp = [];
  success_msg: any;
  loadingIndicator = true;
  reorderable = true;
  closeResult: any;
  data: any;
  productObjct: any;
  loyalt_points: any;
  productForm: FormGroup;
  surveyForm: FormGroup;
  rewardForm: FormGroup;
  pinForm: FormGroup;
  form: FormGroup;
  loading = false;
  submitted = false;
  save_products: any;
  save_surveyReward: any;
  save_survey: any;
  selectChange: any;
  currentUser: User;
  loyalty = true;
  others = true;
  currentUserSubscription: Subscription;
  showModal = false;
  surveyType = '';
  openTab = 1;
  submitted2: boolean;

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
    this.getAllSurveys();
    this.getAllSurveyRewards();
    this.getAllLoyaltyPoints();
    setTimeout(() => { 
      this.loadingIndicator = false; 
      // console.log(777)
    }, 1500);

   }

  toggleTabs($tabNumber: number){
    this.openTab = $tabNumber;
  }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      product_name: ['', Validators.required],
      producer_name: ['', Validators.required],
      product_description: ['', Validators.required],
      batch_num: ['', Validators.required],
      fda_num: ['', Validators.required],
      expiry_date: ['', Validators.required],
      id_range: ['', Validators.required],
      product_category: ['', Validators.required],
      barcode_num: ['', Validators.required],
      production_date: ['', Validators.required],
      age_range: ['', Validators.required],
      photo: ['', Validators.required],
    });
    this.surveyForm = this.formBuilder.group({
      surveyId: ['', Validators.required],
    });
    this.rewardForm = this.formBuilder.group({
      rewardId: ['', Validators.required],
    });
    this.firstForm = this.fb.group({
      firstCtrl: ['', Validators.required],
    });

    this.secondForm = this.fb.group({
      secondCtrl: ['', Validators.required],
    });

    this.thirdForm = this.fb.group({
      thirdCtrl: ['', Validators.required],
    });
  }
  
  getAllSurveys(shouldSelect = false) {
    this.loading =true;
    this.surveyService.getAllUserSurveys(this.currentUser.id).pipe(first()).subscribe(data => {
      this.loading =false;
      console.log("result of survey", data['data']);
      if (data['data'].surveys) {
        console.log('okay ooo', data['data'].surveys);
        // this.data = data['data'].surveys;
        this.save_survey = data['data'].surveys;
        if(shouldSelect){
          this.surveyForm.get('surveyId').setValue(this.save_survey[0].id);
          // console.log(this.save_survey[0].id)
          // this.dd = this.save_survey[0].id;
        }
        localStorage.setItem('allsurveys', JSON.stringify(data['data'].surveys));
      }
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
        this.onChange("Loyalty Point");
      }
    });
  }

  get f() { return this.productForm.controls; }
  get g() { return this.surveyForm.controls; }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.productForm.get('photo').setValue(file);
    }
  }

  onSubmit() {
    console.log('get here');
    this.submitted = true;
    // stop here if form is invalid
    console.log(this.productForm.invalid);
    if (this.productForm.invalid) {
      return false;
    }
    this.loading = true;
    console.log(this.productForm.value);
    const formData = new FormData();
    formData.append('photo', this.productForm.get('photo').value);
    formData.append('product_description', this.productForm.get('product_description').value);
    formData.append('product_name', this.productForm.get('product_name').value);
    formData.append('producer_name', this.productForm.get('producer_name').value);
    formData.append('batch_num', this.productForm.get('batch_num').value);
    formData.append('FDA_number', this.productForm.get('fda_num').value);
    formData.append('barcode_num', this.productForm.get('barcode_num').value);
    formData.append('id_range', this.productForm.get('id_range').value);
    formData.append('age_range', this.productForm.get('age_range').value);
    formData.append('expiry_date', this.productForm.get('expiry_date').value);
    formData.append('production_date', this.productForm.get('production_date').value);
    formData.append('product_category', this.productForm.get('product_category').value);

    this.productService.create_product(formData)
      .pipe(first())
      .subscribe(
        data => {
          console.log('ok>>', data);
          if (data["status"]) {
            console.log('oka 3 >>', data['data']);
            this.data = data['data'];
            this.loading = false;
            this.openTab = 2;
            // this.showNextStep();
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


  onChange(evnt: any) {
    console.log('yeah', evnt);
    if (evnt == 'Loyalty Point') {
      this.loyalty = false;
      this.others = true;
    } else if (evnt == 'Airtime/Merchandize') {
      this.loyalty = true;
      this.others = false;
    }
  }

  updateSurveyProduct() {
    this.submitted2 = true;
    this.loading = true;
    console.log('yeah');
    // surveyForm
    if (this.surveyForm.invalid) {
      return false;
    }
    this.surveyService.updateProductSurvey(this.surveyForm.get('surveyId').value, { productId: this.data.id })
      .pipe(first())
      .subscribe(
        data => {
          console.log('ok>>', data);
          if (data['status']) {
            this.loading = false;
            console.log('oka 3 >>', data);
            this.openTab = 3;
            // this.showNextStep();
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

  updateRewardProduct() {
    this.surveyrewardServices.updateProductReward(this.rewardForm.get('rewardId').value, { productId: this.data.id })
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
              this.alertService.showAlertNotification('Success!','Your request is successful', 'success');
            this.router.navigate(['/dashboard/products']);

            // if(this.currentUser.access_level < 1){
            //   this.router.navigate(['/dashboard/product']);
            // }else{
            //   this.router.navigate(['/dashboard/new-pin'], { queryParams: { data } , skipLocationChange: true});
            // }

          }
          else {
            this.success_msg = dataobjct['message'];
          }
        },
        error => {
          this.alertService.showAlertNotification('warning!',error, 'warning');
          this.loading = false;
        });
  }

}
