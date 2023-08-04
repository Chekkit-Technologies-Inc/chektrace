import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js'
import { getRelativePosition } from 'chart.js';
import { NavbarService } from 'src/app/core/_services/navbar.service';
import { Subscription } from 'rxjs';
import { AlertService, AuthenticationService, ProductService } from 'src/app/core/_services';
import { User } from '../../../../core/_models';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  totalProducts: any;
  totalBatch: any;
  currentDate: string;
  productTracking: any[];
  codeAssignment: any[];
  selectedBatch: any;
  selectedBatchNum: any;
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(
    private router: Router,
    private navService: NavbarService,
    private productService: ProductService,
    private authenticationService: AuthenticationService,
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('User value', this.currentUser);
    });
    this.navService.show();
    this.fetchAnalytics();
    this.currentDate = new Date().toISOString();
   }

  ngOnInit(): void {

  }

  goHome(){
    this.router.navigate(['/MAS'])
  }
  fetchAnalytics(){
    let currentDate = new Date().toISOString().substring(0,10);
    this.productService.getTraceabilityAnalytics('2023-01-01', currentDate).subscribe((Res: any)=>{
      console.log(Res);
      this.totalProducts = Res.data.totalProducts;
      this.totalBatch = Res.data.totalBatch;
      this.productTracking = Res.data.productTracking;
      this.codeAssignment = Res.data;
      console.log(this.codeAssignment)
      if(Res.message == 'success'){
        const data = this.codeAssignment;
    const chart = new Chart("myChart", {

      type: 'bar',
      data: {
        labels: data['codeAssignment'].map(item =>{
          return item.date;
        }),
        datasets: [
          {
            label: '',
            data: data['codeAssignment'].map(item =>{
              return item.count;
            }),
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
    const chart2 = new Chart("myChart2", {

      type: 'bar',
      data: {
        labels: data['codeAssignment'].map(item =>{
          return item.date;
        }),
        datasets: [
          {
            label: '',
            data: data['codeAssignment'].map(item =>{
              return item.count;
            }),
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
    })
  }

  viewProductBatch(e){
    this.selectedBatchNum = e;
    const batchDetail = this.productTracking.filter(item => item.batch == e);
    console.log(batchDetail)
    this.selectedBatch = batchDetail
  }

}
