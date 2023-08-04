import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AlertService, AuthenticationService, ProductService } from 'src/app/core/_services';
import { FooterService } from 'src/app/core/_services/footer.service';
import { NavbarService } from 'src/app/core/_services/navbar.service';
import { environment } from 'src/environments/environment';
import { User } from '../../../../core/_models';
import { ToastService } from 'src/app/core/_services/toast.service';
// import { NgxPrintElementService } from 'ngx-print-element';
import domtoimage from 'dom-to-image';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  @ViewChild('myDiv') myDiv: ElementRef;

  url = environment.apiUrl+'/api/v2/gs1/products/';
  save_productss: any;
  save_products: any;
  isBatchEmpty = true;
  nextStage: number = 1;
  expand:boolean = false;
  currentUser: User;
  currentUserSubscription: Subscription;
  selectedGtinNumber: any;
  selectedProductName: any;
  productBatchName: any;
  productBatchDetails: any;
  showModal: boolean = false;
  showModal2: boolean = false;
  addProductModal: boolean = false;
  loading: boolean = false;
  newProductData: string;
  addedProduct: any;
  productId: any;
  productBatches: any;
  serializeProduct: any;
  productName: any;
  productDescription: any;
  productImage: any;
  packageLevel: any;
  serialNumber: any;
  serailNumberRange: any;
  serialNumberLevel: any;
  subProductId: any;
  qrData: any;
  isViewCode:boolean = false;
  code: any;
  selectedBatchDetails: any;
  productExpiry: any;
  productBatch: any;
  gs1Status: any;

  constructor(
    public navService: NavbarService,
    private router: Router,
    private http: HttpClient,
    public footerService: FooterService,
    private authenticationService: AuthenticationService,
    private productService: ProductService,
    private toastService: ToastService,
    // public print: NgxPrintElementService,
    public alertService: AlertService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('User value', this.currentUser);
    });


    this.navService.show()


    this.getProducts()


  }

  ngOnInit(): void {
  //  localStorage.removeItem("batchProductId")

  }

  convertToImage() {
    html2canvas(this.myDiv.nativeElement).then(canvas => {
      // Convert canvas to image
      const imgData = canvas.toDataURL('image/png');
      // Do something with the image data, such as display it in an img tag
      const img = new Image();
      img.src = imgData;
      document.body.appendChild(img);
    });
  }

  getProducts(){
    this.loading = true;
    this.http.get(this.url).subscribe((res: any)=>{
      console.log(res);
      this.loading = false;
      this.save_productss = res.data

      if(res.statusCode == 200){
      }else{
        console.log(res)
        this.alertService.simpleAlert(res.message);
      }
    },
    (error)=>{
      if(error){
        this.loading = false;
        // this.alertService.simpleAlert(error.message);
      }
    }
    )
  }

  runTraceability(e){

    console.log(e)
    this.selectedGtinNumber = e.gtin;
    localStorage.setItem("gtinCode", this.selectedGtinNumber)
    this.selectedProductName = e.description;
    // this.getProductBatches();

    this.nextStage = 2

  }

  toggleCodeFormat(){
    if(this.code == 'QR'){
      this.code = 'MATRIX'
    }else{
      if(this.code == 'MATRIX'){
        this.code = 'QR'
      }
    }
  }

  switchTo128(){
    this.code  == '128';
    console.log('i am here')
  }

  // printThisPage() {
  //   window.print();
  // }

  getProductBatches(){

    // const productId =   localStorage.getItem("batchProductId");

    this.productService.getAllProductBatches(this.productId).subscribe((res: any)=>{
      console.log(this.productId)
      console.log(res);
      localStorage.setItem('batchProduct', JSON.stringify(res.data.productBatches[0]))

      this.getProductDetails();
      if(res.statusCode == 200){
        this.toastService.show(res.message)
        this.alertService.simpleAlert(res.message);
      }else{
        this.toastService.show(res.message)
        this.alertService.simpleAlert(res.message);
      }

      this.productBatchDetails = res.data.productBatches;
      if(this.productBatchDetails.length ){
       this.isBatchEmpty = false;

      } else{
        this.isBatchEmpty = true;
      }
    },(error)=>{
      this.alertService.simpleAlert(error);
    })
  }


  isProductAdded(e){
    if(e == true){
      const newProductData = localStorage.getItem('newProductData');
      console.log(JSON.parse(newProductData));
      this.addedProduct = JSON.parse(newProductData)
      this.productId = this.addedProduct.data.productId;




      this.createNewBatch()
      this.getProductBatches()

      this.nextStage = 2;
      console.log(this.nextStage)
    }
  }

  nextStep(){
    this.nextStage =this.nextStage + 1;
  }

  prevStep(){
    console.log('go back')
    this.nextStage =this.nextStage - 1;
  }

  toggleAirtime(e){
    console.log(e)
    this.selectedGtinNumber = e.gtin;
    localStorage.setItem("gtinCode", this.selectedGtinNumber)
    this.selectedProductName = e.description;
    this.showModal = !this.showModal;
    // this.showMerchModal = !this.showMerchModal;
  }

  createNewBatch(){
    // this.toggleAirtime();
    this.showModal = false;
    this.addProductModal = !this.addProductModal;
    // this.nextStage = 3;

  }

  ship(e){
    this.router.navigate(['/traceability/select-destination']);
    const productSerialize = this.productBatches.findIndex(item => item.batch_num == e)

    this.serializeProduct = this.productBatches[productSerialize];
    console.log(this.serializeProduct);
    localStorage.setItem('batchProduct', JSON.stringify(this.serializeProduct))
  }

  pack(e){
    this.router.navigate(['/traceability/pack']);
    const productSerialize = this.productBatches.findIndex(item => item.batch_num == e)

    this.serializeProduct = this.productBatches[productSerialize];
    console.log(this.serializeProduct);
    localStorage.setItem('batchProduct', JSON.stringify(this.serializeProduct))
  }


  selectFromExistingProduct(){
    this.nextStage = 3;
  }

  closeModal(){
    this.showModal = !this.showModal
  }

  toProducts(){
    this.nextStage = 1;
  }

  expandBatch(){
    // const batchToOpen = this.productBatches.finIndex(item => item.id == e);

    this.expand = !this.expand;
  }

  runSerialization(){
    this.router.navigate(['traceability/package-level']);
  }

  showSerializationModal(e){
    console.log(e)
    if(e == true){
      this.showModal2 = true;
    }

  }

  ifYes(){
    this.router.navigate(['traceability/package-level']);
  }

  ifNo(){
    this.showModal2 = !this.showModal2;
  }



  openBatch(e){

    // this.loading = true;
    this.productService.get_batch_gtin(e).subscribe((res: any)=>{
      console.log(res)
      this.loading = false;
      this.productName = res.data.product;
      this.productBatches = res.data.batches;
      console.log(this.productBatches)

      if(res.statusCode == 200){
        this.nextStage = 4;
        // this.toastService.show(res.message);
        // this.alertService.simpleAlert(res.message);
      }else{
        // this.toastService.show(res.message);
        this.alertService.simpleAlert('An Error Occured, try Again');
      }
    },(error)=>{
      this.alertService.simpleAlert(error)
    })
  }

  getProductDetails(){
    console.log(this.productId)
    this.productService.getProductDetails(this.productId).subscribe((res: any)=>{
      console.log(res)
      this.productDescription = res.data.product_description;
      this.productImage = res.data.product_image;

      if(res.statusCode == 200){
        this.toastService.show(res.message)
        this.alertService.simpleAlert(res.message);
      }else{
        this.toastService.show(res.message)
        this.alertService.simpleAlert(res.message);
      }
    },(error)=>{
      this.alertService.simpleAlert(error);
    })
  }

  getProductPackageLevel(e){
    this.loading = true;
    this.productService.get_gs1_package_level(e).subscribe((res: any)=>{

      this.loading = false;
      this.nextStage = 6;
      console.log(res)
      this.packageLevel = res.data;
    },(error)=>{
      this.alertService.simpleAlert(error);
    })
  }

  viewBatchDetails(e){
    console.log(e)
    this.nextStage = 5;
    const selectedBatch = this.productBatches.findIndex(item => item.batch_num === e);
    this.selectedBatchDetails = this.productBatches[selectedBatch];
    console.log(this.selectedBatchDetails)
    this.productExpiry = this.selectedBatchDetails.expiry_date;
    this.productBatch = this.selectedBatchDetails.batch_num;


  }

  viewCode(e){

    // console.log(e)
    this.loading = true;

    const codeDetails = this.packageLevel.findIndex(item => item.id === e)
    console.log(codeDetails)

    this.serialNumber = this.packageLevel[codeDetails];
    this.serailNumberRange = this.packageLevel[codeDetails].serial_no_range;
    this.serialNumberLevel = this.serialNumber.level;
    this.subProductId = this.serialNumber.subProductId;

    console.log(this.serialNumber)

    this.productService.get_package_level_serials(this.subProductId, this.serialNumber.id).subscribe((res :any)=>{
      console.log(res)
      this.loading = false;
      if(res.statusCode == 200){
        this.qrData = res.data.rows;
        this.isViewCode = true;
      }else{
        this.toastService.show(res.message)
      }
    },(error)=>{
      this.alertService.simpleAlert(error)
    })


    if(this.serialNumberLevel == 'Primary'){
      this.code = 'MATRIX';
    }else if(this.serialNumberLevel == 'Secondary'){
      this.code = 'MATRIX';
    }else if(this.serialNumberLevel = 'Tertiary'){
      this.code = '128';
    }else if(this.serialNumberLevel = 'Pallet'){
      this.code = '128';
    }
  }

  backToPackage(){
    this.isViewCode = !this.isViewCode;
  }

  bachHome(){
    this.nextStage = 1;
  }

  assignSerialization(e){

    this.router.navigate(['traceability/package-level']);
    const productSerialize = this.productBatches.findIndex(item => item.batch_num == e)

    this.serializeProduct = this.productBatches[productSerialize];
    console.log(this.serializeProduct);
    localStorage.setItem('batchProduct', JSON.stringify(this.serializeProduct))

  }

  gotoCommission(e){
    this.router.navigate(['/traceability/commission'])
  }

}
