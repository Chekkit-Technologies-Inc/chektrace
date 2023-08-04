import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AddProductComponent } from "./products/add-product/add-product.component";
import { ListProductsComponent } from "./products/list-products/list-products.component";
import { RewardsHomeComponent } from "./rewards/rewards-home/rewards-home.component";
import { LoyaltyPointsComponent } from "./rewards/loyalty-points/loyalty-points.component";
import { AirtimeRewardComponent } from "./rewards/airtime-reward/airtime-reward.component";
import { MerchandizeRewardComponent } from "./rewards/merchandize-reward/merchandize-reward.component";
import { SurveysRoutingModule } from "./surveys/surveys-routing.module";
import { SurveyHomeComponent } from "./surveys/survey-home/survey-home.component";
import { CreateSurveyComponent } from "./surveys/create-survey/create-survey.component";
import { CollectionHomeComponent } from "./code-collections/collection-home/collection-home.component";
import { InsightsHomeComponent } from "./insights/insights-home/insights-home.component";
import { EngageHomeComponent } from "./engage/engage-home/engage-home.component";
import { UploadCsvComponent } from "./engage/upload-csv/upload-csv.component";
import { TargetGroupComponent } from "./engage/target-group/target-group.component";
import { ExistingCustomerComponent } from "./engage/existing-customer/existing-customer.component";
import { AnalyticsSummaryComponent } from "./analytics/analytics-summary/analytics-summary.component";
import { CreateLoyaltyRewardComponent } from './rewards/create-loyalty-reward/create-loyalty-reward.component';
import { CreateAirtimeRewardComponent } from './rewards/create-airtime-reward/create-airtime-reward.component';
import { CreateMerchandizeRewardComponent } from './rewards/create-merchandize-reward/create-merchandize-reward.component';
import { RaffleDrawComponent } from './rewards/raffle-draw/raffle-draw.component';
import { CreateRaffleRewardComponent } from './rewards/create-raffle-reward/create-raffle-reward.component';
import { ProductBatchesComponent } from './products/product-batches/product-batches.component';
import { CreateBatchComponent } from './products/create-batch/create-batch.component';
import { NewPinComponent } from './products/new-pin/new-pin.component';
import { ViewBatchComponent } from './products/view-batch/view-batch.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MapsComponent } from './maps/maps.component';
import { SettingsComponent } from './settings/settings.component';
import { TablesComponent } from './tables/tables.component';
import { SuccessPageComponent } from './success-page/success-page.component';
import { SetupSurveysComponent } from './surveys/setup-surveys/setup-surveys.component';
import { SurveyComponent } from 'src/app/layouts/survey/survey.component';
import { AntiFakeRoutingModule } from './anti-fake/anti-fake-routing.module';


const routes: Routes = [
  {
    path: "overview",
    component: DashboardComponent
  },
  { path: "settings", component: SettingsComponent },
  { path: "tables", component: TablesComponent },
  { path: "success", component: SuccessPageComponent },
  { path: "maps", component: MapsComponent },
  { path: "products", component: ListProductsComponent },
  { path: "products/product-batches", component: ProductBatchesComponent },
  { path: "products/create-batch", component: CreateBatchComponent },
  { path: "products/new-pin", component: NewPinComponent },
  { path: "products/view-batch", component: ViewBatchComponent },
  { path: "rewards", component: RewardsHomeComponent },
  { path: 'rewards/loyalty-points', component: LoyaltyPointsComponent},
  { path: 'rewards/create-loyalty-reward', component: CreateLoyaltyRewardComponent},
  { path: 'rewards/create-airtime-reward', component: CreateAirtimeRewardComponent},
  { path: 'rewards/create-merchandize-reward', component: CreateMerchandizeRewardComponent},
  { path: 'rewards/create-raffle-reward', component: CreateRaffleRewardComponent},
  { path: 'rewards/airtime', component: AirtimeRewardComponent},
  { path: 'rewards/raffle', component: RaffleDrawComponent},
  { path: 'rewards/merchandize', component: MerchandizeRewardComponent},
  { path: 'code-collections', component: CollectionHomeComponent},
  { path: "products/add-product", component: AddProductComponent },
  { path: 'insights', component: InsightsHomeComponent},
  { path: "MAS", component: AntiFakeRoutingModule },
  { path: 'analytics', component: AnalyticsSummaryComponent},
  { path: "", redirectTo: "overview", pathMatch: "full" },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
