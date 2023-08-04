import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/_services/product.service';
import { AlertService } from 'src/app/core/_services/alert.service';

@Component({
  selector: 'app-quick-request',
  templateUrl: './quick-request.component.html',
  styleUrls: ['./quick-request.component.css']
})
export class QuickRequestComponent implements OnInit {
  quantity: any;
  address: any;
  region: any;
  country: any;
  loading: boolean = false;
  save_products: any;
  subProductId: any;
  labelType: any;
  tagStatus: any;
  formattedaddress: any;
  formattedRegion: any;
  isLabelRequest: boolean = true;
  isLabelInvoice: boolean = false;
  options={
    componentRestrictions:{
      country:["NG"]
    }
  }
  date: any;
  customerCountry: any;
  customerAddress: any;
  customerLabelType: any;
  labelQuantity: any;
  labelStatus: any;
  taggantStatus: any;
  addressRegion: any;
  reference: any;


  constructor(
    private productService: ProductService,
    private alertService: AlertService
  ) {

      this.productService.getChekkitProducts().subscribe((save_products: any) => {
        if (save_products) {
          console.log(save_products)
          this.save_products = save_products.data;

        }
      });

   }

  ngOnInit(): void {
  }

  public AddressChange(address: any) {
    //setting address from API to local variable
     this.formattedaddress=address.formatted_address;
     console.log(this.formattedaddress)
  }

  public RegionChange(address: any) {
    //setting address from API to local variable
     this.formattedRegion=address.formatted_address;
     console.log(this.formattedRegion)
  }
  selectLabelType(e){
    console.log(e.target.value);
    this.labelType = e.target.value;
  }

  selectTagOpt(e){
    this.tagStatus = e.target.value;
    console.log(this.tagStatus)
  }
  requestLabels(){
    const body = {
      "produnctId": parseInt(this.subProductId),
      "quantity": parseInt(this.quantity),
      "labelType": this.labelType,
      "withTaggant": this.tagStatus,
      "address": this.formattedaddress,
      "region": this.formattedRegion,
      "country": this.country
    }
    console.log(body)
    this.productService.requestLabels(body).subscribe((res: any)=>{
      console.log(res);
      if(res.message === "OK"){
        // this.alertService.showAlertNotification('Success', 'Label Request Successful', 'success');
        this.isLabelInvoice = true;
        this.isLabelRequest = false;
        this.customerAddress = res.data.address;
        this.customerCountry = res.data.country;
        this.date = res.data.created_at;
        this.customerLabelType = res.data.labelType;
        this.labelQuantity = res.data.quantity;
        this.labelStatus = res.data.status;
        this.taggantStatus = res.data.withTaggant;
        this.addressRegion = res.data.region;
        this.reference = res.data.reference;
      }
    },(error)=>{
      this.alertService.showAlertNotification('Error', 'Something unexpected happened, please try again.', 'error')
    })
  }

  // selectLabelType(e){
  //   console.log(e.target.value);
  //   this.labelType = e.target.value;
  // }

  selectType(e){
    this.tagStatus = e.target.value;
    console.log(this.tagStatus)
  }

  goBack(){
    this.isLabelInvoice = false;
    this.isLabelRequest = true;
  }


  selectProduct(e){
    this.subProductId = e.target.value;
    console.log(this.subProductId)

  }

}
