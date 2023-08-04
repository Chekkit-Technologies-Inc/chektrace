import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { SurveyHomeComponent } from './survey-home/survey-home.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { SetupSurveysComponent } from './setup-surveys/setup-surveys.component';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';
import { LoadWalletComponent } from './load-wallet/load-wallet.component';
import { TopupSuccessComponent } from './topup-success/topup-success.component';


const routes: Routes = [
  // { path: "authentication/plans", component: PlansComponent },
  // { path: "profile", component: ProfileComponent },
  // { path: "landing", component: LandingComponent},
  { path: "", redirectTo: "setup", pathMatch: "full" },
  { path: "load-wallet", component: LoadWalletComponent },
  { path: "edit", component: EditSurveyComponent },
  { path: 'create-survey', component: CreateSurveyComponent},
  { path: 'setup', component: SetupSurveysComponent },
  { path: "topup-success", component: TopupSuccessComponent },
  { path: "home", component: SurveyHomeComponent },
  { path: "**", redirectTo: "setup", pathMatch: "full" },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class SurveysRoutingModule { }
