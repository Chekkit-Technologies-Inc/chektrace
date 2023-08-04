import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/_models/user';
import { AuthenticationService, ProductService } from 'src/app/core/_services';

@Component({
  selector: 'app-active-campaign',
  templateUrl: './active-campaign.component.html',
  styleUrls: ['./active-campaign.component.css']
})
export class ActiveCampaignComponent implements OnInit {
  currentStage = 1;
  CodeFormat: any;
  labelStatus: any;
  currentUser: User;
  labelExist: boolean = false;
  currentUserSubscription: Subscription;
  userProducts: any;
  selectedProductId: any;
  productBatches: any;

  constructor(
    private authenticationService: AuthenticationService,
    private productService: ProductService,
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('User value', this.currentUser);
    });

    this.getUserProduct()
   }

  ngOnInit(): void {
  }

  selectCode(e){
    console.log(e)
    this.labelStatus = e;
    if(e === 'yes'){
      this.labelExist = true;
    }
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

  selectProduct(e){
    console.log(e)
    this.selectedProductId = e


    this.getUserProductsBatches()

  }

  getUserProductsBatches(){
    this.productService.getAllProductBatches(this.selectedProductId).subscribe((res: any)=>{

      this.productBatches = res.data.productBatches;
      console.log(res)
    })
  }

}
