import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SuccessPageComponent } from './success-page/success-page.component';
import { RouterModule } from '@angular/router';
import { EngageNavbarComponent } from 'src/app/components/navbars/engage-navbar/engage-navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductInfoComponent } from 'src/app/components/cards/mas-cards/add-product-info/add-product-info.component';
import { AddSurveyComponent } from 'src/app/components/forms/add-survey/add-survey.component';
import { AttachSurveyComponent } from 'src/app/components/cards/mas-cards/attach-survey/attach-survey.component';
import { CardProductsChartComponent } from 'src/app/components/cards/card-products-chart/card-products-chart.component';
import { ComponentsModule } from 'src/app/components/components.module';
// import { ModuleSelectComponent } from './module-select/module-select.component';


@NgModule({
  declarations: [
    SuccessPageComponent,
    // CardProductsChartComponent
    // ModuleSelectComponent,
    // AddSurveyComponent,

    // EngageNavbarComponent
    //  AddProductInfoComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
  ]
})
export class AdminModule { }
