import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/_services/authentication.service';
import { SurveyService } from 'src/app/core/_services/survey.service';
import { User } from 'src/app/core/_models';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SurveyRewardService } from 'src/app/core/_services/surveyReward.service';
import { NavbarService } from 'src/app/core/_services/navbar.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css']
})
export class RewardsComponent implements OnInit {
  currentUserSubscription: Subscription;
  currentUser: User;
  availableRewards: any;
  p: number = 1;
  currentPage = 1;
  showModal: boolean = false;
  selectedReward: any;
  isReadonly: boolean = true;


  constructor(
    private surveyService: SurveyService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private surveyReward: SurveyRewardService,
    private navService: NavbarService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('User value', this.currentUser);
    });

    this.getRewards();
    this.navService.show()
  }

  ngOnInit(): void {
  }


  getRewards(){
    this.surveyService.getSurveyRewards(this.currentUser.id).subscribe((res: any)=>{
      console.log(res)
      this.availableRewards = res.data.rewards;
    })
  }
  goHome(){
    this.router.navigate(['/MAS'])
  }

  selectReward(e){
    console.log(e)
    const productSerialize = this.availableRewards.findIndex(item => item.id == e);
    this.selectedReward = this.availableRewards[productSerialize];
    this.showModal = !this.showModal;
    console.log(this.selectedReward)
  }

  updateReward(id){
    const body ={
      reward_name: "",
      reward_type: this.selectedReward.reward_type,
      reward_quantity: parseInt(this.selectedReward.reward_quantity),
      point_to_claim_reward: parseInt(this.selectedReward.point_to_claim_reward),
      reward_value: this.selectedReward.reward_value,
      campaign_id: this.selectedReward.campaignId
    }
    console.log(body)

    this.surveyReward.updateSurveyReward(id, body).subscribe((res: any)=>{
      console.log(res);
      if(res.statusCode == 200){
        this.showModal = false;
        this.getRewards()
      }

    })
  }

}
