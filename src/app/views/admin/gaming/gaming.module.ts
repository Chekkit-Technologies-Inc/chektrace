import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamingRoutingModule } from './gaming-routing.module';
import { GamingDashboardComponent } from './gaming-dashboard/gaming-dashboard.component';
import { RedemptionSiteComponent } from './redemption-site/redemption-site.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { RewardsComponent } from './rewards/rewards.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TriviaComponent } from './trivia/trivia.component';


@NgModule({
  declarations: [
    GamingDashboardComponent,
    RedemptionSiteComponent,
    LeaderboardComponent,
    RewardsComponent,
    TriviaComponent
  ],
  imports: [
    CommonModule,
    GamingRoutingModule,
    FormsModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule
  ]
})
export class GamingModule { }
