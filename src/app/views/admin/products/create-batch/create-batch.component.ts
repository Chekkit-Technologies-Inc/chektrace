import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService, UserService, AlertService, SurveyService, SurveyRewardService, ProductService } from '../../../../core/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { noWhitespaceValidator } from '../../../../core/_helpers/whitespace-validator';
import { Subscription } from 'rxjs';
import { User } from '../../../../core/_models/user';
import bwipjs from 'bwip-angular2';

@Component({
  selector: 'app-create-batch',
  templateUrl: './create-batch.component.html',
  styleUrls: ['./create-batch.component.css']
})
export class CreateBatchComponent implements OnInit {
  stage = 1;
  dataForm: FormGroup;
  loading = false;
  submitted: boolean;
  currentUser: User;
  currentUserSubscription: Subscription;
  _slug: any;
  slug: string;
  subProductForm: FormGroup;
  save_survey: any;
  save_surveyReward: any;
  defaultReward: any;
  productObject: any;
  loyalty_points: any;
  success_msg: any;
  batches: any;
  requestLabelsForm: FormGroup;
  submitted2: boolean;
  loading2: boolean;
  showingSummary = false;
  selectedBatch: any;
  
  constructor(
    private productService: ProductService, 
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private activatedRoute: ActivatedRoute,
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


      this.slug = this.activatedRoute.snapshot.queryParams.q;
      this._slug = this.activatedRoute.snapshot.queryParams.j;
      console.log('product', (this.slug));
      this.getProduct();

      this.subProductForm = this.formBuilder.group({
        productId: [this.slug],
        product_name: ['', [Validators.required]],
        mode: [''],
        code_format: ['', [Validators.required]],
        expiry_date: ['', Validators.required],
        production_date: ['', Validators.required],
        survey_id: ['', Validators.required],
        reward_id: ['', Validators.required],
      });

      this.requestLabelsForm = this.formBuilder.group({
        subProductId: [0, [Validators.required]],
        quantity: ['', [Validators.required]]
      });

      this.getAllSurveys();
      this.getAllSurveyRewards();
      this.getAllLoyaltyPoints();
      this.getDefaultReward()
      this.get_Allbatches()
     }


    ngOnInit() {
      // this.generateQR()
    }

    ionViewWillEnter() {
    }

    generateQR() {
      console.log(1232332)
    
      // bwipjs('barcodeCanvas', {
      //   bcid: 'code128',        // Barcode type
      //   text: '987654321',   	  // Text to encode
      //   scale: 3,               // 3x scaling factor
      //   height: 10,             // Bar height, in millimeters
      //   width: 10,
      //   includetext: true,      // Show human-readable text
      //   textxalign: 'center',   // Always good to set this
      // }, (err, cvs) => {
      //   if (err) {
      //     document.getElementById('err').innerText = 'Error occured. See browser log for more information';
      //     console.log(err);
      //   } else {
      //   }
      // });
    }
    onBatchSelected(event) {
      
      console.log(event);
      if(event){
        this.selectedBatch = event;
        console.log(this.selectedBatch);

      }
   }

    get_Allbatches() {
      this.productService.getAllProductBatches(this.slug).pipe(first()).subscribe(data => {
        if (data['status']) {
          console.log(data['data'].productBatches);
          this.batches = data['data'].productBatches;
        }
      });
    }
    onSubmit() {
      console.log(this.slug)
      this.subProductForm.value.productId = JSON.parse(this.slug)

      this.submitted = true;
      // stop here if form is invalid
      console.log(this.subProductForm.value);
      console.log(this.subProductForm.invalid);
      if (this.subProductForm.invalid) {
        return;
      }
      this.loading = true;
      console.log(this.subProductForm.value);
      this.productService.create_batch(this.subProductForm.value)
        .pipe(first())
        .subscribe(
          dataRslt => {
            console.log(dataRslt)
            if (dataRslt['status']) {
                const data = JSON.stringify({
                  batch: dataRslt['data'],
                  product: this.productObject,
                });
                this.alertService.showAlertNotification('Success!','Your request is successful', 'success');
                const slug = this._slug;
                // this.router.navigate(['/dashboard/products/product-batches'], { queryParams: { slug } });
              this.router.navigate(['/dashboard/products/new-pin'], { queryParams: { data }, skipLocationChange: false });
            } else {
              this.success_msg = dataRslt['message'];
            }
          },
          error => {
            this.loading = false;
            this.alertService.showAlertNotification('warning!',error, 'warning');
          });
    }

    onSubmitRequest() {
      this.submitted2 = true;
      console.log(this.requestLabelsForm.value)
      // stop here if form is invalid
      this.requestLabelsForm.value.subProductId = JSON.parse(this.requestLabelsForm.value.subProductId.id)
      console.log(this.requestLabelsForm.value);
      if (this.requestLabelsForm.invalid) {
        return;
      }
      this.loading2 = true;
      this.productService.request_pin(this.requestLabelsForm.value)
        .pipe(first())
        .subscribe(
          dataRslt => {
            console.log(dataRslt)
            this.loading2 = false;

            if (dataRslt['status']) {
              //   const data = JSON.stringify({
              //     batch: dataRslt['data'],
              //     product: this.productObject,
              //   });
              //   this.alertService.showAlertNotification('Success!','Your request is successful', 'success');
              //   const slug = this._slug;
              //   // this.router.navigate(['/dashboard/products/product-batches'], { queryParams: { slug } });
              this.router.navigate(['/dashboard/products/']);
              alert("Request Successful")
            } else {
              this.success_msg = dataRslt['message'];
            }
          },
          error => {
            this.loading2 = false;
            this.alertService.showAlertNotification('warning!',error, 'warning');
          });
    }

    getAllSurveys() {
      this.surveyService.getAllUserSurveys(this.currentUser.id).pipe(first()).subscribe(data => {
        console.log('result of survey', data['data']);
        if (data['data'].surveys) {
          console.log('okay ooo', data['data'].surveys);
          this.save_survey = data['data'].surveys;
          localStorage.setItem('allsurveys', JSON.stringify(data['data'].surveys));
        }
      });
    }
    getAllSurveyRewards() {
      this.surveyRewardService.getAllSurveyReward(this.currentUser.id).pipe(first()).subscribe(data => {
        console.log('result of reward', data['data']);
        if (data['data'].rewards) {
          this.save_surveyReward = data['data'].rewards;
          console.log('rewards', this.save_surveyReward);
          localStorage.setItem('allsurveyRewards', JSON.stringify(data['data'].rewards));
        }
      });
    }
    getDefaultReward() {
      this.surveyRewardService.getDefaultReward$().pipe(first()).subscribe(data => {
        console.log("result of reward", data['data']);
        if (data['data']) {
          this.defaultReward = data['data'];
          console.log("reward", data['data']);
        }
      });
    }
    checkValue(event: any){
      console.log(event);
      if(event){
        // this.rewardForm.value.rewardId = this.defaultReward.id;
        this.subProductForm.controls['reward_id'].setValue(this.defaultReward.id);
  
        // console.log(44433434)
      }
   }
  
  
    getProduct() {
      this.productService.getProduct(this.slug).pipe(first()).subscribe(data => {
        console.log("result of surveyy", data);
        if (data) {
          console.log('okay ooo', data);
          this.productObject = data;
          this.subProductForm.get('productId').setValue(this.productObject.id);

          this.getAllSurveys();
          this.getAllSurveyRewards();
          this.getAllLoyaltyPoints();
          // this.get_Allbatches()

        }
      });
    }


    getAllLoyaltyPoints() {
      this.surveyService.getAllUserLoyaltyPoints(this.currentUser.id).pipe(first()).subscribe(data => {
        console.log("loyalty points", data['data'].loyaltypoints);
        if (data['data'].loyaltypoints) {
          this.loyalty_points = data['data'].loyaltypoints;
        }
      });
    }
  
    // convenience getter for easy access to form fields
    get f() { return this.subProductForm.controls; }
 

}
