import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/internal/operators/first';
import { ProductService } from 'src/app/core/_services/product.service';

@Component({
  selector: 'app-antifake-product-info',
  templateUrl: './antifake-product-info.component.html',
  styleUrls: ['./antifake-product-info.component.css']
})
export class AntifakeProductInfoComponent implements OnInit {
  selectedTab: any = 'product-info' ;
  
  lastImage: string | ArrayBuffer;
  data: any;
  success_msg: any;
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService, 
  ) {
    


  }

   

  ngOnInit() {
    
  }

 

  



  

  switchTab(id){
    this.selectedTab = id;
  }


}
