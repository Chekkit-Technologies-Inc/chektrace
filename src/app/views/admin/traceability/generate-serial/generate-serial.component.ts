import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/_models';
import { AlertService, AuthenticationService, ProductService } from 'src/app/core/_services';
import { NavbarService } from 'src/app/core/_services/navbar.service';

@Component({
  selector: 'app-generate-serial',
  templateUrl: './generate-serial.component.html',
  styleUrls: ['./generate-serial.component.css']
})
export class GenerateSerialComponent implements OnInit {

  isCreateNew: boolean = false;
  isExisting: boolean = false;
  showModal: boolean = false;
  step = 1;
  productRecalls: any;
  batchNum: any;
  loading: boolean = false;
  productDistributors: any;
  currentUserSubscription: Subscription;
  currentUser: User;
  message: any;
  content: any;
  saved_products: any;
  productId: any;
  productBatches: any;
  subProductId: any;
  subProduct: any;

  constructor(
    private router: Router,
    private  productService: ProductService,
    public navService: NavbarService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService,
  ) {
    this.navService.show();
    this.getRecallHistory();

    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('User value', this.currentUser);
    });

    this.productService.getAllUserProducts(this.currentUser.id).subscribe((res: any)=>{
      if(res.data.products.length >= 1){
        this.saved_products = res.data.products.sort((a,b) => b.id - a.id)
      }
    })
  }

  ngOnInit(): void {
  }

  generate(){
    this.router.navigate(['/traceability/package-level'])
  }

  selectProduct(e){
    this.productId = e;
    this.getUserProductsBatches();
  }
  createNew(){
    this.isCreateNew = !this.isCreateNew;
  }

  useExisting(){
    this.isExisting = !this.isExisting;
  }

  getRecallHistory(){
    this.productService.getRecallHistory().subscribe((res: any)=>{
      console.log(res);
      if(res.statusCode == 200){
        this.productRecalls = res.data
      }else{
        this.alertService.showAlertNotification('Oops', res.message, 'error')
        // console.log(res)
      }

    },(error)=>{
      this.alertService.showAlertNotification('Oops', error, 'error')
      // console.log(error)
    })
  }

  startProductRecall(){
    this.loading = true;
    this.productService.distributorsRecall(this.batchNum).subscribe((res: any)=>{
      this.loading = false;
      if(res.statusCode == 200){
        console.log(res)
        this.step = 2;
        this.productDistributors = res.data;
      }else{
        this.alertService.showAlertNotification('Oops', res.message, 'error')
      }
    },(error)=>{
      this.loading = false;
      this.alertService.showAlertNotification('Error', error, 'error')
    });
  }

  getUserProductsBatches(){
    this.productService.getAllProductBatches(this.productId).subscribe((res: any)=>{

      this.productBatches = res.data.productBatches;
      this.subProduct = this.productBatches.filter(item => item.batch_num == this.batchNum);
      this.subProductId = this.subProduct[0].id
      console.log(this.subProductId)

      // console.log(res)
    })
  }

  recallProduct(){
    this.loading = true;
    const body ={
      "message": this.message,
      "title": this.content,
      "productId": parseInt(this.productId),
      "subProductId": parseInt(this.subProductId),
      "userId": this.currentUser.id
    }

    console.log(body)

    this.productService.recallProduct(body).subscribe((response: any)=>{
      this.loading = false;
      // console.log(response)
      if(response.statusCode == 200){
        this.alertService.showAlertNotification('Success',response.message,'success');
        this.showModal = false;
        this.step = 1;
      }
    },(error)=>{
      this.loading = false;
      this.alertService.showAlertNotification('Oops!',error,'error')
    })
  }



}
