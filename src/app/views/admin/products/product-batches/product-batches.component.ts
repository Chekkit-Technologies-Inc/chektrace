import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../../../../core/_services/product.service';
import { first } from 'rxjs/operators';
import { User } from '../../../../core/_models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../../core/_models/product';
import { AuthenticationService } from '../../../../core/_services/authentication.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-product-batches',
  templateUrl: './product-batches.component.html',
  styleUrls: ['./product-batches.component.css']
})
export class ProductBatchesComponent implements OnInit {
  rows = [];
  temp = [];
  data: any;
  currentUser: User;
  productObject: any;
  slug: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, {static: false})
  datatableElement: DataTableDirective;

  constructor(private productService: ProductService, private authenticationService: AuthenticationService,
    private activatedRoute: ActivatedRoute, private router: Router) {
    // if (!authenticationService.tokenExist()) {
    //   router.navigate(['pages/auth/login']);
    // }
      this.slug = this.activatedRoute.snapshot.queryParams.slug;
      this.getProduct()
      this.productService.productDetails$.subscribe(
        (details) => {
          this.productObject = details;
          console.log(details)
        }
      );
  }

  ngOnInit() {
  }
  get_Allbatches() {
    this.productService.getAllProductBatches(this.productObject.id).pipe(first()).subscribe(data => {
      if (data['status']) {
        console.log(data['data'].productBatches);
        this.data = data['data'].productBatches;
        this.rows = this.data;
        this.temp = [...this.data];
      }
    });
  }



  getProduct() {
    this.productService.getProduct(this.slug).pipe(first()).subscribe(data => {
      console.log("result of survey", data['data']);
      if (data['data']) {
        console.log('okay ooo', data['data']);
        this.productObject = data['data'];
        this.get_Allbatches();
      }
    });
  }

  doTrigger(){
    console.log(889);
    
    this.dtTrigger.next();
  }

  gotoCreateBatch(product: Product) {
    let q = JSON.stringify(product.id);
    this.router.navigate(['/dashboard/products/create-batch'], { queryParams: { q }});
  }

  ViewBatch(batch: any) {
    console.log("b", batch);

    this.productService.updateBatchDetails(batch);
    this.productService.updateProductDetails(this.productObject);
    const slug = this.productObject?this.productObject?.slug:'';

    this.router.navigate(['/dashboard/products/view-batch'], { queryParams: { slug } });
  }

  gotoEditBatch(batchData: any) {
    // console.log('yeshshs ', batchData);

    let data = JSON.stringify({
      batch: batchData
    });

    this.router.navigate(['/dashboard/products/edit-batch'], { queryParams: { data }, skipLocationChange: true });

  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    // const temp = this.temp.filter(function(d) {
    //   return d.reward_value.toLowerCase().indexOf(val) !== -1 || !val || JSON.stringify(d.reward_quantity).indexOf(val) !== -1 || !val  || d.reward_type.toLowerCase().indexOf(val) !== -1 || !val ;
    // });
    this.dtTrigger.next();
    // update the rows
    // this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    // this.table = this.rows;
  } 

}
