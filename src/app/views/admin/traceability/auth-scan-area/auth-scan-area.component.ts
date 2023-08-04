import { AlertService } from './../../../../core/_services/alert.service';
import { NavbarService } from './../../../../core/_services/navbar.service';
import { Component, OnInit } from '@angular/core';
import Chart from "chart.js";
import { AuthenticationService, ProductService } from 'src/app/core/_services';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/_models';

@Component({
  selector: 'app-auth-scan-area',
  templateUrl: './auth-scan-area.component.html',
  styleUrls: ['./auth-scan-area.component.css']
})
export class AuthScanAreaComponent implements OnInit {
  currentUserSubscription: Subscription;
  currentUser: User;
  step: number = 1;
  productList: any;
  productId: any;
  description: any;
  codes = [];
  code: any;
  productBatches: any;
  batchId: any;
  subProductId: any;
  loading: boolean = false;
  stockCount: any;
  stringifiedCount: any;
  viewedStockProduct: any;
  viewedDetails: any;
  stringifiedDetailsCount: any;
  constructor(
    private navService: NavbarService,
    private productService: ProductService,
     private authenticationService: AuthenticationService,
     private alertService: AlertService
  ) {
    this.navService.show();
    this.getStock();
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('User value', this.currentUser);
    });
    this.getProducts();
  }

  ngOnInit(): void {


  }

  getProducts(){
    this.productService.getAllUserProducts(this.currentUser.id).subscribe((res: any)=>{
      console.log(res);
      this.productList = res.data.products;
    })
  }

  getStock(){
    this.productService.getStockCount().subscribe((res: any)=>{
      this.stockCount = res.data;

      let stringifiedCount = this.stockCount.map(stringifiedCount => {
        stringifiedCount.count = JSON.parse(stringifiedCount.count);
        return stringifiedCount
      });
      this.stringifiedCount = stringifiedCount;
      console.log(res)
    },(error)=>{
      console.log(error)
    })
  }

  viewDetails(id: any, name: any){
    this.viewedStockProduct = name;
    this.productService.viewStockDetails(id).subscribe((res: any)=>{
      console.log(res);
      this.viewedDetails = res.data;
      let stringifiedDetails = this.viewedDetails.map(stringifiedDetails => {
        stringifiedDetails.count = JSON.parse(stringifiedDetails.count);
        return stringifiedDetails;
      });
      this.stringifiedDetailsCount = stringifiedDetails;
      if(res.statusCode == 200){
        this.step = 3;
      }
    })
  }

  selectProduct(e){
    this.productId = e
    if(this.productId){
      this.getProductBatch();
    }
  }
  delete(i: any){
    const itemDelete: number = this.codes.indexOf(i);
    if(itemDelete !== -1){
      this.codes.splice(itemDelete, 1);
    }
  }


  addCode(){
    this.codes.push(this.code);
    setTimeout(()=>{
      this.code = '';
    }, 500)
    console.log(this.codes)
  }

  getProductBatch(){
    this.productService.getAllProductBatches(this.productId).subscribe((res: any)=>{

      this.productBatches = res.data.productBatches;
      console.log(res)
    })
  }


  scanProduct(){
    this.loading = true;
    const body = {
      "serials": this.codes,
      "productId": this.productId,
      "comment": this.description
    }
    this.productService.postStockCount(body).subscribe((res: any)=>{
      this.loading = false;
      if(res.statusCode == 200){
        this.alertService.showAlertNotification('Success', res.message, 'success')
        this.step = 1;
        this.getStock()
        this.codes = [];
      }else{
        this.alertService.showAlertNotification('Error', res.message, 'error');
        this.codes = [];
      }
      console.log(res)
    },(error)=>{
      this.loading = false;
      this.alertService.showAlertNotification('Oops!', 'Something went wrong, try again.', 'error')
    })
  }



}
