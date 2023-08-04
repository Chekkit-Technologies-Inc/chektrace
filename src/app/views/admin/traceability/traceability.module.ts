import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TraceabilityRoutingModule } from './traceability-routing.module';
import { LinkAccountComponent } from './link-account/link-account.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { RequestPinComponent } from './request-pin/request-pin.component';
import { GenerateSerialComponent } from './generate-serial/generate-serial.component';
import { PackagingLevelComponent } from './packaging-level/packaging-level.component';
import { PackagingHierarchyComponent } from './packaging-hierarchy/packaging-hierarchy.component';
import { SerialNumberSummaryComponent } from './serial-number-summary/serial-number-summary.component';
import { SelectDestinationComponent } from './select-destination/select-destination.component';
import { AssignSurveyComponent } from './assign-survey/assign-survey.component';
import { SetupSurveyComponent } from './setup-survey/setup-survey.component';
import { AttachRewardsComponent } from './attach-rewards/attach-rewards.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { QuicklinksComponent } from './quicklinks/quicklinks.component';
import { AuthScanAreaComponent } from './auth-scan-area/auth-scan-area.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { TraceabilitySurveySetupComponent } from './traceability-survey-setup/traceability-survey-setup.component';
import { TraceabilityAttachRewardComponent } from './traceability-attach-reward/traceability-attach-reward.component';
import { TraceabilityMapComponent } from './traceability-map/traceability-map.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './products/products.component';
import { CreateBatchComponent } from 'src/app/components/forms/create-batch/create-batch.component';
import { AddProductInfoComponent } from 'src/app/components/cards/mas-cards/add-product-info/add-product-info.component';
import { QRCodeModule } from 'angularx-qrcode';
import { AttachSurveyComponent } from 'src/app/components/cards/mas-cards/attach-survey/attach-survey.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { DashboardComponent } from './dashboard/dashboard.component';
// import { NgxPrintElementModule } from 'ngx-print-element';
import {NgxPrintModule} from 'ngx-print';
// import { UserManagementComponent } from './user-management/user-management.component';


@NgModule({
  declarations: [
    LinkAccountComponent,
    SubscriptionComponent,
    RequestPinComponent,
    GenerateSerialComponent,
    PackagingLevelComponent,
    PackagingHierarchyComponent,
    SerialNumberSummaryComponent,
    SelectDestinationComponent,
    AssignSurveyComponent,
    SetupSurveyComponent,
    AttachRewardsComponent,
    QuicklinksComponent,
    AuthScanAreaComponent,
    AnalyticsComponent,
    TraceabilitySurveySetupComponent,
    TraceabilityAttachRewardComponent,
    TraceabilityMapComponent,
    ProductsComponent,
    DashboardComponent,
    // UserManagementComponent,
    // CreateBatchComponent,
    // AddProductInfoComponent,
    // AttachSurveyComponent

  ],
  imports: [
    CommonModule,
    NgxPrintModule,
    TraceabilityRoutingModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    QRCodeModule,
    ComponentsModule,
    // NgxPrintElementModule
  ]
})
export class TraceabilityModule { }
