import { User } from './../../../../core/_models/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js'
import { getRelativePosition } from 'chart.js';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/_services/authentication.service';
import { NavbarService } from 'src/app/core/_services/navbar.service';
import { SurveyService } from 'src/app/core/_services/survey.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUserSubscription: Subscription;
  currentUser: User;
  userCounts: any;
  productCount: any;
  totalAuthentication: any;
  totalSurvey: any;
  userResponse: any;
  rewardBalance: any;

  constructor(
    private router: Router,
    private navService: NavbarService,
    private surveyService: SurveyService,
    private authenticationService: AuthenticationService,
  ) {
    this.navService.show();
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('User value', this.currentUser);
    });
    this.getCounts()
  }

  ngOnInit(): void {
    const data = [
      { month: "Jan", count: 200 },
      { month: "Feb", count: 170 },
      { month: "Mar", count: 150 },
      { month: "Apr", count: 250 },
      { month: "May", count: 220 },
      { month: "Jun", count: 300 },
      { month: "Jul", count: 280 },
      { month: "Aug", count: 150 },
      { month: "Sept", count: 250 },
      { month: "Oct", count: 220 },
      { month: "Nov", count: 300 },
      { month: "Dec", count: 280 },
    ];
    const chart = new Chart("myChart", {

      type: 'line',
      data: {
        labels: data.map(row => row.month),
        datasets: [
          {
            label: '',
            data: data.map(row => row.count),
            backgroundColor: '#153853',
          }
        ]
      },
      options: {
        onClick: (e) => {
          const canvasPosition = getRelativePosition(e, chart);

          // Substitute the appropriate scale IDs
          const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
          const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
        }
      }
    });

  }

  goHome(){
    this.router.navigate(['/MAS'])
  }

  getCounts(){
    this.surveyService.getCounts(this.currentUser.id).subscribe((res: any)=>{
      console.log(res);

      this.userCounts = res.data;
      this.productCount = res.data.products_count;
      this.totalAuthentication = res.data.used_pin_count;
      this.totalSurvey = res.data.surveys_count;
      this.userResponse = res.data.response_count;
      this.rewardBalance = res.data.rewards_count;
    })
  }

}
