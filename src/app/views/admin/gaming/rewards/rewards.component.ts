import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/_models';
import { AuthenticationService, SurveyRewardService } from 'src/app/core/_services';
import { ProductService } from 'src/app/core/_services/product.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css']
})
export class RewardsComponent {
  currentUserSubscription: Subscription;
  currentUser: User;
  rewards: any;
  currentStep = 1
  constructor(
    private productService: ProductService,
    private rewardService: SurveyRewardService,
    private authenticationService: AuthenticationService,
  ){
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('User value', this.currentUser);
    });
    this.getRewards()
  }

  getRewards(){
    this.rewardService.getAllSurveyReward(this.currentUser.id).subscribe((res: any)=>{
      console.log(res);
      this.rewards = res.data.rewards;
    })
  }


}
