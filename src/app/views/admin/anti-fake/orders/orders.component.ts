import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/_services';
import { NavbarService } from 'src/app/core/_services/navbar.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  labels: any;
  showModal: boolean = false;
  openedOrder: any;
  orderAddress: any;
  orderCountry: any;
  orderDate: any;
  orderProductId: any;
  labelType: any;
  orderQuantity: any;
  orderStatus: any;
  orderRegion: any;
  orderTagStatus: any;
  updatedDate: any;
  statusCounts: any;
  pendingCount: any;
  completeCount: any;
  processingCount: any;

  constructor(
    private productService: ProductService,
    private navService: NavbarService
  ) {
    this.getlabels();
    this.navService.show();
  }

  ngOnInit(): void {
  }

  getlabels(){
    this.productService.getLabels().subscribe((res: any)=>{
      console.log(res)
      if(res.statusCode === 200){
        this.labels = res.data.orders;
        this.statusCounts = res.data.statusCount;
        this.pendingCount = this.statusCounts.findIndex(item => item.status == 'pending');
        this.completeCount = this.statusCounts.findIndex(item => item.status == 'completed');
        this.processingCount = this.statusCounts.findIndex(item => item.status == 'processing');

      }
    })
  }

  viewOrder(e){
    const selectedOrder = this.labels.findIndex(item => item.id == e);
    this.openedOrder = this.labels[selectedOrder];
    // console.log(this.openedOrder);
    this.productService.getLabelTracking(e).subscribe((res: any)=>{
      console.log(res);

    })
    if(this.openedOrder){
      this.orderAddress = this.openedOrder.address;
      this.orderCountry = this.openedOrder.country;
      this.orderDate = this.openedOrder.created_at;
      this.labelType = this.openedOrder.labelType;
      this.orderProductId = this.openedOrder.productId;
      this.orderQuantity = this.openedOrder.quantity;
      this.orderStatus = this.openedOrder.status;
      this.orderRegion = this.openedOrder.region;
      this.orderTagStatus = this.openedOrder.withTaggant;
      this.updatedDate = this.openedOrder.updated_at;
      this.showModal = true;

    }
  }

  getTracking(){

  }

}
