import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService, ProductService, SurveyRewardService, SurveyService } from 'src/app/core/_services';
import { FooterService } from 'src/app/core/_services/footer.service';
import { NavbarService } from 'src/app/core/_services/navbar.service';
import { ToastService } from 'src/app/core/_services/toast.service';
import { GooglePlaceDirective } from "node_modules/ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive";
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from 'src/app/core/_models';
const GOOGLE_MAPS_API_KEY = 'AIzaSyBIhKt7YhWM0qAcLZrIAJGmrqnJLs8dT8E';


@Component({
  selector: 'app-product-identification',
  templateUrl: './product-identification.component.html',
  styleUrls: ['./product-identification.component.css']
})
export class ProductIdentificationComponent implements OnInit {

  @ViewChild("placesRef") placesRef : GooglePlaceDirective;
  isProductIdentification: boolean = true;
  isNewBatch: boolean = false;
  isGenerateLabels: boolean = false;
  isLabelInvoice: boolean = false;
  subProductId: any;
  productName: any;
  productDescription: any;
  producerName: any;
  productImage: any;
  ageGroup: any;
  quantity: any;
  labelType: any;
  tagStatus: any;
  address: any;
  region: any;
  country: any;
  customerCountry: any;
  customerAddress: any;
  date: any;
  customerLabelType: any;
  labelQuantity: any;
  labelStatus: any;
  taggantStatus: any;
  addressRegion: any;
  showDetails: boolean = false;
  productBatches: any;
  edit: boolean = false;
  productSlug: any;
  fdaNumber: any;
  productionDate: any;
  expiryDate: any;
  ageRange: any;
  batchNumber: any;
  loading: boolean = false;
  selectedImage:File = null;
  title: string;
  paymentData: any;
  proceedToPay: boolean = false;
  paymentRef: any;
  error: string;
  uploadImageBase64: string;
  Imgloading: boolean = false;
  dateCreated: any;
  showModal: boolean = false;
  surveyId: any = 0;
  rewardId: any = 0;
  isloading: boolean = false;

  formattedaddress=" ";
  options={
    componentRestrictions:{
      country:["NG"]
    }
  }
  selected: any;
  userSurveys: any;
  currentUserSubscription: Subscription;
  currentUser: User;
  availableRewards: any;

  constructor(
    public footerService: FooterService,
    private productService: ProductService,
    public navService: NavbarService,
    private _Activatedroute: ActivatedRoute,
    private surveyService: SurveyRewardService,
    private toastrService: ToastService,
    private survService: SurveyService,
    private authenticationService: AuthenticationService,

  ) {
    // this.getAllSurvey();
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('User value', this.currentUser);
    });
    this._Activatedroute.paramMap.subscribe(params => {
      this.subProductId = params.get('id');

      console.log(this.subProductId)

    });
    this.navService.show()
   }

  ngOnInit(): void {
    this.footerService.show();
    this.getProductDetails();
    this.getProductBatches();
    this.getAllSurvey();
    this.getRewards();
  }

  public AddressChange(address: any) {
    //setting address from API to local variable
     this.formattedaddress=address.formatted_address;
     console.log(this.formattedaddress)
  }



  getProductDetails(){
    this.productService.getProductDetails(this.subProductId).subscribe((res: any)=>{
      console.log(res);
      this.productName = res.data.product_name;
      this.producerName = res.data.producer_name;
      this.productDescription = res.data.product_description;
      this.productImage = res.data.product_image;
      this.ageGroup = res.data.age_range;
      this.productSlug = res.data.slug;
      this.fdaNumber = res.data.fda_number;
      this.productionDate = res.data.production_date;
      this.expiryDate = res.data.expiry_date;
      this.ageRange = res.data.age_range;
      this.batchNumber = res.data.batch_num;
      this.dateCreated = res.data.created_at;
    })
  }

  updateProduct(){
    this.loading = true;
    const body = {
      product_name: this.productName,
      producer_name: this.producerName,
      product_description: this.productDescription,
      // product_image: this.selectedImage,
      batch_num: this.batchNumber,
      FDA_number: this.fdaNumber,
      expiry_date: this.expiryDate,
      production_date: this.productionDate,
      age_range: this.ageRange,
    }
    this.productService.update_product(this.productSlug, body).subscribe((res: any)=>{
      console.log(res);
      this.loading = false;
      if(res.statusCode === 200){
        this.edit = !this.edit;
      }
    })
  }

  getProductBatches(){
    this.productService.getAllProductBatches(this.subProductId).subscribe((res: any)=>{
      console.log(res);
      this.productBatches = res.data.productBatches;
    })
  }

  getRewards(){
    this.survService.getSurveyRewards(this.currentUser.id).subscribe((res: any)=>{
      console.log(res)
      this.availableRewards = res.data.rewards;
    })
  }

  updateBatch(e){
    const selectedBatch = this.productBatches.findIndex(item => item.id == e);
    this.selected = this.productBatches[selectedBatch];
    console.log(this.selected)

    this.showModal = true;
  }

  selectSurvey(e){
    this.surveyId = e;
  }

  selectReward(e){
    this.rewardId = e;
  }



  proceed(){

    this.isloading = true;
    const body = {
      "productId": this.selected.productId,
      "product_name": this.selected.product_name,
      // "producer_name": "string",
      "batch_num": this.selected.batch_num,
      "production_date": this.selected.production_date,
      // "FDA_number": "string",
      "expiry_date": this.selected.expiry_date,
      "code_format": this.selected.code_format,
      "survey_id": parseInt(this.surveyId),
      "reward_id": parseInt(this.rewardId),
      "user_id": this.selected.userId
    }
    console.log(body)
    this.productService.update_subProduct(this.selected.batch_num, body).subscribe((res: any)=>{
      this.isloading = false;
      console.log(res);
      if(res.statusCode == 200){
        this.showModal = false;
        window.location.reload()
      }
      // this.router.navigate(['/mas/products'])
    },(error)=>{
      this.loading = false;
      console.log(error)
    })
  }

  getAllSurvey(){
    this.survService.getAllUserSurveys(this.currentUser.id).subscribe((res: any)=>{
      console.log(res)
      this.loading = false;
      this.userSurveys = res.data.surveys;
    })
  }



  handleImageUpload(fileToUpload) {
    // check for image to upload
    // this checks if the user has uploaded any file
    if (fileToUpload.target.files && fileToUpload.target.files[0]) {
      // calculate your image sizes allowed for upload
      const max_size = 20971510;
      // the only MIME types allowed
      const allowed_types = ['image/png', 'image/jpeg','image/jpg'];
      // max image height allowed
      const max_height = 14200;
      //max image width allowed
      const max_width = 15600;

      // check the file uploaded by the user
      if (fileToUpload.target.files[0].size > max_size) {
        //show error
        this.error = 'max image size allowed is ' + max_size / 1000 + 'Mb';
        //show an error alert using the Toastr service.
        this.toastrService.show(this.error,'Error');
        return false;
      }

      // define a file reader constant
      const reader = new FileReader();
      // read the file on load
      reader.onload = (e: any) => {
        // create an instance of the Image()
        const image = new Image();
        // get the image source
        image.src = e.target.result;
        // @ts-ignore
        image.onload = rs => {
          // get the image height read
          const img_height = rs.currentTarget['height'];
          // get the image width read
          const img_width = rs.currentTarget['width'];
          // check if the dimensions meet the required height and width
          if (img_height > max_height && img_width > max_width) {
            // throw error due to unmatched dimensions
            this.error =
              'Maximum dimensions allowed: ' +
              max_height +
              '*' +
              max_width +
              'px';
            return false;
          } else {
            // otherise get the base64 image
            this.uploadImageBase64 = e.target.result;
           setTimeout(()=>{
             this.updateImage()
           }, 1000)
          }
        };
      };
      // reader as data url
      reader.readAsDataURL(fileToUpload.target.files[0]);
    }
  }

  updateImage(){
  this.Imgloading = true;
    const body = {
      product_name: this.productName,
      producer_name: this.producerName,
      product_description: this.productDescription,
      product_image: this.productImage,
      batch_num: this.batchNumber,
      FDA_number: this.fdaNumber,
      expiry_date: this.expiryDate,
      production_date: this.productionDate,
      age_range: this.ageGroup,
      photo: this.uploadImageBase64
    }
    console.log(body.photo)
    this.productService.update_product(this.productSlug, body).subscribe((res: any)=>{
      this.Imgloading = false;
      console.log(res)
      if(res.statusCode == 200){
        this.getProductDetails()
      }
    },(error)=>{
      this.Imgloading = false;
      alert(error);
    })
  }





  resetPage(){
    this.isProductIdentification = true;
    this.isGenerateLabels = false;
    this.isNewBatch = false;
    this.isLabelInvoice = false;
  }

  createBatch(){
    this.isProductIdentification = false;
    this.isGenerateLabels = false;
    this.isNewBatch = true;
  }

  generateLabels(){
    this.isProductIdentification = false;
    this.isGenerateLabels = true;
    this.isNewBatch = false;
  }

  generateInvoice(){
    this.isProductIdentification = false;
    this.isGenerateLabels = false;
    this.isNewBatch = false;
    this.isLabelInvoice = true;
  }

  requestLabels(){
    const body = {
      "produnctId": parseInt(this.subProductId),
      "quantity": parseInt(this.quantity),
      "labelType": this.labelType,
      "withTaggant": this.tagStatus,
      "address": this.address,
      "region": this.region,
      "country": this.country
    }
    console.log(body)
    this.productService.requestLabels(body).subscribe((res: any)=>{
      console.log(res);
      if(res.message === "OK"){
        this.customerAddress = res.data.address;
        this.customerCountry = res.data.country;
        this.date = res.data.created_at;
        this.customerLabelType = res.data.labelType;
        this.labelQuantity = res.data.quantity;
        this.labelStatus = res.data.status;
        this.taggantStatus = res.data.withTaggant;
        this.addressRegion = res.data.region;
        this.generateInvoice();
      }
    })
  }

  selectLabelType(e){
    console.log(e.target.value);
    this.labelType = e.target.value;
  }

  selectTagOpt(e){
    this.tagStatus = e.target.value;
    console.log(this.tagStatus)
  }

  paymentInit() {
    console.log('Payment initialized');
  }

  paymentDone(ref: any) {
    this.title = 'Payment successfull';
    console.log(this.title, ref);

    if(ref.status == 'success'){
      // this.resPaymentRef = ref.reference;
      this.verifyPayment();
      this.loading = false;
      // this.fetchSurvey();

    }
  }
  verifyPayment(){
    const body = {
      "reference": this.paymentRef,
      "amount": this.labelQuantity * 200
    }
    console.log(body)
    this.surveyService.verifyPayment(body).subscribe((res: any)=>{
      console.log(res);

      // this.router.navigate(['MAS/add-survey/'], { queryParams: { id: this.campaignId } });
      // this.currentStage = 6;
      this.resetPage();

    })
  }

  paymentCancel() {
    console.log('payment failed');
  }

  initPayment(){
    this.loading = true;
    let amount = this.labelQuantity  *  200;
    const body = {
      "amount": amount
    }
    this.surveyService.initPayment(body).subscribe((res: any)=>{
      console.log(res)
      this.paymentData = res.data;

      if(res.statusCode == 200){

        this.proceedToPay = true;
        this.paymentRef = this.paymentData.reference;



      }
    })
  }



}
