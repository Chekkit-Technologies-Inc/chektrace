import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveCampaignComponent } from './active-campaign/active-campaign.component';
import { AddSurveyComponent } from './add-survey/add-survey.component';
import { CampaignSummaryComponent } from './campaign-summary/campaign-summary.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { FlowsComponent } from './flows/flows.component';
import { GetConnectedComponent } from './get-connected/get-connected.component';
import { MasLinkAccountComponent } from './mas-link-account/mas-link-account.component';
import { NewCampaignComponent } from './new-campaign/new-campaign.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductIdentificationComponent } from './product-identification/product-identification.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { ProductPinComponent } from './product-pin/product-pin.component';
import { ProductsComponent } from './products/products.component';
import { QuickRequestComponent } from './quick-request/quick-request.component';
import { QuicklinksComponent } from './quicklinks/quicklinks.component';
import { RewardsComponent } from './rewards/rewards.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { SettingsComponent } from './settings/settings.component';
import { StickerLabelsComponent } from './sticker-labels/sticker-labels.component';
import { SurveysComponent } from './surveys/surveys.component';
import { UserManagementComponent } from '../../../components/user/user-management/user-management.component';
import { DashboardComponent } from './dashboard/dashboard.component'

const routes: Routes = [
  { path: "", redirectTo: "quicklinks", pathMatch: "full" },
  {path: "flows", component: FlowsComponent},
  { path: "get-connected", component: GetConnectedComponent },
  { path: "product-onboarding", component: OnboardingComponent },
  { path: "products", component: ProductsComponent },
  { path: "product-info", component: ProductInfoComponent },
  { path: "product-identity/:id", component: ProductIdentificationComponent },
  {
    path: "product-pin", component: ProductPinComponent
  },
  { path: "campaigns", component: CampaignsComponent },
  { path: "new-campaign", component: NewCampaignComponent },
  { path: "add-survey/:id", component: AddSurveyComponent },
  { path: "sticker-label", component: StickerLabelsComponent },
  { path: "summary", component: CampaignSummaryComponent },
  { path: "active-campaign", component: ActiveCampaignComponent },
  { path: "survey", component: SurveysComponent },
  { path: "rewards", component: RewardsComponent },
  { path: "settings", component: SettingsComponent },
  { path: "mas-link-account", component: MasLinkAccountComponent },
  // { path: "user-management", component: UserManagementComponent },
  { path:"user-management", component: RoleManagementComponent },
  { path: "quicklinks", component: QuicklinksComponent },
  { path: "quick-request", component: QuickRequestComponent },
  { path: "orders", component: OrdersComponent  },
  { path: "dashboard", component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AntiFakeRoutingModule { }
