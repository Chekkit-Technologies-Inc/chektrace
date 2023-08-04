import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AntiFakeRoutingModule } from './anti-fake-routing.module';
import { FlowsComponent } from './flows/flows.component';
import { GetConnectedComponent } from './get-connected/get-connected.component';
import { SelectModuleComponent } from 'src/app/components/cards/mas-cards/select-module/select-module.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { UploadCsvComponentComponent } from 'src/app/components/cards/mas-cards/upload-csv-component/upload-csv-component.component';
import { ProductsComponent } from './products/products.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { AntifakeProductInfoComponent } from 'src/app/components/forms/antifake-product-info/antifake-product-info.component';
import { ProductIdentificationComponent } from './product-identification/product-identification.component';
import { ProductPinComponent } from './product-pin/product-pin.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { NewCampaignComponent } from './new-campaign/new-campaign.component';
import { AddSurveyComponent } from './add-survey/add-survey.component';
import { StickerLabelsComponent } from './sticker-labels/sticker-labels.component';
import { CampaignSummaryComponent } from './campaign-summary/campaign-summary.component';
import { ActiveCampaignComponent } from './active-campaign/active-campaign.component';
import { SurveysComponent } from './surveys/surveys.component';
import { RewardsComponent } from './rewards/rewards.component';
import { SettingsComponent } from './settings/settings.component';
import { MasLinkAccountComponent } from './mas-link-account/mas-link-account.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { QuicklinksComponent } from './quicklinks/quicklinks.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddProductInfoComponent } from 'src/app/components/cards/mas-cards/add-product-info/add-product-info.component';
import { AttachSurveyComponent } from 'src/app/components/cards/mas-cards/attach-survey/attach-survey.component';
import { AssignRewardsComponent } from 'src/app/components/cards/mas-cards/assign-rewards/assign-rewards.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { QuickRequestComponent } from './quick-request/quick-request.component';
import { OrdersComponent } from './orders/orders.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
// import { AngularPaystackModule } from 'angular-paystack';
// import { Angular4PaystackModule } from 'angular4-paystack';

import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    FlowsComponent,
    GetConnectedComponent,
    SelectModuleComponent,
    OnboardingComponent,
    UploadCsvComponentComponent,
    ProductsComponent,
    ProductInfoComponent,
    AntifakeProductInfoComponent,
    ProductIdentificationComponent,
    ProductPinComponent,
    CampaignsComponent,
    NewCampaignComponent,
    AddSurveyComponent,
    StickerLabelsComponent,
    CampaignSummaryComponent,
    ActiveCampaignComponent,
    SurveysComponent,
    RewardsComponent,
    SettingsComponent,
    MasLinkAccountComponent,
    RoleManagementComponent,
    QuicklinksComponent,
    // AddProductInfoComponent,
    // AttachSurveyComponent,
    AssignRewardsComponent,
    QuickRequestComponent,
    OrdersComponent,
    DashboardComponent

    // AntiNavFakeComponent

  ],
  imports: [
    CommonModule,
    AntiFakeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    NgxPaginationModule,
    GooglePlaceModule,
    Ng2SearchPipeModule
    // AngularPaystackModule.forRoot("pk_test_f1e9a210ad5f0309823abab6e037c5eb7424045d")
  ]
})
export class AntiFakeModule { }
