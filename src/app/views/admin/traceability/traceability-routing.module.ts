
// import { UserManagementComponent } from './user-management/user-management.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AssignSurveyComponent } from './assign-survey/assign-survey.component';
import { AttachRewardsComponent } from './attach-rewards/attach-rewards.component';
import { AuthScanAreaComponent } from './auth-scan-area/auth-scan-area.component';
import { GenerateSerialComponent } from './generate-serial/generate-serial.component';
import { LinkAccountComponent } from './link-account/link-account.component';
import { PackagingHierarchyComponent } from './packaging-hierarchy/packaging-hierarchy.component';
import { PackagingLevelComponent } from './packaging-level/packaging-level.component';
import { ProductsComponent } from './products/products.component';
import { QuicklinksComponent } from './quicklinks/quicklinks.component';
import { RequestPinComponent } from './request-pin/request-pin.component';
import { SelectDestinationComponent } from './select-destination/select-destination.component';
import { SerialNumberSummaryComponent } from './serial-number-summary/serial-number-summary.component';
import { SetupSurveyComponent } from './setup-survey/setup-survey.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { TraceabilityAttachRewardComponent } from './traceability-attach-reward/traceability-attach-reward.component';
import { TraceabilityMapComponent } from './traceability-map/traceability-map.component';
import { TraceabilitySurveySetupComponent } from './traceability-survey-setup/traceability-survey-setup.component';

const routes: Routes = [
  { path: 'link-account', component: LinkAccountComponent},
  { path: 'commission/:id', component: RequestPinComponent },
  { path: 'inventory', component: SubscriptionComponent },
  { path: 'product-recall', component: GenerateSerialComponent },
  { path: 'package-level', component: PackagingLevelComponent },
  { path: 'package-hierarchy', component: PackagingHierarchyComponent },
  { path: 'select-destination', component: SelectDestinationComponent },
  { path: 'receive/:id', component: SerialNumberSummaryComponent },
  { path: 'unpack/:id', component: AssignSurveyComponent },
  { path: 'pack', component: AttachRewardsComponent },
  { path: 'setup-surveys', component: SetupSurveyComponent },
  { path: 'stocks', component: AuthScanAreaComponent },
  { path: 'analytics', component: AnalyticsComponent },
  { path: 'quicklinks', component: QuicklinksComponent },
  { path: 'management', component: TraceabilityAttachRewardComponent },
  { path: 'retail', component: TraceabilityMapComponent },
  { path: 'survey-setup', component: TraceabilitySurveySetupComponent },
  { path: 'products', component: ProductsComponent },
  { path: "", component: LinkAccountComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent },
  // { path: 'management', component: UserManagementComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraceabilityRoutingModule { }
