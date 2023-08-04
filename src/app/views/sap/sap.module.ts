import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SapRoutingModule } from './sap-routing.module';
import { AnalyticsComponent } from './analytics/analytics.component';
import { SapAssignSurveysComponent } from './sap-assign-surveys/sap-assign-surveys.component';
import { RequestSerialComponent } from './request-serial/request-serial.component';
import { UniqueIdComponent } from './unique-id/unique-id.component';
import { QuicklinksComponent } from './quicklinks/quicklinks.component';
import { SummaryComponent } from './summary/summary.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { AssignSurveyComponent } from './assign-survey/assign-survey.component';
import { BatchComponent } from './batch/batch.component';
import { SapAssignRewardsComponent } from './sap-assign-rewards/sap-assign-rewards.component';
import { AttachRewardComponent } from './attach-reward/attach-reward.component';
import { AttachRewardsComponent } from './attach-rewards/attach-rewards.component';
import { ConnectComponent } from './connect/connect.component';
import { LinkAccountComponent } from './link-account/link-account.component';
import { ProductAnalyticsComponent } from './product-analytics/product-analytics.component';
import { RequestPinComponent } from './request-pin/request-pin.component';
import { SapDashboardComponent } from './sap-dashboard/sap-dashboard.component';
import { SapHomeComponent } from './sap-home/sap-home.component';
import { SetupSurveysComponent } from './setup-surveys/setup-surveys.component';


@NgModule({
  declarations: [
    AnalyticsComponent,
    AssignSurveyComponent,
    AttachRewardComponent,
    AttachRewardsComponent,
    BatchComponent,
    ConnectComponent,
    LinkAccountComponent,
    ProductAnalyticsComponent,
    RequestPinComponent,
    SapDashboardComponent,
    SapHomeComponent,
    SetupSurveysComponent,
    SapAssignSurveysComponent,
    RequestSerialComponent,
    UniqueIdComponent,
    QuicklinksComponent,
    SummaryComponent,
    SubscriptionComponent,
    AssignSurveyComponent,
    BatchComponent,
    SapAssignSurveysComponent,
    SapAssignRewardsComponent
  ],
  imports: [
    CommonModule,
    SapRoutingModule,
  ]
})
export class SapModule { }
