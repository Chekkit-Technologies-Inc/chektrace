import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, SurveyService, SurveyRewardService, AlertService, ProductService,RestService } from '../../../core/_services';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { User } from '../../../core/_models';
import { UserService } from '../../../core/_services/user.service';
import * as moment from 'moment';
import Chart from "chart.js";

@Component({
  selector: 'card-products-chart',
  templateUrl: './card-products-chart.component.html',
  styleUrls: ['./card-products-chart.component.css']
})
export class CardProductsChartComponent implements OnInit {
  editing = {};
  rows = [];
  temp = [];
  rewardId = "";
  success_msg: any;
  loadingIndicator = true;
  reorderable = true;
  closeResult: any;
  data: any;
  surveyForm: FormGroup;
  loading = false;
  submitted = false;
  save_survey: any;
  save_products: any;
  selectChange: any;
  currentUser: User;
  currentUserSubscription: Subscription;
  user_recordCounts: any;
  products: any;
  myDate = new Date();
  aWeekBefore = new Date(this.myDate.getTime() - 60 * 60 * 24 * 7 * 1000);
  aMonthTime = new Date(this.myDate.getTime() + 60 * 60 * 24 * 30 * 1000);


  public filterOptions = {
    startDate : moment(this.aWeekBefore).format('YYYY-MM-DD'),
    endDate : moment(this.myDate).format('YYYY-MM-DD'),
    productId : "",
  };

  scanStatistics: any;

  // lineChart
  public lineChartData: Array<any> = [
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true
  };

  constructor(
    private productService: ProductService,
    private authenticationService: AuthenticationService, 
    ) {

      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        this.currentUser = user;
        console.log('User value', this.currentUser);
      });

    }

  ngOnInit() {}

  getAllProducts() {
    this.authenticationService.allProducts.subscribe(save_products => {
      if (save_products) {
        this.save_products = save_products;
        this.productService.getAllUserProducts(this.currentUser.id).pipe(first()).subscribe(data => {
          console.log('to save ', data);
          if (data['data'].products) {
            this.products = data['data'].products;
            let product = this.products[0];
            this.filterOptions.productId = product.id;
            this.getProductScansByDate()
          }
        });
      } else {
        this.productService.getAllUserProducts(this.currentUser.id).pipe(first()).subscribe(data => {
          console.log(data['data'].products);
          if (data['data'].products) {
            this.products = data['data'].products;
            let product = this.products[0];
            this.filterOptions.productId = product.id;
            this.getProductScansByDate()
          }
        });
      }
    });
  }

  getProductScansByDate() {
    // console.log(productId)
    this.productService.updateProductFilterSource(this.filterOptions);
    this.productService.getScansByDate(this.filterOptions.productId,this.filterOptions.startDate,this.filterOptions.endDate).pipe(first()).subscribe(data => {
      this.scanStatistics = data['data'];
      console.log(data['data']);
      let vals = data['data'];
      let dailyScans = vals.map(function (v) {
        return v.count
      });
      let scanDates = vals.map(function (v) {
        return v.date
      });
      // dailyScans.unshift(0);

      // this.getProductScans()
      this.lineChartData = dailyScans;// [{ data: dailyScans, label: 'Scans per day' }];
      this.lineChartLabels = scanDates;
      this.plotChart()
      console.log(dailyScans)
      // if (data['data'].surveys) {
      //   this.save_survey = data['data'].surveys;
      // }
    });
  }

  ngAfterViewInit(){
    this.getAllProducts()
  }

  plotChart() {
    var config = {
      type: "line",
      data: {
        labels: this.lineChartLabels,
        datasets: [
          // {
          //   label: new Date().getFullYear(),
          //   backgroundColor: "#4c51bf",
          //   borderColor: "#4c51bf",
          //   data: [65, 78, 66, 44, 56, 67, 75],
          //   fill: false,
          // },
          {
            label: 'daily scans',
            fill: false,
            backgroundColor: "#fff",
            borderColor: "#fff",
            data: this.lineChartData,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(255, 255, 255, 0.15)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    let ctx: any = document.getElementById("line-chart") as HTMLCanvasElement;
    ctx = ctx.getContext("2d");
    new Chart(ctx, config);
  }

}
