import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";
import { PlansComponent } from "./views/auth/plans/plans.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";
import { AuthGuard } from './core/_helpers';


import { AddProductComponent } from "./views/admin/products/add-product/add-product.component";
import { ListProductsComponent } from "./views/admin/products/list-products/list-products.component";
import { RewardsHomeComponent } from "./views/admin/rewards/rewards-home/rewards-home.component";
import { LoyaltyPointsComponent } from "./views/admin/rewards/loyalty-points/loyalty-points.component";
import { AirtimeRewardComponent } from "./views/admin/rewards/airtime-reward/airtime-reward.component";
import { MerchandizeRewardComponent } from "./views/admin/rewards/merchandize-reward/merchandize-reward.component";
import { SurveysRoutingModule } from "./views/admin/surveys/surveys-routing.module";
import { SurveyHomeComponent } from "./views/admin/surveys/survey-home/survey-home.component";
import { CreateSurveyComponent } from "./views/admin/surveys/create-survey/create-survey.component";
import { CollectionHomeComponent } from "./views/admin/code-collections/collection-home/collection-home.component";
import { InsightsHomeComponent } from "./views/admin/insights/insights-home/insights-home.component";
import { EngageHomeComponent } from "./views/admin/engage/engage-home/engage-home.component";
import { UploadCsvComponent } from "./views/admin/engage/upload-csv/upload-csv.component";
import { TargetGroupComponent } from "./views/admin/engage/target-group/target-group.component";
import { ExistingCustomerComponent } from "./views/admin/engage/existing-customer/existing-customer.component";
import { AnalyticsSummaryComponent } from "./views/admin/analytics/analytics-summary/analytics-summary.component";
import { CreateLoyaltyRewardComponent } from './views/admin/rewards/create-loyalty-reward/create-loyalty-reward.component';
import { CreateAirtimeRewardComponent } from './views/admin/rewards/create-airtime-reward/create-airtime-reward.component';
import { CreateMerchandizeRewardComponent } from './views/admin/rewards/create-merchandize-reward/create-merchandize-reward.component';
import { RaffleDrawComponent } from './views/admin/rewards/raffle-draw/raffle-draw.component';
import { CreateRaffleRewardComponent } from './views/admin/rewards/create-raffle-reward/create-raffle-reward.component';
import { ProductBatchesComponent } from './views/admin/products/product-batches/product-batches.component';
import { CreateBatchComponent } from './views/admin/products/create-batch/create-batch.component';
import { NewPinComponent } from './views/admin/products/new-pin/new-pin.component';
import { ViewBatchComponent } from './views/admin/products/view-batch/view-batch.component';
import { ConnectComponent } from './views/sap/connect/connect.component';
import { RequestSerialComponent } from './views/sap/request-serial/request-serial.component';
import { SapHomeComponent } from './views/sap/sap-home/sap-home.component';
import { SapDashboardComponent } from './views/sap/sap-dashboard/sap-dashboard.component';

import { BatchComponent } from './views/sap/batch/batch.component';
import { SetupSurveysComponent } from './views/sap/setup-surveys/setup-surveys.component';
import { AttachRewardsComponent } from './views/sap/attach-rewards/attach-rewards.component';
import { GetStartedComponent } from "./views/admin/engage/get-started/get-started.component";
import { SurveyComponent } from "./layouts/survey/survey.component";
import { EngageComponent } from "./layouts/engage/engage.component";
import { TraceabilityComponent } from "./layouts/traceability/traceability.component";
import { AntiFakeComponent } from "./layouts/anti-fake/anti-fake.component";
import { DocsHomeComponent } from './views/docs/docs-home/docs-home.component';
import { NewDashboardComponent } from "./views/admin/new-dashboard/new-dashboard.component";
import { GamingComponent } from "./layouts/gaming/gaming.component";


const routes: Routes = [
  // admin views
  {
    path: "dashboard",
    canActivate: [AuthGuard],
    component: AdminComponent,
    children: [
      {
        path: "",
        loadChildren:()=>import('./views/admin/admin.module').then(m=>m.AdminModule)
      },
    ],
  },

  {
    path: "sap",
    canActivate: [AuthGuard],
    component: AdminComponent,
    children: [
      {
        path: "",
        loadChildren:()=>import('./views/sap/sap.module').then(m=>m.SapModule)
      }
    ],
  },

  // auth views /dashboard/products/view-batch
  {
    path: "authentication",
    component: AuthComponent,
    children: [
      {
        path: "",
        loadChildren:()=>import('./views/auth/auth.module').then(m=>m.AuthModule)
      }
    ],
  },
  { path: 'select-module', component: NewDashboardComponent },
  {
    path: "docs",
    canActivate: [AuthGuard],
    component: DocsHomeComponent,
    children: [
      {
        path: "",
        loadChildren:()=>import('./views/docs/docs.module').then(m=>m.DocsModule)
      }
    ],
  },
  // survey module
  {
    path: "survey",
    component: SurveyComponent,
    children: [
      {
        path: "",
        loadChildren:()=>import('./views/admin/surveys/surveys.module').then(m=>m.SurveysModule)
      }

    ]
  },
  // engage module entry
  {
    path: "engage",
    component: EngageComponent,
    children: [
      {
        path: "",
        loadChildren:()=>import('./views/admin/engage/engage.module').then(m=>m.EngageModule)
      }
    ]
  },
  {
    path: "traceability",
    component: TraceabilityComponent,
    children: [
      {
        path: "",
        loadChildren:()=>import('./views/admin/traceability/traceability.module').then(m=>m.TraceabilityModule)
      }
    ]
  },
  {
    path: "mas",
    component: AntiFakeComponent,
    children: [
      {
        path: "",
        loadChildren:()=>import('./views/admin/anti-fake/anti-fake.module').then(m=>m.AntiFakeModule)
      }
    ]
  },
  {
    path: "gaming",
    component: GamingComponent,
    children: [
      {
        path: "",
        loadChildren:()=>import('./views/admin/gaming/gaming.module').then(m=>m.GamingModule)
      }
    ]
  },
  // no layout views
  { path: "authentication/plans", component: PlansComponent },
  { path: "profile", component: ProfileComponent },
  { path: "landing", component: LandingComponent },
  { path: "", component: IndexComponent },
  { path: "**", redirectTo: "", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
