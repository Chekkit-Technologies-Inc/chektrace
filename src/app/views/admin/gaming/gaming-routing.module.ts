import { TriviaComponent } from './trivia/trivia.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamingDashboardComponent } from './gaming-dashboard/gaming-dashboard.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { RewardsComponent } from './rewards/rewards.component';
import { RedemptionSiteComponent } from './redemption-site/redemption-site.component';

const routes: Routes = [
  {
    path: "",
    component: GamingDashboardComponent
  },{
    path: "overview",
    component: GamingDashboardComponent
  },{
    path: "leaderboard",
    component: LeaderboardComponent
  },{
    path: "rewards",
    component: RewardsComponent
  },{
    path: "redemption",
    component: RedemptionSiteComponent
  },{
    path: 'trivia',
    component: TriviaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamingRoutingModule { }
