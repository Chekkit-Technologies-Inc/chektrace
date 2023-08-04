import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyHomeComponent } from './survey-home/survey-home.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';
import { SetupSurveysComponent } from './setup-surveys/setup-surveys.component';
import { SurveysRoutingModule } from './surveys-routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LoadWalletComponent } from './load-wallet/load-wallet.component';
import { TopupSuccessComponent } from './topup-success/topup-success.component';



@NgModule({
  declarations: [
    SurveyHomeComponent,
    CreateSurveyComponent,
    EditSurveyComponent,
    SetupSurveysComponent,
    LoadWalletComponent,
    TopupSuccessComponent
  ],
  imports: [
    CommonModule,
    SurveysRoutingModule,
    DragDropModule
  ]
})
export class SurveysModule { }
