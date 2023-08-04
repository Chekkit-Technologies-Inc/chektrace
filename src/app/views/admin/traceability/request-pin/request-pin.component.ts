import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/_services';

@Component({
  selector: 'app-request-pin',
  templateUrl: './request-pin.component.html',
  styleUrls: ['./request-pin.component.css']
})
export class RequestPinComponent implements OnInit {

  nextStep: number = 1;
  productDetails: any;
  subProductId: any;
  productId: any;
  batchNum: any;
  productName: any;
  productExpiry: any;
  productionDate: any;
  commissionAll: boolean = false;
  serialRange: any;
  serial_range: any;
  loading: boolean;
  gtin: string;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private productService: ProductService
  ) {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.productId = params.get('id'); 

      console.log(this.productId)
    });

    this.productService.getPackageLevel(this.productId).subscribe((res: any)=>{
      console.log(res)
    })
   }

  ngOnInit(): void {
    // const productBatch = localStorage.getItem('batchProduct');
    // console.log(JSON.parse(productBatch));
    // this.productDetails = JSON.parse(productBatch);
    // this.subProductId = this.productDetails.id;
    // this.productId = this.productDetails.productId;
    // this.batchNum = this.productDetails.batch_num;
    // this.productName = this.productDetails.product_name;
    // this.productExpiry = this.productDetails.expiry_date;
    // this.productionDate = this.productDetails.production_date
  }

  prevStep(){
    this.nextStep --;
  }
  comissionAll(){
    this.commissionAll = !this.commissionAll;
  }

  addMore(){

    const numberRange = this.serial_range
    this.serialRange.push(numberRange);

    this.serial_range = '';
  }

  copySerial(serial: any) {
    navigator.clipboard.writeText(serial).then().catch(e => console.log(e));
  }

  packingSummary(){
    this.nextStep = 8;
  }

  comissionProduct(){
    this.loading = true;
    const body = {
      "serialNoRange": this.serialRange,
      "subProductId": this.productId,
      "gln": localStorage.getItem('locationGln'),
      "latitude": localStorage.getItem('locationLat'),
      "longitude": localStorage.getItem('locationLong')
    }
    console.log(body)
    // this.productService.comission_product(body).subscribe((res: any)=>{
    //   this.loading = false;
    //   console.log(res)
      

    //   if(res.statusCode == 200){
       
    //     this.nextStep = 6;
    //   }
    // })

  }


}
