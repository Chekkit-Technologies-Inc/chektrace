import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ProductService } from 'src/app/core/_services';


@Component({
  selector: 'app-add-product-info',
  templateUrl: './add-product-info.component.html',
  styleUrls: ['./add-product-info.component.css']
})

export class AddProductInfoComponent implements OnInit {

  @Output() attachSurvey:EventEmitter<boolean> = new EventEmitter();
  @Output() productResponse:EventEmitter<any> = new EventEmitter();
  nextStep: boolean = false;
  producer_name: any;
  product_name: any;
  product_description: any;
  lastImage: string | ArrayBuffer;
  createProductForm: FormGroup;
  data: any;
  success_msg: any;
  loading: boolean = false;
  gtinNumber: any;
  CodeFormat: any;
  imageSrc: string;
  formStep = 'form1';
  imageSelected: boolean = false;
  // nextStep = 'false';
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
  ) { }

  ngOnInit() {

    this.gtinNumber = localStorage.getItem("gtinCode");

    this.createProductForm = this.formBuilder.group({
      product_name: ['', Validators.required],
      producer_name: ['', Validators.required],
      product_description: [''],
      batch_num: [''],
      FDA_number: [''],
      expiry_date: [''],
      product_category: ['', Validators.required],
      // barcode_num: [''],
      production_date: [''],
      age_range: [''],
      photo: ['',],
    });

    this.createProductForm.valueChanges.subscribe()
  }




  onSubmit() {
    console.log('get here');
    this.loading = true;
    // this.submitted = true;
    // stop here if form is invalid
    console.log(this.createProductForm.valid);
    const formData = new FormData();
    formData.append('photo', this.createProductForm.get('photo').value);
    formData.append('product_description', this.createProductForm.get('product_description').value);
    formData.append('product_name', this.createProductForm.get('product_name').value);
    formData.append('producer_name', this.createProductForm.get('producer_name').value);
    // formData.append('batch_num', this.createProductForm.get('batch_num').value);
    formData.append('FDA_number', this.createProductForm.get('FDA_number').value);
    formData.append('batch_num', this.createProductForm.get('batch_num').value);
    formData.append('CodeFormat', this.CodeFormat);
    formData.append('gtin', this.gtinNumber);
    formData.append('age_range', this.createProductForm.get('age_range').value);
    formData.append('expiry_date', this.createProductForm.get('expiry_date').value);
    formData.append('production_date', this.createProductForm.get('production_date').value);
    formData.append('product_category', this.createProductForm.get('product_category').value);
    console.log(this.gtinNumber)
    console.log(this.createProductForm.value);
    this.productService.create_product(formData)
      .pipe(first())
      .subscribe(
        data => {
          console.log('ok>>', data);
          const newProductData = JSON.stringify(data);
          localStorage.setItem('newProductData', newProductData)
          this.loading = false;
          if (data["statusCode"] == 200 ) {
            this.data = data['data'];
            this.nextStep = data['status'];
            console.log(this.nextStep)
            localStorage.setItem("batchProductId", this.data.productId)


            this.attachSurvey.emit(this.nextStep);
            this.productResponse.emit(this.data);

            // localStorage.setItem('masAttachSurvey', this.nextStep)
            // this.showNextStep();
          }
          else {
            this.success_msg = data['message'];
            console.log(this.success_msg)

          }
          console.log(data)

        },
        error => {
          // this.alertService.error(error);
          this.loading = false;
          console.log(error);
        });
  }

  selectCode(e){
    console.log(e)
    this.CodeFormat = e;
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.createProductForm.get('photo').setValue(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
          this.lastImage = reader.result;
          console.log(reader.result);
          this.imageSelected = true;
      }
    }
  }

  get f() {
    return this.createProductForm.controls;
  }

  nextForm(){
    this.formStep = 'form2';

    console.log(this.formStep)
  }


}
