import { AlertService } from './../../../../core/_services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService, ProductService } from 'src/app/core/_services';
import { NavbarService } from 'src/app/core/_services/navbar.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
  selectedTab: any = 'product-info' ;

  viewAttachSurvey: boolean = false;
  assignRewards: boolean = false;
  productId: any;
  productName: any;
  productionDate: any;
  batchNum: any;
  expiryDate: any;
  codeFormat: any;
  currentUserSubscription: Subscription;
  currentUser: any;
  surveyId: any;
  rewardId: any;
  loading: boolean = false;
  showModal: boolean = false;
  isLoading: boolean = false;


  constructor(
    private router: Router,
    private productService: ProductService,
    private authenticationService: AuthenticationService,
    private navService: NavbarService,
    private alertService: AlertService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('User value', this.currentUser);
    });

    this.navService.show()
   }

  ngOnInit(): void {

  }

  switchTab(id){
    this.selectedTab = id;
  }

  goNext(e){
    this.viewAttachSurvey = e;

    if(this.viewAttachSurvey == true){
      this.selectedTab = 'attach-survey'
    }


  }
  getResponse(e){
    console.log(e);
    this.productId = e.productId;
    this.productName = e.product_name;
    this.batchNum = e.batch_num;
    this.productionDate = e.production_date;
    this.expiryDate = e.expiry_date;
    this.codeFormat = e.code_format;

  }

  assignReward(e){
    this.assignRewards = e;

    if(this.assignRewards == true){
      this.selectedTab = 'assign-rewards'
    }
  }


  backToProducts(){
    this.router.navigate(['/mas/products'])
  }

  confirmReload(){
    return "Are you sure to leave ???"
  }
  getSurveyId(e){
    this.surveyId = e;
  }
  getRewardId(e){
    console.log(e)
    this.rewardId = e;
  }
  creteSubproduct(e){

    this.loading = true;
    const body = {
      "productId": this.productId,
      "product_name": this.productName,
      "producer_name": "string",
      "batch_num": this.batchNum,
      "production_date": this.productionDate,
      "FDA_number": "string",
      "expiry_date": this.expiryDate,
      "code_format": this.codeFormat,
      "survey_id": parseInt(this.surveyId),
      "reward_id": parseInt(this.rewardId),
      "user_id": this.currentUser.id
    }
    if(e == true){
      this.productService.update_subProduct(this.batchNum, body).subscribe((res: any)=>{
        this.loading = false;
        console.log(res);
        this.router.navigate(['/mas/products'])
      },(error)=>{
        this.loading = false;
        console.log(error)
      })
    }else{
      this.loading = false;
    }
  }

  deleteProduct(id){
    this.isLoading = true;
    this.productService.delete_product(id).subscribe((res: any)=>{
      if(res.message == 'OK'){
        this.showModal = !this.showModal
        this.selectedTab = 'product-info';
      }else{
        this.isLoading = false;
        this.alertService.simpleAlert('An error occured')
      }
    }, (error)=>{
      this.isLoading = false;
      this.alertService.alertConfirmation("Error", error)

    })
  }
}
