import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js'
import { getRelativePosition } from 'chart.js';
import { ProductService } from 'src/app/core/_services';
import { NavbarService } from 'src/app/core/_services/navbar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(
    private router: Router,
    private navService: NavbarService,
    private productService: ProductService
  ) {
    this.navService.show();
    // this.productService.getDashboardInfo
    // this.fetchAnalytics();
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

      type: 'bar',
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




}
