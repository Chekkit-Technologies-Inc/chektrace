import { AlertService } from './../../../../core/_services/alert.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/_models';
import { AuthenticationService, ProductService } from 'src/app/core/_services';
import { NavbarService } from 'src/app/core/_services/navbar.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {
  step = 1;
  receiveModal: boolean = false;
  shipModal: boolean = false;
  isItemVisible: boolean = false;
  stockModal: boolean = false;
  unpackModal: boolean = false;
  showField: boolean = false;
  codes = [];
  locations: any;
  currentUser: User;
  currentUserSubscription: Subscription
  save_products: any;
  destinationLoc: any;
  destLat: any;
  destLon: any;
  subProductId: any;
  receiveList: any[] = [];
  shipList: any[] = [];
  item: any;
  loading: boolean;
  shippingLoc: any;
  OriginLat: any;
  OriginLon: any;
  receivedItems: any;
  selectedObj: any;
  stockCount: any;
  stringifiedCount: any;
  description: any;
  parent_container: any;
  code: string;
  userType: any;
  selectedProduct: any;
  productBatches: any;
  selectedProductBatch: any;

  constructor(
    private router: Router,
    public navService: NavbarService,
    private productService: ProductService,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('User value', this.currentUser);
      this.userType = this.currentUser.membership_type;
    });
    this.getAllProducts();
    this.getGs1Location();
    this.getReceivedItem();
    this.getStock();
   }

  ngOnInit(): void {
    this.navService.hide()
  }

  subscribe(){
    this.router.navigate(['/traceability/generate-serial'])
  }

  getGs1Location(){
    this.productService.get_gs1_locations().subscribe((res: any)=>{
      this.locations = res.data;
      console.log(res)
    })
  }

  getAllProducts(){
    this.productService.getAllUserProducts(this.currentUser.company_id).subscribe((save_products: any) => {
      if (save_products) {
        console.log(save_products)
        this.save_products = save_products.data.products;

      }
    },(error)=>{
      // this.alertService.simpleAlert(error)
    });
  }

  selectDestinationLocation(e){
    this.destinationLoc = e;
    const destinationloacation = this.locations.findIndex(item => item.gln == e);
    this.destLat = this.locations[destinationloacation].latitude;
    this.destLon = this.locations[destinationloacation].longitude;
  }

  selectShippingLocation(e){
    console.log(e)
    this.shippingLoc = e
    const originLocation = this.locations.findIndex(item => item.gln == e)
    this.OriginLat = this.locations[originLocation].latitude;
    this.OriginLon = this.locations[originLocation].longitude;
  }

  selectProduct(e){
    this.selectedProduct = e;

    if(this.selectedProduct){
      this.getUserProductsBatches()
    }
  }

  getUserProductsBatches(){
    this.productService.getAllProductBatches(this.selectedProduct).subscribe((res: any)=>{

      this.productBatches = res.data.productBatches;
      console.log(res);
      if(res.statusCode == 200){
        this.showField = true;
      }
    })
  }

  selectProductBatch(e){
    this.selectedProductBatch = e;
  }

  addReceive(){
    this.receiveList.push(this.item);
    this.item = '';
  }

  delete(i: any){
    const itemDelete: number = this.receiveList.indexOf(i);
    if(itemDelete !== -1){
      this.receiveList.splice(itemDelete, 1);
    }
  }

  deleteStock(i: any){
    const itemDelete: number = this.codes.indexOf(i);
    console.log(itemDelete)
    if(itemDelete !== -1){
      this.codes.splice(itemDelete, 1);
    }
  }

  deleteShip(i: any){
    const itemDelete: number = this.shipList.indexOf(i);
    if(itemDelete !== -1){
      this.shipList.splice(itemDelete, 1);
    }
  }



  receiveContainer(){
    this.loading = true;
    const body = {
      "subProductId": parseInt(this.selectedProductBatch),
      "gln": this.destinationLoc,
      "latitude": this.destLat,
      "longitude": this.destLon,
      "items": this.receiveList
    }

    console.log(body)

    this.productService.receiveContainer(body).subscribe((res: any)=>{
      this.loading = false;
      console.log(res)
      if(res.statusCode == 200){
        this.alertService.showAlertNotification('Success', res.message, 'success');
        this.getReceivedItem();
        this.receiveModal = !this.receiveModal;
        this.receiveList = [];

      }
    },(error)=>{
      this.alertService.showAlertNotification('Oops', 'An Error Occured, try again later', 'error')
    })

  }

  getReceivedItem(){
    this.productService.getShippedItem().subscribe((res: any)=>{
      console.log(res);
      this.receivedItems = res.data;
      if(this.receivedItems.length  ){
        this.isItemVisible = true;
      }
    })
  }

  addShip(){
    this.shipList.push(this.item);
    this.item = '';
  }



  addCode(){
    this.codes.push(this.code);
    setTimeout(()=>{
      this.code = '';
    }, 500)
    console.log(this.codes)
  }

  shipContainer(){
    this.loading = true;
    const body = {
      "subProductId": parseInt(this.selectedProductBatch),
      "origin_gln": this.shippingLoc,
      "origin_latitude": this.OriginLat,
      "origin_longitude": this.OriginLon,
      "destination_gln": this.destinationLoc,
      "containers": this.shipList
    }

    console.log(body)

    this.productService.comfirm_shipping(body).subscribe((res: any)=>{
      this.loading = false;
      console.log(res)
      if(res.statusCode == 200){
        this.shipModal = !this.shipModal;
        this.receiveList = [];

      }
    }),(error)=>{
      console.log(error)
      this.loading = false;
      this.alertService.showAlertNotification('Oops!', error, 'error')
    }

  }

  view(e){
    const selectedItem = this.receivedItems.findIndex(item => item.id === e);
    this.selectedObj = this.receivedItems[selectedItem];
    console.log(this.selectedObj);
    this.step = 2;
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

  scanProduct(){
    this.loading = true;
    const body = {
      "serials": this.codes,
      "productId": this.selectedProduct,
      "comment": this.description
    }
    this.productService.postStockCount(body).subscribe((res: any)=>{
      this.loading = false;
      if(res.statusCode == 200){
        this.alertService.showAlertNotification('Success', res.message, 'success')
        this.stockModal = !this.stockModal;
        this.getStock();
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

  unpackPackage(){
    this.loading = true;
    const body = {
      "subProductId": parseInt(this.subProductId),
      "parentSerial": this.parent_container,
      "children": this.codes
    }



    // console.log(body)

    setTimeout(()=>{
      this.productService.unpackPackages(body).subscribe((res: any)=>{
        this.loading = false;
        this.unpackModal = !this.unpackModal;
        console.log(res);
        this.parent_container = '';
        this.codes = [];
        this.code = '';
       if(res.statusCode == 200){
        this.alertService.showAlertNotification('Success!', res.message, 'success')
       }
      },(error)=>{
        this.loading = false;
        console.log(error)
        this.alertService.showAlertNotification('Error', error, 'error')
      })

  }, 3000);
  }

}
