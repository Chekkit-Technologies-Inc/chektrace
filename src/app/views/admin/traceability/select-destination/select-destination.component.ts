import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare const google: any;
import * as moment from 'moment';
import { NavbarService } from 'src/app/core/_services/navbar.service';
import { ProductService } from 'src/app/core/_services/product.service';

@Component({
  selector: 'app-select-destination',
  templateUrl: './select-destination.component.html',
  styleUrls: ['./select-destination.component.css']
})
export class SelectDestinationComponent implements OnInit {

  map: any;
  nextStep = 2;
  locations: any;
  container_count: any;
  capacity_level: any;
  batchNum: any;
  productDetails: any;
  subProductId: any;
  destinationLoc: any;
  productionLoc: any;
  productName: any;
  originLat: any;
  originLon: any;
  shippingSummary: any;
  summaryId: any;
  selectedSummary: any;
  loading: boolean = false;
  productSerialNumber: any;
  productId: any;
  ssccList: any = [];
  receiveList: any = [];
  sscc: string;
  pallet_sscc: string;
  conatinerValue: any = [];
  selectedContainer: any;
  containerList: any = [];
  loadingContainer: any;
  selectedContainerInfo: any;
  containerCodes: any = [];
  selectedContainerToLoad: any;
  destLat: any;
  destLon: any;
  recieved_container: string;
  viewContainers: boolean = false;
  containerSSCC: any;
  selectedTab = 'generated-stickers'
  serial_range: any;
  serialRange: any = [];
  selectedItem: any;

  constructor(
    private router: Router,
    private productService: ProductService,
    public navService: NavbarService,
  ) {
    this.getGs1Location();


   }

  ngOnInit(): void {
    this.initMap();
    const productBatch = localStorage.getItem('batchProduct');
    this.productDetails = JSON.parse(productBatch);
    console.log(this.productDetails)
    this.batchNum = this.productDetails.batch_num;
    this.subProductId = this.productDetails.id;
    this.productName = this.productDetails.product_name;

    this.navService.show()
  }

  initMap(): void {
    let map = document.getElementById("map-canvas");
    this.getPosition().then(pos=>
     {
     const mapOptions = {
       zoom: 10,
       center: new google.maps.LatLng(pos.lat,pos.lng),
       scrollwheel: false,
       mapTypeId: google.maps.MapTypeId.ROADMAP,
       disableDefaultUI: true,
       zoomControl: true,
       styles: this.mapStyles,
       scaleControl: false,
     };

     this.map = new google.maps.Map(map, mapOptions);
   });


    navigator.permissions.query({
      name: 'geolocation'
    }).then(function(result) {
        if (result.state == 'granted') {
            console.log(result.state);
        } else if (result.state == 'prompt') {
            console.log(result.state);

        } else if (result.state == 'denied') {
            console.log(result.state);
        }
        result.onchange = function() {
            console.log(result.state);
        }
    });
  }

  getPosition(): Promise<any>{
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {

          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }
  addMore(){

    const numberRange = this.serial_range
    this.serialRange.push(numberRange);

    this.serial_range = '';

  }

  getContainerBatch(){
    setTimeout(()=>{
      console.log(this.subProductId)
      this.productService.getContainerBatch(this.subProductId).subscribe((res: any)=>{
        console.log(res)
        this.conatinerValue = res.data;
        console.log(this.conatinerValue)
      })
    }, 2000)
  }

  back(){
    this.router.navigate(['/traceability/serial-number-summary'])
  }

  proceedToLoad(e){
    this.containerSSCC = e;
    this.nextStep = 5;
  }

  addtoQueue(){
    setTimeout(()=>{
      this.ssccList.push(this.pallet_sscc);
      this.pallet_sscc = '';

      console.log(this.ssccList);
    }, 1000)
  }

  openContainers(){
    this.viewContainers = !this.viewContainers;
  }

  addReceive(){
    this.receiveList.push(this.recieved_container);
    this.recieved_container = '';
  }



  proceedToSurvey(){
    this.router.navigate(['/traceability/assign-surveys'])
  }

  nextScreen(){
    this.nextStep --;
  }

  serializePackage(){
    this.loading = true;
    const body = {
      "count": this.container_count,
      "containerCapacity": this.capacity_level,
      "subProductId": this.subProductId
    }

    console.log(body)

    this.productService.run_shipping(body).subscribe((res: any)=>{
      this.loading = false;
      console.log(res)
      if(res.statusCode == 200){
        this.getContainerBatch();
        this.nextStep = 7;

        console.log(this.containerList)
      }
    },(error)=>{
      this.loading = false;
    })
  }

  selectItem(e){
    this.selectedItem = e
    if(e == 'Container'){
      this.getContainerBatch()
      this.nextStep= 7;
    }
  }

  ship(){

    this.loading = true;
    const body = {
      "subProductId": this.subProductId,
      "origin_gln":this.productionLoc,
      "destination_gln": this.destinationLoc,
      "origin_latitude": this.originLat,
      "origin_longitude": this.originLon,
      "containers": this.containerCodes,
    }

    console.log(body);

    this.productService.comfirm_shipping(body).subscribe((res: any)=>{
      this.loading = false;
      console.log(res)

      if(res.statusCode == 200){
        this.getShippingSummary();
        this.nextStep = 3;
      }
    },(error)=>{
      this.loading = false;
    })
  }

  getShippingSummary(){
    this.productService.get_shipping_summary(this.subProductId).subscribe((res: any)=>{
      console.log(res)

      if(res.statusCode == 200){
        // this.nextStep= 3;

        this.shippingSummary = res.data
      }
    })
  }

  loadContainer(){
    this.loading = true;
    const body = {
      "subProductId": this.subProductId,
      "container": this.sscc,
      "children": this.ssccList
    }

    console.log(body)

    this.productService.loadContainer(body).subscribe((res: any)=>{
      console.log(res)
      this.loading = false;
      this.loading = false;
      if(res.statusCode == 200){
        this.nextStep = 2
      }
    }, (error)=>{
      this.loading = false;
      alert(error)
    })
  }

  receiveContainer(){
    this.loading = true;
    const body = {
      "gln": this.destinationLoc,
      "latitude": this.destLat,
      "longitude": this.destLon,
      "items": this.receiveList
    }

    this.productService.receiveContainer(body).subscribe((res: any)=>{
      console.log(res)
      if(res.statusCode == 200){

      }
    })

  }


  viewSummary(e){
    this.loading = true;
    // this.loading = true;


    setTimeout(()=>{
      this.summaryId = e;
      const summaryDetail = this.shippingSummary.findIndex(item => item.id == e);
      this.selectedSummary = this.shippingSummary[summaryDetail];
      // product Informaton
      this.productSerialNumber = this.selectedSummary.serialNumber;
      this.productId = this.selectedSummary.productId;

      this.productService.getProductDetails(this.productId).subscribe((res: any)=>{
        this.productDetails = res.data;
        console.log(res)
        this.nextStep = 4;
        this.loading = false;
      });
    }, 2000)



  }

  selectDestinationLocation(e){
    this.destinationLoc = e;
    const destinationloacation = this.locations.findIndex(item => item.gln == e);
    this.destLat = this.locations[destinationloacation].latitude;
    this.destLon = this.locations[destinationloacation].longitude;
  }

  // selectContainer(e){
  //   this.selectedContainer = e;
  //   this.containerCodes.push(this.selectedContainer);
  //  this.selectedContainerInfo = this.conatinerValue.findIndex(item => item.elementString == this.selectedContainer );
  //  this.containerList.push(this.conatinerValue[this.selectedContainerInfo]);
  //  this.selectedContainer = '';
  //  console.log(this.selectedContainerInfo)
  //  console.log(this.containerList)
  // }

  selectContainer(){
    this.containerCodes.push(this.selectedContainer);
    console.log(this.containerCodes)
    this.selectedContainer = ''
  }



  selectContainerToLoad(e){
    this.selectedContainerToLoad = e;
  }

  gotoReceive(){
    this.router.navigate(['traceability/receive'])
  }

  selectProductionLocation(e){
    this.productionLoc = e;
    const destinationDetail = this.locations.findIndex(item => item.gln == e);
    this.originLat = this.locations[destinationDetail].latitude;
    this.originLon = this.locations[destinationDetail].longitude;
  }


  mapStyles = [
    {
      featureType: "administrative",
      elementType: "labels.text.fill",
      stylers: [{ color: "#444444" }],
    },
    {
      featureType: "landscape",
      elementType: "all",
      stylers: [{ color: "#f2f2f2" }],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      elementType: "all",
      stylers: [{ saturation: -100 }, { lightness: 45 }],
    },
    {
      featureType: "road.highway",
      elementType: "all",
      stylers: [{ visibility: "simplified" }],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "water",
      elementType: "all",
      stylers: [{ color: "#adb7d6" }, { visibility: "on" }],
    },
  ]


  getGs1Location(){
    this.productService.get_gs1_locations().subscribe((res: any)=>{
      this.locations = res.data;
      console.log(res)



    })
  }

  removeCode(e){
    const item = this.serialRange.findIndex(item => item.serial === e );
    // console.log(item)
    this.serialRange.splice(item, 1)
  }

  comissionProduct(){
    this.loading = true;
    const body = {
      "elementStrings": this.serialRange,
      "subProductId": this.subProductId,
      "gln": '',
      "latitude": '',
      "longitude": ''
    }
    console.log(body)
    this.productService.comission_product(body).subscribe((res: any)=>{
      this.loading = false;
      console.log(res)
      if(res.statusCode == 200){
        // this.toastService.show(res.message)
      //  this.getProductDetails();
        this.getContainerBatch()
        this.nextStep = 7;
        this.viewContainers = false;
        this.serialRange = [];
      }else{
        // this.toastService.show(res.message)
      }
    }, (error)=>{
      this.loading = false;
      console.log(error);
      // this.alertService.simpleAlert(error)
    })

  }


}
