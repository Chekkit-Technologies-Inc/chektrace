import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EngageHomeComponent } from './engage-home/engage-home.component';
import { ExistingCustomerComponent } from './existing-customer/existing-customer.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { TargetGroupComponent } from './target-group/target-group.component';
import { UploadCsvComponent } from './upload-csv/upload-csv.component';

const routes: Routes = [
  { path: "", redirectTo: "get-started", pathMatch: "full" },
  { path: "get-started", component: GetStartedComponent },
  { path: "engage", component: EngageHomeComponent },
  { path: "existing-customer", component: ExistingCustomerComponent},
  { path: "target-group", component: TargetGroupComponent },
  { path: "upload-csv", component: UploadCsvComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EngageRoutingModule { }
