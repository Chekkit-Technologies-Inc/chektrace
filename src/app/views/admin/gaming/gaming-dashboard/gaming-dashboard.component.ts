import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { getRelativePosition } from 'chart.js';
import { AlertService, ProductService } from 'src/app/core/_services';

@Component({
  selector: 'app-gaming-dashboard',
  templateUrl: './gaming-dashboard.component.html',
  styleUrls: ['./gaming-dashboard.component.css']
})
export class GamingDashboardComponent {
  dashboardMetrics: any;
  constructor(
    private productService: ProductService,
    private alertService: AlertService
  ){
    const data = [
      { year: 2010, count: 10 },
      { year: 2011, count: 20 },
      { year: 2012, count: 15 },
      { year: 2013, count: 25 },
      { year: 2014, count: 22 },
      { year: 2015, count: 30 },
      { year: 2016, count: 28 },
    ];
    const chart = new Chart("myChart", {

      type: 'bar',
      data: {
        labels: data.map(row => row.year),
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
    this.getMetrics()
  }

  getMetrics(){
      this.productService.getDashboardMetrics().subscribe((res: any)=>{
        console.log(res)
        if(res.statusCode === 200){
          this.dashboardMetrics = res.data
        }else{
          this.alertService.showAlertNotification('Oops!',res.message,'error')
        }
      },(error)=>{
        this.alertService.showAlertNotification('Error!',error,'error')
      })
  }

}
