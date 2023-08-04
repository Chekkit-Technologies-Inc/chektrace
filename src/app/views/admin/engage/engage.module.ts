import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EngageRoutingModule } from './engage-routing.module';
import { GetStartedComponent } from './get-started/get-started.component';
import { ExistingCustomersDropdownComponent } from 'src/app/components/dropdowns/existing-customers-dropdown/existing-customers-dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExistingCustomerComponent } from './existing-customer/existing-customer.component';
import { UploadCsvComponent } from './upload-csv/upload-csv.component';
import { EngageNavbarComponent } from 'src/app/components/navbars/engage-navbar/engage-navbar.component';


@NgModule({
  declarations: [
    GetStartedComponent,
    ExistingCustomerComponent,
    ExistingCustomersDropdownComponent,
    UploadCsvComponent,
    EngageNavbarComponent
    
  ],
  imports: [
    CommonModule,
    EngageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class EngageModule { }
