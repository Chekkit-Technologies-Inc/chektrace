import { Component } from '@angular/core';
import { AlertService, ProductService } from 'src/app/core/_services';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent {
  active: boolean =true;
  active2: boolean = false;
  active3: boolean;
  loading: boolean = false;
  step = 1;
  dailyBoard: any;
  weeklyBoard: any;
  allTimeboard: any;
  leaderboard: any;
  selectedProfile: any;
  selectedFirstName: any;
  selectedLastName: any;
  selectedDOB: any;
  selectedPoint: any;
  showModal: boolean = false;
  availableRewards: any;
  rewardId = null;
  userIds = [];
  selectedId: any;
  constructor(
    private productService: ProductService,
    private alertService: AlertService
  ){
    this.getLeaderboardList();
    this.getLeaderboardUser();
    this.getRewards();
  }

  getRewards(){
    this.productService.getFmnRewards().subscribe((res: any)=>{
      console.log(res)
      this.availableRewards = res.data;
    },(error)=>{
      this.alertService.showAlertNotification('error','Check that you are connected to the internet and try again later','error')
    })
  }

  selectReward(id){
    this.rewardId = id;
    console.log(this.rewardId)
  }

  selectUser(e){
    if(e.target.checked){
      this.selectedId = e.target.value;
      this.userIds.push(this.selectedId);

      console.log(this.userIds)
    }else{
      const itemDelete: number = this.userIds.indexOf(e.target.value);
      if(itemDelete !== -1){
        this.userIds.splice(itemDelete, 1);
        console.log(this.userIds)
      }

    }

  }

  selectWinners(){

    this.loading = true;
    const body = {
      "reward_id": parseInt(this.rewardId),
      "user_ids": this.userIds
    }

    this.productService.selectWinners(body).subscribe((res: any)=>{
      console.log(res)
      this.loading = false;
      if(res.statusCode === 200){
        this.alertService.showAlertNotification('Success','Congratulatory message is on the way!','success')
        this.getLeaderboardUser();
      }else{
        this.alertService.showAlertNotification('error', res.message,'error')
      }
    },(error)=>{
      this.alertService.showAlertNotification('Error','Check that you are connected to the internet and try again later','error')
      this.loading = false;
    })
  }

  getLeaderboardList(){
    this.productService.getLeaderboardList().subscribe((res: any)=>{
      console.log(res)
      if(res.statusCode === 200){
        this.dailyBoard = res.data.daily;
        this.weeklyBoard = res.data.weekly;
        this.allTimeboard = res.data.allTime;
      }
    })
  }

  getLeaderboardUser(){
    this.productService.getLeaderboardUser().subscribe((res: any)=>{
      console.log(res)
      if(res.statusCode === 200){
        this.leaderboard = res.data
      }
    },(error)=>{
      console.log(error)
    })
  }

  viewProfile(id){

    const selectedProfile = this.leaderboard.findIndex(item => item.id === id);
    this.selectedProfile = this.leaderboard[selectedProfile];
    // console.log(this.selectedProfile)
    this.showModal = true;
    this.selectedFirstName = this.selectedProfile.user.first_name;
    this.selectedLastName = this.selectedProfile.user.last_name;
    this.selectedDOB = this.selectedProfile.user.age_range;
    this.selectedPoint = this.selectedProfile.allPoints;
  }

  selectTab(){
    this.active = true;
  }

  toggleDaily(){
    this.active = true;
    this.active2 = false;
    this.active3 = false;
  }

  toggleWeekly(){
    this.active2 = true;
    this.active = false;
    this.active3 = false;
  }

  toggleAlltime(){
    this.active2 = false;
    this.active = false;
    this.active3 = true;
  }



}
