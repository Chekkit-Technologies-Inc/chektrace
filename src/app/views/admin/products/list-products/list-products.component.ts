import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '../../../../core/_models/user';
import { Subscription } from 'rxjs';
import { ProductService, AuthenticationService } from '../../../../core/_services';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Product } from '../../../../core/_models';
import { UtilityProvider } from '../../../../core/_helpers/utility';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  rows = [];
  temp = [];
  success_msg: any;
  loadingIndicator = true;
  closeResult: any;
  data: any;
  productObjct: any;
  productForm: FormGroup;
  pinForm: FormGroup;
  form: FormGroup;
  rewardForm: FormGroup;
  loading = false;
  submitted = false;
  save_products: any;
  save_surveyReward: any;
  selectChange: any;
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(
    private productService: ProductService,
    public utility: UtilityProvider,
    private authenticationService: AuthenticationService, 
    private router: Router
    ) {

      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
        this.currentUser = user;
        console.log('User value', this.currentUser);
      });
      this.getAllProducts();
    }

    getAllProducts() {
      this.utility.startBarLoader()
      this.authenticationService.allProducts.subscribe(save_products => {
        if (save_products) {
          this.save_products = save_products;
          this.productService.getAllUserProducts(this.currentUser.id).pipe(first()).subscribe(data => {
            console.log('to save ', data['data']?data['data'].products:'');
            this.utility.stopBarLoader()
            if (data['data'] && data['data'].products) {
              this.save_products = data['data'].products;
              localStorage.setItem('allProducts', JSON.stringify(data['data'].products));
            }
          });
        } else {
          this.productService.getAllUserProducts(this.currentUser.id).pipe(first()).subscribe(data => {
            console.log('to save ', data['data']?data['data'].products:'');
            this.utility.stopBarLoader()
            if (data['data'] && data['data'].products) {
              this.save_products = data['data'].products;
              localStorage.setItem('allProducts', JSON.stringify(data['data'].products));
            }
          });
        }
      });
    }
    ngOnInit() {

    }
    editProduct(product: any) {
      console.log("product", product);
      // let data = JSON.stringify(product);

      this.productService.updateProductDetails(product);
      const slug = product?product?.slug:'';

      this.router.navigate(['/dashboard/products/edit-product'], { queryParams: { slug }});
    }

    viewPerfoormance(product: Product) {
      console.log("product", product);
      let data = JSON.stringify(product);
      this.router.navigate(['/dashboard/products/edit-product'], { queryParams: { data }, skipLocationChange: true });
    }

    
    ViewProduct(product: Product) {
      console.log("product", product);

      this.productService.updateProductDetails(product);
      const slug = product?product?.slug:'';
      this.router.navigate(['/dashboard/products/product-batches'], { queryParams: { slug } });
    }
    

    CreateBatch(product: Product) {

      this.productService.updateProductDetails(product);
      let q = product.slug;
      this.router.navigate(['/dashboard/products/create-batch'], { queryParams: { q }});
    }
}
