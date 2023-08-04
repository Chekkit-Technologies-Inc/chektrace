import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { first, timeout, catchError } from 'rxjs/operators';
import { ProductService, AlertService } from '../../../../core/_services';
import { AuthenticationService } from '../../../../core/_services/authentication.service';
import { UtilityProvider } from '../../../../core/_helpers';
import { of } from 'rxjs';

@Component({
  selector: 'app-new-pin',
  templateUrl: './new-pin.component.html',
  styleUrls: ['./new-pin.component.css']
})
export class NewPinComponent implements OnInit {
  newPinForm: FormGroup;
  submitted = false;
  loading = false;
  batchObjct: any;
  productObjct: any;
  navData: any;
  stage = 1;
  showingSummary = false;

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute, 
    private formBuilder: FormBuilder,
    private productService: ProductService, 
    private utilitiesService: UtilityProvider, 
    private alertService: AlertService, 
    private authenticationService: AuthenticationService
    ) {
    // if (!authenticationService.tokenExist()) {
    //   router.navigate(['pages/auth/login']);
    // }
    this.navData = this.activatedRoute.snapshot.queryParams;
    console.log('product', JSON.parse(this.navData.data));
    this.batchObjct = JSON.parse(this.navData.data).batch;
    this.productObjct = JSON.parse(this.navData.data).product;
  }

  ngOnInit() {
    this.newPinForm = this.formBuilder.group({
      pin_quantity: ['', Validators.required],
      pin_type: ['product', Validators.required],
    });
  }

  productPins() {
    const data = JSON.stringify({
      batch: this.batchObjct,
      product: this.productObjct
    });
    this.router.navigate(['/dashboard/products/'], { queryParams: { data }, skipLocationChange: true });
  }

  generateCode() { }

  get f() { return this.newPinForm.controls; }

  onSubmit() {
    console.log('get here');
    this.submitted = true;
    // stop here if form is invalid
    console.log(this.newPinForm.invalid);
    if (this.newPinForm.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.newPinForm.value);
    const formData = new FormData();
    formData.append('pin_quantity', this.newPinForm.get('pin_quantity').value);
    formData.append('pin_type', this.newPinForm.get('pin_type').value);
    this.productService.generate_pin(this.batchObjct.id, this.newPinForm.value)
      .pipe(first(), timeout(5000000000000000), catchError(e => {
        // do something on a timeout
        console.log("timeout");
        return of({ status: true });
      }))
      .subscribe(
        // tslint:disable-next-line: no-shadowed-variable
        data => {
          console.log('ok>>', data['data']);
          if (data['status']) {
            const data = JSON.stringify({
              batch: this.batchObjct,
              product: this.productObjct
            });
            // this.alertService.showAlertNotification("Success","pin generation successful", "success");
            this.router.navigate(['/dashboard/products/'], { queryParams: { data }, skipLocationChange: true });
            alert("pin generation successful");

            // const slug = this.productObjct?this.productObjct?.slug:'';

            // this.router.navigate(['/dashboard/products/product-batches'], { queryParams: { slug }, skipLocationChange: false });
          }
        },
        error => {
          // this.alertService.error(error);
          this.loading = false;
        });
  }

}
