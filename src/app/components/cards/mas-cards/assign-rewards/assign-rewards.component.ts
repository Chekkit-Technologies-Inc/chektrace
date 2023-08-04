import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SurveyRewardService } from 'src/app/core/_services/surveyReward.service';
import { SurveyService } from 'src/app/core/_services/survey.service';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/_services/authentication.service';
import { User } from 'src/app/core/_models/user';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-assign-rewards',
  templateUrl: './assign-rewards.component.html',
  styleUrls: ['./assign-rewards.component.css']
})
export class AssignRewardsComponent implements OnInit {
  @Output() selectedRewardId:EventEmitter<boolean> = new EventEmitter();
  @Output() completedReward:EventEmitter<boolean> = new EventEmitter();
  showModal = false;
  showMerchModal = false;
  lastImage: string | ArrayBuffer;
  showExisting = false;
  rewards: any = [];
  airtime_value: any;
  airtime_units: any;
  rewardNum = 1;
  reward_point: any;
  currentUserSubscription: Subscription;
  currentStep = 1;
  availableProducts: [];
  currentUser: User;
  save_products: any;
  loading: boolean = false;
  reward_value: any;
  reward_quantity: any;
  availableRewards: any;
  rewardId: any;
  endReward: boolean;
  myForm: FormGroup;
  formValue: any;
  imageSrc: string;

  constructor(
    private authenticationService: AuthenticationService,
    private surveyService: SurveyRewardService,
    private surService: SurveyService,
    private formBuilder: FormBuilder,
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('User value', this.currentUser);
    });
    this.getRewards()

  }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      reward_quant: [0, Validators.required],
      reward_point: [0, Validators.required],
      reward_value: [0, Validators.required],
      photo: [null, Validators.required],
      campaign_id: [null, Validators.required],
      reward_type: ["merchandise", Validators.required]
    });

    this.myForm.valueChanges.subscribe()
  }

  get f(){
    return this.myForm.controls;
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.get('photo').setValue(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
          this.lastImage = reader.result;
          console.log(reader.result);
          // this.imageSelected = true;
      }
    }
  }

  submit(){
    this.loading = true;
    const formData = new FormData();
    console.log(this.myForm.valid);
    formData.append('photo', this.myForm.get('photo').value);

    formData.append('reward_quant', this.myForm.get('reward_quant').value);
    formData.append('reward_point', this.myForm.get('reward_point').value);
    formData.append('reward_value', this.myForm.get('reward_value').value);


    console.log(this.myForm.value);
    this.formValue = this.myForm.value;

    this.surveyService.createMerchatReward(this.currentUser.id, this.myForm.value).subscribe((res: any)=>{
      this.loading = false;
      console.log(res)
    })
  }




  toggleAirtime(){
    this.showModal = !this.showModal;
    // this.showMerchModal = !this.showMerchModal;
  }

  toggleMerch(){
    this.showMerchModal = !this.showMerchModal;
    // this.showModal = !this.showModal;
  }

  toggleExisting(){
    this.showExisting = !this.showExisting;
  }

  addMerchandize(){
    this.loading = true;
    const body = {
      "photo" : '',
      "reward_type": "merchandize",
      "reward_quant": this.reward_quantity,
      "reward_value":this.reward_value,
      "reward_point":this.reward_point,
      "campaign_id": '0'
    }
    console.log(body)

    this.surveyService.createMerchatReward(this.currentUser.id, body).subscribe((res)=>{
      this.loading = false;
      console.log(res)
    })

  }

  selectReward(e){
    console.log(e)
    this.rewardId = e;
    if(e){
      this.selectedRewardId.emit(this.rewardId);
      this.showExisting = !this.showExisting;
    }
  }

  finish(){
    this.loading = true;
    setTimeout(()=>{
      this.endReward = true;
      this.completedReward.emit(this.endReward);
      this.loading = false;
    }, 1000)
  }

  addNewAirtime(){
    const rewardObject = {
      reward_value: this.airtime_value,
      reward_quant: this.airtime_units,
      reward_type: "airtime",
    };
    this.rewards.push(rewardObject);
    this.airtime_value = '';
    this.airtime_units = '';
    console.log(this.rewards)
  }

  addAirtimeReward(){

    this.loading = true;
    const body = {
      "rewards": this.rewards,
      "campaign_id": 0
    }
    this.surveyService.createReward(this.currentUser.id, body).subscribe((response: any) => {
      this.loading = false;
      console.log(response)
      if(response.status == true){
        this.showModal = !this.showModal;
      }
    })

    console.log(body)
  }

  removeReward(e){
    console.log(e)
    const item = this.rewards.findIndex(item => item.reward_value === e );

    this.rewards.splice(item, 1)
  }

  getRewards(){
    this.surService.getSurveyRewards(this.currentUser.id).subscribe((res: any)=>{
      console.log(res)
      this.availableRewards = res.data.rewards;
    })
  }

}
