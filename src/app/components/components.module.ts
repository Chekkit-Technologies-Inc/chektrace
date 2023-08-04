import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductInfoComponent } from './cards/mas-cards/add-product-info/add-product-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttachSurveyComponent } from './cards/mas-cards/attach-survey/attach-survey.component';
import { CreateBatchComponent } from './forms/create-batch/create-batch.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AntiFakeNavComponent } from './navbars/anti-fake-nav/anti-fake-nav.component';
import { CardProductsChartComponent } from './cards/card-products-chart/card-products-chart.component';
import { FooterComponent } from './footers/footer/footer.component';
import { UserManagementComponent } from './user/user-management/user-management.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { GamingNavComponent } from './navbars/gaming-nav/gaming-nav.component';



@NgModule({
  exports:[
    AddProductInfoComponent,
    AttachSurveyComponent,
    CreateBatchComponent,
    UserManagementComponent
    // CardProductsChartComponent,
    // FooterComponent
  ],
  declarations: [
    AddProductInfoComponent,
    AttachSurveyComponent,
    CreateBatchComponent,
    UserManagementComponent,
    // CardProductsChartComponent,
    // FooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ]
})
export class ComponentsModule { }
