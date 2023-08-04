import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, SurveyService, SurveyRewardService, AlertService, ProductService,RestService } from '../../../core/_services';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { User } from '../../../core/_models';
import { UserService } from '../../../core/_services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'card-reward-statitics',
  templateUrl: './card-reward-statitics.component.html',
  styleUrls: ['./card-reward-statitics.component.css']
})
export class CardRewardStatiticsComponent implements OnInit {
  color = 'light';
  winnersStats: any;
  rewards: any;
  participantsStats: any;
  selectedReawrd: any;
  currentUser: User;
  currentUserSubscription: Subscription;
  rewardId: any;
  save_survey: any;
  rows: any;
  myDate = new Date();
  aWeekBefore = new Date(this.myDate.getTime() - 60 * 60 * 24 * 7 * 1000);
  aMonthTime = new Date(this.myDate.getTime() + 60 * 60 * 24 * 30 * 1000);

  public filterOptions = {
    startDate : moment(this.aWeekBefore).format('YYYY-MM-DD'),
    endDate : moment(this.myDate).format('YYYY-MM-DD'),
    productId : "",
  };
  reward: any;


  constructor(
    private productService: ProductService,
    private surveyrewardServices: SurveyRewardService, 
    private _rest: RestService, 
    private authenticationService: AuthenticationService, 
    private surveyService: SurveyService,
    ) {

      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        this.currentUser = user;
        console.log('User value', this.currentUser);
      });

      this.productService.statsFilter$.subscribe(data => {
        this.filterOptions = data;
        console.log('User value', this.filterOptions);
      });

    }

    ngOnInit(): void {
      this.getAllSurveyRewards()
    }

    getInsightsRewardStats(rewardId){
      this._rest.getUserInsightRewardWinners$(rewardId).pipe(first()).subscribe(data => {
        this.winnersStats = data['data'];

        console.log(data['data']);
      });;
    }

  getRaffleParticipantsStats(){
      this._rest.getRaffleParticipantsStats$(this.rewardId ).pipe(first()).subscribe(data => {
        this.participantsStats = data['data'];

        console.log(data['data']);
      });;
    }

    
    getTotalRewardGiven(){

      this._rest.getTotalRewardGiven$(this.rewardId).pipe(first()).subscribe(data => {
        this.winnersStats = data['data'];

        console.log(data['data']);
      });;
    }


    getAirtimeRewardStats(reward){
      console.log(reward)
      this.rewardId = reward.id;
      this.selectedReawrd = reward;
      this._rest.getAirtimeRewardStats$(this.rewardId).pipe(first()).subscribe(data => {
        // this.winnersStats = data['data'];
        this.rows = data['data'];

        console.log(data['data']);
      });;
      this.getTotalRewardGiven();
      this.getRaffleParticipantsStats();
    }

    getRewardGivenTotal(rewardId){
      this._rest.getRewardGivenTotal$(rewardId).pipe(first()).subscribe(data => {
        console.log(data['data']);
        this.winnersStats = data['data'];
      });;
    }

    getAllCampaignParticipants(campaignId){
      this._rest.getAllCampaignParticipants$(campaignId).pipe(first()).subscribe(data => {
        console.log(data['data']);
        // this.rows = data['data'];
      });;
    }


  getAllSurveyRewards() {
    this.surveyrewardServices.getAllUserSurveyReward(this.currentUser.id).pipe(first()).subscribe(data => {
      console.log("result of reward", data['data']);
      if (data['data']) {
        this.rewards = data['data'];
        console.log("rewards", this.rewards);
        this.rewardId = this.rewards[0].id
        this.getAirtimeRewardStats(this.rewards[0].id)
        this.getRewardGivenTotal(this.rewards[0].id)
      }
    });
  }

}
