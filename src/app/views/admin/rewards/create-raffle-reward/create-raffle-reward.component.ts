import { ChangeDetectorRef,Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService, UserService, AlertService, SurveyService, SurveyRewardService } from '../../../../core/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { noWhitespaceValidator } from '../../../../core/_helpers/whitespace-validator';
import { Subscription } from 'rxjs';
import { User } from '../../../../core/_models/user';

@Component({
  selector: 'app-create-raffle-reward',
  templateUrl: './create-raffle-reward.component.html',
  styleUrls: ['./create-raffle-reward.component.css']
})
export class CreateRaffleRewardComponent implements OnInit {
  stage = 1;
  editing = {};
  rows = [];
  temp = [];
  loadingIndicator = true;
  photoSelected = false;
  closeResult: any;
  data: any;
  surveyForm: FormGroup;
  loading = false;
  uploading = false;
  adding = false;
  loyalt_points: any;
  currentUser: User;
  currentUserSubscription: Subscription;
  user_recordCounts: any;
  raffleForm: FormGroup;
  raffleImageForm: FormGroup;
  submitted: boolean;
  success_msg: any;
  raffleData = {
    reward_value : '',
    reward_type: 'Raffle',
    point_to_claim_reward: '1',
    reward_quantity: 1,
    gifts:[]
  };

  gift = {
    photo: null,
    name: '',
    quantity:1
  }
  currentGiftIndex = 0;
  @ViewChild('giftPhoto',{static:true}) myInputVariable: ElementRef;
  raffles: any;


  dataForm: FormGroup;
  submitted2: boolean;

  constructor(
    private router: Router, 
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
    private surveyService: SurveyService,
    private formBuilder: FormBuilder, 
    private changeDetectorRef: ChangeDetectorRef,
    private userService: UserService
    ) {
      
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user.data;
      console.log('User value', this.currentUser);
    });
    setTimeout(() => { this.loadingIndicator = false; }, 1500);
    this.raffleImageForm = this.formBuilder.group({
      photo: ['', Validators.required],
    });
  }
  get f() { return this.raffleImageForm.controls; }

  ngOnInit() {
    this.dataForm = this.formBuilder.group({
      reward_value: ['er', Validators.required],
      reward_type: ['Raffle', Validators.required],
      point_to_claim_reward: ['1', Validators.required],
      reward_quantity: ['1', Validators.required]
      // userId: ['', Validators.required],
    });
  }
  
  
  async onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log();
      this.getBase64(file)
      this.raffleImageForm.get('photo').setValue(file);

      // this.gift.photo = await this.getBase64(file);
    this.uploading = true;
    // console.log(this.productForm.value);
    const formData = new FormData();
    formData.append('photo', this.raffleImageForm.get('photo').value);
    // console.log(this.raffleImageForm.get('photo').value)
    console.log(formData)
   


    this.surveyService.uploadGiftImage(formData)
      .pipe(first())
      .subscribe(
        data => {
          console.log('ok>>', data);
          this.uploading = false;
          if (data) {
            this.gift.photo = data['data'];
            event.srcElement.value = null;
          }
          else {
            this.success_msg = data['message'];
          }
        },
        error => {          
          this.alertService.showAlertNotification('warning!',error, 'warning');
          this.uploading = false;
        });

      console.log(this.gift.photo)
      this.photoSelected = true;

      this.changeDetectorRef.detectChanges();
  
    }
  }

  // onSubmit() {
  // }
  
  ViewRaffle(d) {
    console.log("product", d);
    let data = JSON.stringify(d.id);
    this.router.navigate(['/pages/view-raffle'], { queryParams: { data } });
  }
  resetForm(){
    this.raffleData = {
      reward_value : '',
      reward_type: 'Raffle',
      point_to_claim_reward: '1',
      reward_quantity: 1,
      gifts:[]
    };
  
    this.gift = {
      photo: null,
      name: '',
      quantity:1
    }
    this.raffleImageForm.get('photo').setValue(null);
  }

  getBase64(file) {
    let env = this;
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      // console.log(reader.result);
      // env.gift.photo = reader.result;
      return reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }
 switchToGift(i) {
   this.gift = this.raffleData.gifts[i];

   this.currentGiftIndex = i;
 }
 saveGift(){
   console.log(this.gift)
   this.submitted2 = true;
   
   if(!this.gift.name || !this.gift.photo || !this.gift.quantity){
     return false;
   }

  //  this.raffleData.gifts.push(this.gift);
   this.raffleData.gifts[this.currentGiftIndex] = this.gift;

   
   console.log(this.raffleData)

   this.changeDetectorRef.detectChanges();


 }



 addGift(){
  console.log(this.gift)
  this.saveGift();
  
  this.gift = {
   photo: null,
   name: '',
   quantity:1
 }
 this.photoSelected = false;
 
 this.raffleData.gifts.push(this.gift);

 this.currentGiftIndex +=1;

  console.log(this.raffleData)
  this.changeDetectorRef.detectChanges();


}


  toggleAdding() {
    this.adding = !this.adding;
  }

  onSubmit() {
    this.submitted = true;
    this.saveGift();
    this.loading = true;
    console.log(this.raffleData);
    this.surveyService.addRaffleDraw(this.raffleData)
      .pipe(first())
      .subscribe(
        data => {
          console.log("ok>>", data['data']);
          if (data['status']) {
            this.resetForm()
            this.adding = false;
            this.loading = false;

            // this.router.navigate(['/pages/loyalty-points']);
          }
          else {
            this.success_msg = data['message'];
            this.loading = false;
          }
        },
        error => {
          this.alertService.showAlertNotification('warning!',error, 'warning');
          this.loading = false;
        });
  }

  deleteRaffle(id) {
    this.surveyService.deleteRaffle(id)
      .pipe(first())
      .subscribe(
        data => {
          console.log("ok>>", data['data']);
          if (data['status']) {
            this.resetForm()
            this.adding = false;
            // this.router.navigate(['/pages/loyalty-points']);
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
