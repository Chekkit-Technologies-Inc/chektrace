import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from 'src/app/core/_models';
import { AlertService, AuthenticationService, ProductService } from 'src/app/core/_services';
import { FooterService } from 'src/app/core/_services/footer.service';
import { NavbarService } from 'src/app/core/_services/navbar.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-batch',
  templateUrl: './create-batch.component.html',
  styleUrls: ['./create-batch.component.css']
})
export class CreateBatchComponent implements OnInit {
  @Output() serialize:EventEmitter<boolean> = new EventEmitter();
  @Output() generateLabel:EventEmitter<boolean> = new EventEmitter();
  @Output() selectedProductId:EventEmitter<any> = new EventEmitter();



  createBatchUrl = environment.apiUrl +"/api/v2/products/sub-products";
  currentUser: User;
  currentUserSubscription: Subscription
  save_products: any;
  productId: any;
  selectedProduct: any;
  productName: any;
  producerName: any;
  batchNumber: any;
  productionDate: any;
  FDANumber: any;
  expiryDate: any;
  isSuccessful:boolean = false;
  isProductId: boolean = false;
  viewPackageLevel: boolean = false;
  createNewBatch: boolean = true;
  displayProductBatch: boolean= false;
  packageLevels: any;
  showModal: boolean = false;
  codeFormat: any;
  productIdForBatch: any;
  productBatches: any;
  nextStep: any;
  batchData: any;
  loading:boolean = false;
  batch_Number: any;

  constructor(
    public navService: NavbarService,
    private router: Router,
    private http: HttpClient,
    public footerService: FooterService,
    private authenticationService: AuthenticationService,
    private productService: ProductService,
    private alertService: AlertService

  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('User value', this.currentUser);
    });
    this.getAllProducts();
    // this.getProductPackageLevel()
   }

  ngOnInit(): void {
  }

  getAllProducts(){


    this.productService.getChekkitProducts().subscribe((save_products: any) => {
      if (save_products) {
        console.log(save_products)
        this.save_products = save_products.data;

      }
    },(error)=>{
      this.alertService.simpleAlert(error)
    });
  }

  selectProduct(e){

    this.productId = e;
    localStorage.setItem('batchProductId', this.productId)

    if(this.productId){
      this.isProductId = true
    }
    // console.log(this.save_products)

    const product = this.save_products.findIndex(item => item.id == e)

    this.productName = this.save_products[product].product_name;
    // this.producerName = this.save_products[product].producer_name;
    this.batchNumber = this.save_products[product].batch_num;
    this.productionDate = this.save_products[product].production_date;
    this.FDANumber = this.save_products[product].fda_number;
    this.expiryDate = this.save_products[product].expiry_date;


    console.log(this.save_products[product].product_name);




  }


  createBatch(){
    this.loading = true;
    localStorage.removeItem('batchProduct')

    const body = {
      "productId": this.productId,
      "product_name": this.productName,
      // "producer_name": this.producerName,
      "batch_num":this.batch_Number,
      "production_date": this.productionDate,
      "FDA_number": this.FDANumber,
      "expiry_date": this.expiryDate,
      "code_format": this.codeFormat,
      "survey_id": 0,
      "reward_id": 0,
      "user_id": 0
    }

    this.productService.create_batch(body).subscribe((res: any)=>{
      console.log(res)
      this.loading = false;
      this.batchData = res.data;
      console.log(this.batchData)
      localStorage.setItem("batchProduct", JSON.stringify(this.batchData))
      if(res.statusCode == 200){
        this.productIdForBatch = res.data.productId;
        this.createNewBatch = false;
        this.serialize.emit(true);
        this.selectedProductId.emit(this.productId)
        // this.showModal = true;


      }else{
        this.alertService.simpleAlert(res.message)
      }
    },(error)=>{
      this.loading = false;
      this.alertService.showAlertNotification('Error',error,'')
    })


  }



  proceedToSerialization(){
    this.displayProductBatch = true;
    this.viewPackageLevel = false;
    this.isSuccessful = false;
    this.createNewBatch = false;
  }

  getProductPackageLevel(){
    localStorage.removeItem('batchProduct');
    console.log(this.productIdForBatch)
    this.productService.getPackageLevel(this.productIdForBatch).subscribe((res: any)=>{
      console.log(res)
      localStorage.setItem('batchProduct', JSON.stringify(res.data.productBatches))

      this.packageLevels = res.data;
    },(error)=>{
      this.alertService.simpleAlert(error)
    });
  }

  getProductBatches(){
    this.productService.getAllProductBatches(this.productId).subscribe((res: any)=>{
      console.log(res)
      this.productBatches = res.data.productBatches;
    },(error)=>{
      this.alertService.simpleAlert(error)
    })
  }

  toggleAirtime(){
    this.showModal = !this.showModal;
    // this.showMerchModal = !this.showMerchModal;
  }



  ifNo(){
    // this.isSuccessful = true;
    this.showModal = false;
    this.generateLabel.emit();
    this.selectedProductId.emit(this.productId)
  }

  ifYes(){
    // this.nextStep = this.productIdForBatch['status'];
    this.serialize.emit();
  }

  selectCode(e){
    console.log(e)
    this.codeFormat = e;
  }

}
