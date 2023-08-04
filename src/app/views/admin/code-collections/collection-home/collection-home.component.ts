import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../core/_services/authentication.service';
import { first } from 'rxjs/operators';
import { Product } from '../../../../core/_models';
import { Subscription } from 'rxjs';
import { User } from '../../../../core/_models/user';
import { ProductService } from '../../../../core/_services/product.service';
import { Router } from '@angular/router';
import { UtilityProvider } from '../../../../core/_helpers/utility';

@Component({
  selector: 'app-collection-home',
  templateUrl: './collection-home.component.html',
  styleUrls: ['./collection-home.component.css']
})
export class CollectionHomeComponent implements OnInit {
  currentUserSubscription: Subscription;
  currentUser: User;
  productObjct: any;
  data: any;
  batches: any;
  temp: any[];
  color = "light";

  constructor(
    private authenticationService: AuthenticationService, 
    public utility: UtilityProvider, 
    private productService: ProductService,
    private router: Router) {

    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('User value', this.currentUser);
    });
    this.get_UserAllbatches();
  }

  ngOnInit() {
  }

  get_UserAllbatches() {
    this.productService.getAllUserProductBatches(this.currentUser.id).pipe(first()).subscribe(data => {
      if (data['status']) {
        console.log(data['data'].UserproductBatches);
        this.data = data['data'].UserproductBatches;
        this.batches = this.data;
        this.temp = [...this.data];
      }
    });
  }

  gotoCreateBatch() {
    const data = this.productObjct;
    this.router.navigate(['/pages/create-batch'], { queryParams: { data }, skipLocationChange: true });
  }

  ViewBatch(product: any) {
    console.log("product", product);
    this.productObjct = product.product;

    this.productService.updateBatchDetails(product);
    this.productService.updateProductDetails(product.product);
    const slug = product?product.product?.slug:'';

    this.router.navigate(['/dashboard/products/view-batch'], { queryParams: { slug } });
  }

  gotoPrintCode(product: any) {
    this.productObjct = product.product;

    console.log(product)
    this.productService.updateBatchDetails(product);
    this.productService.updateProductDetails(product.product);
    const slug = product?product.product?.slug:'';
    
    this.router.navigate(['/dashboard/products/product-pins'], { queryParams: { slug } });
  }


}
