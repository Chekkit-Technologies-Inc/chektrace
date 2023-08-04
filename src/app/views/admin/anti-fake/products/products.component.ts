import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthenticationService, ProductService, SurveyRewardService } from 'src/app/core/_services';
import { FooterService } from 'src/app/core/_services/footer.service';
import { NavbarService } from 'src/app/core/_services/navbar.service';
import { User } from '../../../../core/_models';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  availableProducts: [];
  currentUser: User;
  currentUserSubscription: Subscription;
  save_products: any;
  p: number = 1;
  currentPage = 1;
  activeId: any;
  saved_products: any;
  searchTerm = '';
  term = '';
  showModal: boolean = false;
  selectedProduct: any;
  isLoading: boolean = false;

  constructor(
    public footerService: FooterService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private productService: ProductService,
    private navService: NavbarService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('User value', this.currentUser);
    });
    this.navService.show()
  }

  ngOnInit(): void {
    this.footerService.hide();
    this.getAllProducts();
  }

  getAllProducts(){
    this.productService.getAllUserProducts(this.currentUser.id).subscribe((save_products: any) => {
      if (save_products) {
        console.log(save_products)
        this.saved_products = save_products.data.products.sort((a,b) => b.id - a.id)
      }
    });
  }

  confirm(id){
    const selectedBatch = this.saved_products.findIndex(item => item.id == id);
    this.selectedProduct = this.saved_products[selectedBatch];
    // console.log(this.selectedProduct)
    this.showModal = true;
  }

  deleteProduct(id){
    this.isLoading = true;
    this.productService.delete_product(id).subscribe((res: any)=>{
      if(res.message == 'OK'){
        window.location.reload()
      }else{
        this.isLoading = false;
      }
    }, (error)=>{
      this.isLoading = false;
    })
  }

  addProduct(){
    this.router.navigate(['/mas/product-info'])
  }

  goHome(){
    this.router.navigate(['/mas'])
  }

  // doNothing(){
  //   this.router.navigate(['/mas'])
  // }

  backToProduct(e){
    console.log(e)
    this.activeId = e;
    console.log(this.activeId)
    this.router.navigate(['/mas/product-identity', this.activeId])
  }



}
