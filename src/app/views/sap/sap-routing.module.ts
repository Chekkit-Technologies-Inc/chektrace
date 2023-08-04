import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AssignSurveyComponent } from './assign-survey/assign-survey.component';
import { AttachRewardComponent } from './attach-reward/attach-reward.component';
import { AttachRewardsComponent } from './attach-rewards/attach-rewards.component';
import { BatchComponent } from './batch/batch.component';
import { ConnectComponent } from './connect/connect.component';
import { LinkAccountComponent } from './link-account/link-account.component';
import { ProductAnalyticsComponent } from './product-analytics/product-analytics.component';
import { QuicklinksComponent } from './quicklinks/quicklinks.component';
import { RequestPinComponent } from './request-pin/request-pin.component';
import { RequestSerialComponent } from './request-serial/request-serial.component';
import { SapAssignRewardsComponent } from './sap-assign-rewards/sap-assign-rewards.component';
import { SapAssignSurveysComponent } from './sap-assign-surveys/sap-assign-surveys.component';
import { SapDashboardComponent } from './sap-dashboard/sap-dashboard.component';
import { SapHomeComponent } from './sap-home/sap-home.component';
import { SetupSurveysComponent } from './setup-surveys/setup-surveys.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SummaryComponent } from './summary/summary.component';
import { UniqueIdComponent } from './unique-id/unique-id.component';

const routes: Routes = [
  { path: "sap-assign-rewards", component: SapAssignRewardsComponent },
  { path: "sap-assign-surveys", component: SapAssignSurveysComponent },
  { path: "product-analytics", component: ProductAnalyticsComponent },
  { path: "analytics", component: AnalyticsComponent },
  { path: "assign-survey", component: AssignSurveyComponent },
  { path: "quicklinks", component: QuicklinksComponent },
  { path: "unique-id", component: UniqueIdComponent },
  { path: "subscription", component: SubscriptionComponent },
  { path: "link-account", component: LinkAccountComponent },
  { path: "summary", component: SummaryComponent },
  { path: "attach-reward", component: AttachRewardComponent },
  { path: "attach-rewards", component: AttachRewardsComponent },
  { path: "setup-surveys", component: SetupSurveysComponent },
  { path: "batch", component: BatchComponent },
  { path: "connect", component: ConnectComponent },
  { path: "home", component: SapHomeComponent },
  { path: "dashboard", component: SapDashboardComponent },
  { path: "request-serial", component: RequestSerialComponent },
  { path: "request-pin", component: RequestPinComponent },
      { path: "", redirectTo: "home", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SapRoutingModule { }
 