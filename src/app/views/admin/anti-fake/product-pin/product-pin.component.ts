import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from 'src/app/core/_models';
import { AuthenticationService } from 'src/app/core/_services/authentication.service';
import { NavbarService } from 'src/app/core/_services/navbar.service';
import { ProductService } from 'src/app/core/_services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-pin',
  templateUrl: './product-pin.component.html',
  styleUrls: ['./product-pin.component.css']
})
export class ProductPinComponent implements OnInit {
  pinHistoryUrl = environment.apiUrl+'/api/v2/pin-assigment-request?per_page=15&page=1';
  pinAssignmentRequestUrl = environment.apiUrl+'/api/v2/pin-assigment-request';
  datas: any[];
  created_at: any;
  product_name: any;
  product_batch: any;
  product_status: any;
  currentStage = 1;
  currentUserSubscription: Subscription;
  currentUser: User;
  userProducts: any[];
  selectedProductId: any;
  productBatches: any[];
  selectedBatch: any;
  label_placement: any;
  label_quantity: any;
  loading: boolean = false;
  serialNumbers: any[];
  subProductLabel: any;
  viewBox: boolean = false;
  searchTerm = '';
  term = '';
  showModal: boolean = false;
  selected: any;


  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private navService: NavbarService
  ) {
    this.getPinHistory();
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('User value', this.currentUser);
    });
    this.getUserProduct()
    // this.getUserProductsBatches()
    this.fetchLabels();
    this.navService.show();
  }

  ngOnInit(): void {
  }

  getUserProduct(){
    console.log(this.currentUser.id)
    this.productService.getAllUserProducts(this.currentUser.id).subscribe((res:any)=>{
    // this.productService.getChekkitProducts().subscribe((res:any)=>{
      console.log(res)

      this.userProducts = res.data.products;
      // console.log(this.userProducts)
    })
  }

  getUserProductsBatches(){
    this.productService.getAllProductBatches(this.selectedProductId).subscribe((res: any)=>{

      this.productBatches = res.data.productBatches;
      console.log(res)
    })
  }

  getPinHistory(){
    this.http.get(this.pinHistoryUrl).subscribe((res: any)=>{

      this.datas = res.data.rows;
      console.log(this.datas)
      // this.created_at = this.data.created_at;
      // this.product_name = this.data.product.product_name;
      // this.product_batch = this.data.subProduct.batch_num;
      // this.product_status = this.data.status


    })
  }

  nextStep(){
    this.currentStage = this.currentStage +1;
  }
  stepBack(){
    this.currentStage = this.currentStage -1;
  }

  goHome(){
    this.router.navigate(['/MAS'])
  }


  submitRequest(){
    this.loading = true;
    const body = {
      "productId": parseInt(this.selectedProductId),
      "subProductId": parseInt(this.selectedBatch),
      "stickerPlacement": parseInt(this.label_placement),
      "quantity": this.label_quantity
    }

    console.log(body);

    this.http.post(this.pinAssignmentRequestUrl, body).subscribe((res: any)=>{
      console.log(res)
      this.loading = false;
      if(res.statusCode == 200){
        this.getPinHistory();
        this.currentStage = 4;
      }
    })

  }

  selectProduct(e){
    console.log(e)
    this.selectedProductId = e


    this.getUserProductsBatches()

  }

  selectBatch(e){
    this.selectedBatch = e;

  }


  selectLabel(e){
    this.label_placement = e
  }


  fetchLabels(){
    this.productService.getAssignedLabels().subscribe((res: any)=>{
      if(res.statusCode === 200){
        this.serialNumbers = res.data;
        console.log(this.serialNumbers)
      }
    },(error)=>{
      console.log(error)
    })
  }

  viewPinDetail(e){
    const selectedPin = this.datas.findIndex(item => item.id == e);
    this.selected = this.datas[selectedPin];
    this.showModal = true;
  }

}


