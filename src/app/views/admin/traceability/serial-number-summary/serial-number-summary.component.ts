import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from 'src/app/core/_services/navbar.service';
import { ProductService } from 'src/app/core/_services/product.service';

@Component({
  selector: 'app-serial-number-summary',
  templateUrl: './serial-number-summary.component.html',
  styleUrls: ['./serial-number-summary.component.css']
})
export class SerialNumberSummaryComponent implements OnInit {
  isOpened: boolean = false;
  recieved_container: any;
  receiveList: any= [];
  destinationLoc: any;
  destLat: any;
  destLon: any;
  locations: any;
  loading: boolean = false;
  nextStep = 1;
  conatainerSSCC: any;
  productDetails: any;
  subProductId: any;

  constructor(
    private router: Router,
    private productService: ProductService,
    public navService: NavbarService,
    private _Activatedroute: ActivatedRoute
  ) {
    this.getGs1Location();
    this._Activatedroute.paramMap.subscribe(params => {
      this.conatainerSSCC = params.get('id');

    });
    // const productBatch = localStorage.getItem('batchProduct');
    // this.productDetails = JSON.parse(productBatch);
    // this.subProductId = this.productDetails.id;
   }

  ngOnInit(): void {
    this.navService.show()
  }

  toggle(){
    this.isOpened = !this.isOpened;
  }

  continue(){
    this.router.navigate(['/traceability/select-destination'])
  }

  back(){
    this.router.navigate(['/traceability/package-hierarchy'])
  }

  addReceive(){
    this.receiveList.push(this.recieved_container);
    this.recieved_container = '';
  }
  getGs1Location(){
    this.productService.get_gs1_locations().subscribe((res: any)=>{
      this.locations = res.data;
      console.log(res)
    })
  }

  selectDestinationLocation(e){
    this.destinationLoc = e;
    const destinationloacation = this.locations.findIndex(item => item.gln == e);
    this.destLat = this.locations[destinationloacation].latitude;
    this.destLon = this.locations[destinationloacation].longitude;
  }

  receiveContainer(){
    this.loading = true;
    const body = {
      "subProductId": parseInt(this.conatainerSSCC),
      "gln": this.destinationLoc,
      "latitude": this.destLat,
      "longitude": this.destLon,
      "items": this.receiveList
    }

    this.productService.receiveContainer(body).subscribe((res: any)=>{
      this.loading = false;
      console.log(res)
      if(res.statusCode == 200){
        this.nextStep = 2
      }
    })

  }

}
