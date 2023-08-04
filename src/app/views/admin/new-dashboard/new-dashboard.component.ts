import { Component } from '@angular/core';

@Component({
  selector: 'app-new-dashboard',
  templateUrl: './new-dashboard.component.html',
  styleUrls: ['./new-dashboard.component.css']
})
export class NewDashboardComponent {
  loggedInUserType: string;
  userType: string;

  constructor(){
    this.userType = localStorage.getItem('userType');
    this.loggedInUserType = JSON.parse(this.userType);
    console.log(this.loggedInUserType)
  }


}
