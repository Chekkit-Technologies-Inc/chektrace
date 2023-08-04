
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from "./app-routing.module";
import { JwtInterceptor } from './core/_helpers/jwt.interceptor';
import { ErrorInterceptor } from './core/_helpers/error.interceptor';
import { UtilityProvider } from './core/_helpers/utility';
import { QRCodeModule } from 'angularx-qrcode';
import { RouterModule } from '@angular/router';


import { AppComponent } from "./app.component";

// layouts
import { AdminComponent } from "./layouts/admin/admin.component";
import { AuthComponent } from "./layouts/auth/auth.component";
import { EngageComponent } from "./layouts/engage/engage.component";
import { SurveyComponent } from './layouts/survey/survey.component';

// admin views
import { DashboardComponent } from "./views/admin/dashboard/dashboard.component";
import { MapsComponent } from "./views/admin/maps/maps.component";
import { SettingsComponent } from "./views/admin/settings/settings.component";
import { TablesComponent } from "./views/admin/tables/tables.component";

// auth views
import { LoginComponent } from "./views/auth/login/login.component";
import { RegisterComponent } from "./views/auth/register/register.component";

// no layouts views
import { IndexComponent } from "./views/index/index.component";
import { LandingComponent } from "./views/landing/landing.component";
import { ProfileComponent } from "./views/profile/profile.component";

// components for views and layouts
import { AdminNavbarComponent } from "./components/navbars/admin-navbar/admin-navbar.component";
import { AuthNavbarComponent } from "./components/navbars/auth-navbar/auth-navbar.component";
import { CardBarChartComponent } from "./components/cards/card-bar-chart/card-bar-chart.component";
import { CardLineChartComponent } from "./components/cards/card-line-chart/card-line-chart.component";
import { CardPageVisitsComponent } from "./components/cards/card-page-visits/card-page-visits.component";
import { CardProfileComponent } from "./components/cards/card-profile/card-profile.component";
import { CardSettingsComponent } from "./components/cards/card-settings/card-settings.component";
import { CardSocialTrafficComponent } from "./components/cards/card-social-traffic/card-social-traffic.component";
import { CardStatsComponent } from "./components/cards/card-stats/card-stats.component";
import { CardTableComponent } from "./components/cards/card-table/card-table.component";
import { FooterAdminComponent } from "./components/footers/footer-admin/footer-admin.component";
import { FooterComponent } from "./components/footers/footer/footer.component";
import { FooterSmallComponent } from "./components/footers/footer-small/footer-small.component";
import { HeaderStatsComponent } from "./components/headers/header-stats/header-stats.component";
import { IndexNavbarComponent } from "./components/navbars/index-navbar/index-navbar.component";
import { MapExampleComponent } from "./components/maps/map-example/map-example.component";
import { IndexDropdownComponent } from "./components/dropdowns/index-dropdown/index-dropdown.component";
import { TableDropdownComponent } from "./components/dropdowns/table-dropdown/table-dropdown.component";
import { PagesDropdownComponent } from "./components/dropdowns/pages-dropdown/pages-dropdown.component";
import { NotificationDropdownComponent } from "./components/dropdowns/notification-dropdown/notification-dropdown.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { UserDropdownComponent } from "./components/dropdowns/user-dropdown/user-dropdown.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { LoadingComponent } from './components/spinners/loading/loading.component';
import { PlansComponent } from './views/auth/plans/plans.component';
import { ListProductsComponent } from './views/admin/products/list-products/list-products.component';
import { AddProductComponent } from './views/admin/products/add-product/add-product.component';
import { AddSurveyComponent } from './components/forms/add-survey/add-survey.component';
import { AddRewardComponent } from './components/forms/add-reward/add-reward.component';
import { RewardsHomeComponent } from './views/admin/rewards/rewards-home/rewards-home.component';
import { MerchandizeRewardComponent } from './views/admin/rewards/merchandize-reward/merchandize-reward.component';
import { AirtimeRewardComponent } from './views/admin/rewards/airtime-reward/airtime-reward.component';
import { LoyaltyPointsComponent } from './views/admin/rewards/loyalty-points/loyalty-points.component';
import { RaffleDrawComponent } from './views/admin/rewards/raffle-draw/raffle-draw.component';
import { CollectionHomeComponent } from './views/admin/code-collections/collection-home/collection-home.component';
import { SurveyHomeComponent } from "./views/admin/surveys/survey-home/survey-home.component";
import { CreateSurveyComponent } from "./views/admin/surveys/create-survey/create-survey.component";
import { SurveyTableDropdownComponent } from './components/dropdowns/survey-table-dropdown/survey-table-dropdown.component';
import { InsightsHomeComponent } from './views/admin/insights/insights-home/insights-home.component';
import { InsightsAnalyticsComponent } from './views/admin/insights/insights-analytics/insights-analytics.component';
import { UssdChannelComponent } from './views/admin/insights/ussd-channel/ussd-channel.component';
import { CallCodeComponent } from './views/admin/insights/call-code/call-code.component';
import { QrCodeChannelComponent } from './views/admin/insights/qr-code-channel/qr-code-channel.component';
import { EngageHomeComponent } from './views/admin/engage/engage-home/engage-home.component';
import { UploadCsvComponent } from './views/admin/engage/upload-csv/upload-csv.component';
import { ExistingCustomerComponent } from './views/admin/engage/existing-customer/existing-customer.component';
import { TargetGroupComponent } from './views/admin/engage/target-group/target-group.component';
import { CardProductsChartComponent } from './components/cards/card-products-chart/card-products-chart.component';
import { AnalyticsSummaryComponent } from './views/admin/analytics/analytics-summary/analytics-summary.component';
import { CardMapProductStatsComponent } from './components/cards/card-map-product-stats/card-map-product-stats.component';
import { CardRewardStatiticsComponent } from './components/cards/card-reward-statitics/card-reward-statitics.component';
import {DataTablesModule} from 'angular-datatables';
import { CreateLoyaltyRewardComponent } from './views/admin/rewards/create-loyalty-reward/create-loyalty-reward.component';
import { CreateAirtimeRewardComponent } from './views/admin/rewards/create-airtime-reward/create-airtime-reward.component';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { CreateMerchandizeRewardComponent } from './views/admin/rewards/create-merchandize-reward/create-merchandize-reward.component';
import { CreateRaffleRewardComponent } from './views/admin/rewards/create-raffle-reward/create-raffle-reward.component';
import { ProductBatchesComponent } from './views/admin/products/product-batches/product-batches.component';
import { CreateBatchComponent } from './views/admin/products/create-batch/create-batch.component';
import { EditBatchComponent } from './views/admin/products/edit-batch/edit-batch.component';
import { DndDirective } from './core/_helpers/dnd.directive';
import { ExistingCustomersDropdownComponent } from './components/dropdowns/existing-customers-dropdown/existing-customers-dropdown.component';
import { NewPinComponent } from './views/admin/products/new-pin/new-pin.component';
import { PinCardComponent } from './components/cards/pin-card/pin-card.component';
import { ViewBatchComponent } from './views/admin/products/view-batch/view-batch.component';
import { ConnectComponent } from './views/sap/connect/connect.component';
import { RequestSerialComponent } from './views/sap/request-serial/request-serial.component';
import { SapHomeComponent } from './views/sap/sap-home/sap-home.component';
import { SapDashboardComponent } from './views/sap/sap-dashboard/sap-dashboard.component';
import { BatchComponent } from './views/sap/batch/batch.component';
import { SetupSurveysComponent } from './views/sap/setup-surveys/setup-surveys.component';
import { AttachRewardsComponent } from './views/sap/attach-rewards/attach-rewards.component';
import { GetStartedComponent } from "./views/admin/engage/get-started/get-started.component";
import { DragDropModule } from '@angular/cdk/drag-drop'
import { AnalyticsComponent } from "./views/sap/analytics/analytics.component";
import { AssignSurveyComponent } from "./views/sap/assign-survey/assign-survey.component";
import { QuicklinksComponent } from "./views/sap/quicklinks/quicklinks.component";
import { SapAssignRewardsComponent } from "./views/sap/sap-assign-rewards/sap-assign-rewards.component";
import { SapAssignSurveysComponent } from "./views/sap/sap-assign-surveys/sap-assign-surveys.component";
import { SubscriptionComponent } from "./views/sap/subscription/subscription.component";
import { SummaryComponent } from "./views/sap/summary/summary.component";
import { UniqueIdComponent } from "./views/sap/unique-id/unique-id.component";
import { TraceabilityComponent } from './layouts/traceability/traceability.component';
import { TraceabilityNavbarComponent } from "./components/navbars/traceability-navbar/traceability-navbar.component";
import { AntiFakeComponent } from "./layouts/anti-fake/anti-fake.component";
import { AntiFakeNavComponent } from './components/navbars/anti-fake-nav/anti-fake-nav.component';
import { AddProductInfoComponent } from './components/cards/mas-cards/add-product-info/add-product-info.component';
import { AttachSurveyComponent } from './components/cards/mas-cards/attach-survey/attach-survey.component';
import { AssignRewardsComponent } from './components/cards/mas-cards/assign-rewards/assign-rewards.component';
import { TraceabilityModule } from "./views/admin/traceability/traceability.module";
import { AntiFakeModule } from "./views/admin/anti-fake/anti-fake.module";
import { ComponentsModule } from "./components/components.module";
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { NewDashboardComponent } from "./views/admin/new-dashboard/new-dashboard.component";
import { GamingComponent } from './layouts/gaming/gaming.component';
import { GamingNavComponent } from "./components/navbars/gaming-nav/gaming-nav.component";
// import { GoogleMapsModule } from "@angular/google-maps";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CardBarChartComponent,
    CardLineChartComponent,
    IndexDropdownComponent,
    PagesDropdownComponent,
    TableDropdownComponent,
    NotificationDropdownComponent,
    NewDashboardComponent,
    // CreateSurveyComponent,
    UserDropdownComponent,
    SidebarComponent,
    FooterComponent,
    FooterSmallComponent,
    FooterAdminComponent,
    CardPageVisitsComponent,
    // SurveyHomeComponent,
    CardProfileComponent,
    CardSettingsComponent,
    CardSocialTrafficComponent,
    CardStatsComponent,
    CardTableComponent,
    HeaderStatsComponent,
    MapExampleComponent,
    AuthNavbarComponent,
    CreateBatchComponent,
    AdminNavbarComponent,
    IndexNavbarComponent,
    AdminComponent,
    AuthComponent,
    MapsComponent,
    SettingsComponent,
    TablesComponent,
    LoginComponent,
    RegisterComponent,
    IndexComponent,
    LandingComponent,
    ProfileComponent,
    LoadingComponent,
    PlansComponent,
    ListProductsComponent,
    AddProductComponent,
    AddSurveyComponent,
    AddRewardComponent,
    RewardsHomeComponent,
    MerchandizeRewardComponent,
    AirtimeRewardComponent,
    LoyaltyPointsComponent,
    RaffleDrawComponent,
    CollectionHomeComponent,
    SurveyTableDropdownComponent,
    InsightsHomeComponent,
    InsightsAnalyticsComponent,
    UssdChannelComponent,
    CallCodeComponent,
    QrCodeChannelComponent,
    // AddProductInfoComponent,
    // EngageHomeComponent,
    // UploadCsvComponent,
    // ExistingCustomerComponent,
    // TargetGroupComponent,
    CardProductsChartComponent,
    AnalyticsSummaryComponent,
    CardMapProductStatsComponent,
    CardRewardStatiticsComponent,
    CreateLoyaltyRewardComponent,
    CreateAirtimeRewardComponent,
    CreateMerchandizeRewardComponent,
    CreateRaffleRewardComponent,
    ProductBatchesComponent,
    CreateBatchComponent,
    EditBatchComponent,
    DndDirective,
    // ExistingCustomersDropdownComponent,
    NewPinComponent,
    PinCardComponent,
    ViewBatchComponent,
    SurveyComponent,
    EngageComponent,
    TraceabilityComponent,
    TraceabilityNavbarComponent,
    AntiFakeComponent,
    AntiFakeNavComponent,
    GamingComponent,
    GamingNavComponent
    // CreateSurveyComponent,
    // UploadCsvComponentComponent,
    // UploadCsvComponent,
    // SelectModuleComponent,

    // ConnectComponent,
    // RequestSerialComponent,
    // SapHomeComponent,
    // SapDashboardComponent,
    // BatchComponent,
    // SetupSurveysComponent,
    // AttachRewardsComponent,
    // GetStartedComponent,
    // SurveyComponent,
    // EngageComponent,
    // AnalyticsComponent,
    // SapAssignSurveysComponent,
    // RequestSerialComponent,
    // UniqueIdComponent,
    // QuicklinksComponent,
    // SummaryComponent,
    // SubscriptionComponent,
    // AssignSurveyComponent,
    // BatchComponent,
    // SapAssignSurveysComponent,
    // SapAssignRewardsComponent

  ],
  imports: [
    BrowserModule,
    QRCodeModule,
    DataTablesModule,
    LoadingBarModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    RouterModule,
    GooglePlaceModule,
    ComponentsModule
    // GoogleMapsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    UtilityProvider
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
