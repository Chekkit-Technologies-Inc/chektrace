import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService, ProductService } from 'src/app/core/_services';
import { NavbarService } from 'src/app/core/_services/navbar.service';
import { ToastService } from 'src/app/core/_services/toast.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-packaging-level',
  templateUrl: './packaging-level.component.html',
  styleUrls: ['./packaging-level.component.css']
})
export class PackagingLevelComponent implements OnInit {
  productDetails: any;
  batchNum: any = '';
  productId: any;
  subProductId: any;
  primary_quantity: any;
  tertiary_quantity: any;
  secondary_quantity: any;
  primary_value: number = 0;
  secondary_value: number = 0;
  carton_value: number = 0;
  tertiary_value: number = 0;
  nextStep: number = 2;
  locations: any;
  locationGln: any;
  locationAddress: any;
  locationLat: any;
  locationLong: any;
  subProductId2: any;
  productId2: any;
  batchNum2: any;
  packageLevel: any;
  packageSerials: any;
  serialNumber: any;
  serial_range: any;
  showModal: boolean = false;
  serialRange: any =[];
  productName: any;
  loading: boolean = false;
  isChecking: boolean = false;
  serialRange1: any;
  serialRange2: any;
  qrData: any;
  gtin: any;
  productExpiry: any;
  productionDate: any;
  serailNumberRange: any;
  commissionAll: boolean = false;
  serialNumberLevel: any;
  surveyStatus: any;
  productDescription: any;
  productImage: any;
  gtinNumber: any;
  selectSatchet: boolean = false;
  selectPack: boolean = false;
  selectPallet: boolean = false;
  primary_unit?: number = 0;
  secondary_unit?: number = 0;
  carton_unit: number = 0;
  tertiary_unit?: number = 0;
  primaryPackageId?: any;
  secondaryPackageId: null;
  tertiaryPackageLevelId?: any;
  cartonPack: boolean;
  code = 'MATRIX';
  comissionedLevel = '';
  packageGenerated: [];
  selectedLevel: any;
  isSelected: boolean = false;
  showComissionSuccess: boolean = false;
  satchetChecked: boolean = false;
  packChecked: boolean = false;
  cartonChecked: boolean = false;
  palletChecked : boolean = false;
  packageLevelField: any = [];
  updateModal: boolean = false;
  selectedPackageLevel: any;
  surveyForm: FormGroup;
  levelId: any;
  packageLevelQuantity: any;
  selectedTab: string;
  commissionedData: any;
  qrTotalCount: any;
  serialDetails: any;
  commissioned: any;
  serialNumberLevelType: any;
  palletLevelId?: any;
  pallet_unit?: any;

  constructor(
    private router: Router,
    private productService: ProductService,
    public navService: NavbarService,
    private toastService: ToastService,
    private alertService: AlertService
  ) {

    this.navService.show();
    this.addField()

  }

  ngOnInit(): void {
    this.selectedTab = 'generated-stickers'
    this.getGs1Location();
    const productBatch = localStorage.getItem('batchProduct');
    console.log(JSON.parse(productBatch));
    this.productDetails = JSON.parse(productBatch);
    this.subProductId = this.productDetails.id;
    this.productId = this.productDetails.productId;
    this.batchNum = this.productDetails.batch_num;
    this.productName = this.productDetails.product_name;
    this.productExpiry = this.productDetails.expiry_date;
    this.productionDate = this.productDetails.production_date;

    this.getPackageLevels();
  }

  save(){
    this.router.navigate(['/traceability/package-hierarchy'])
  }

  backHome(){
    this.router.navigate(['/traceability/products'])
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

  getGs1Location(){
    this.productService.get_gs1_locations().subscribe((res: any)=>{
      this.locations = res.data;
      console.log(res)

      if(res.statusCode == 200){
        this.toastService.show(res.message)
      }else{
        this.toastService.show(res.message)
      }

    })
  }

  openModal(e){
    this.levelId = e
    this.updateModal = !this.updateModal;
  }

  printThisPage() {
    window.print();
  }

  checkStatus(e : any){
    if(e = 'true'){
      this.nextStep = 3
    }
  }
  selectLocation(e){
    // console.log(e)

    const location = this.locations.findIndex(item => item.gln == e);
    this.gtin = e;
    this.locationGln = this.locations[location].gln;
    this.locationAddress = this.locations[location].address;
    this.locationLat = this.locations[location].latitude;
    this.locationLong = this.locations[location].longitude;

    localStorage.setItem(this.locationGln, 'locationGln');
    localStorage.setItem(this.locationLat, 'locationLat');
    localStorage.setItem(this.locationLong, 'locationLong');
  }

  selectLevel(e){
    // console.log(e)
    const selectedLevel = this.packageLevel.findIndex( item => item.level == e );
    this.selectedLevel = this.packageLevel[selectedLevel].level;
    this.isSelected = true;

    console.log(this.selectedLevel);
  }

  selectPackageLevel(e){
    console.log(e);
    this.selectedPackageLevel = e;
  }

  addField(){
    this.packageLevelField.push({level:"", type: ""})
  }

  createPackageLevel(){
    this.loading = true;

    const body = {
      "packageLevel":
        this.packageLevelField
      ,
      "productId": parseInt(this.productId),
      "subProductId": this.subProductId,
      "gln": this.locationGln,
      "latitude": this.locationLat,
      "longitude": this.locationLong
    }

    console.log(body)
    this.productService.create_package_level(body).subscribe((res: any)=>{
      this.loading = false;
      console.log(res)
      if(res.statusCode == 200){
        this.getPackageLevels();
        // this.toastService.show(res.message);
        this.nextStep = 3;
      }else{
        // this.toastService.show(res.message)
      }



    }, (error)=>{
      this.loading = false;
      console.log(error)
      this.alertService.simpleAlert(error)
    })


  }

  increasePrimaryCounter(){
    this.primary_value ++;

    if(this.primary_value >= 1){
      this.secondary_value = 1;
    }
  }

  decreaasePrimaryCounter(){
    this.primary_value --;


    if(this.primary_value < 1){
      this.secondary_value = 0;
    }
  }

  increaseSecondaryCounter(){
    this.secondary_value ++;

    if(this.secondary_value > 1){
      this.tertiary_value = 1;
    }
  }

  decreaseSecondaryCounter(){
    this.secondary_value --;

    if(this.secondary_value < 2){
      this.tertiary_value = 0;
    }
  }

  decreaseCartonCounter(){
    this.carton_value --;
  }

  increaseCartonCounter(){
    this.carton_value ++;
  }

  increaseTertiaryCounter(){
    this.tertiary_value ++;
  }

  decreaseTertiaryCounter(){
    this.tertiary_value --;
  }

  decreaseSatchetCounter(){
    this.primary_unit --;
  }

  increaseSatchetCounter(){
    this.primary_unit ++
  }

  decreasePackCounter(){
    this.secondary_unit --;
  }

  increasePackCounter(){
    this.secondary_unit ++;
  }

  decreaseCartonUnit(){
    this.carton_unit --;
  }

  increaseCartonUnit(){
    this.carton_unit ++;
  }

  decreasePalletCounter(){
    this.tertiary_unit --;
  }

  increasePalletCounter(){
    this.tertiary_unit ++;
  }

  goNext(){
    this.nextStep ++;
  }

  proceedToShipping(e){
    this.surveyStatus = e;

    if(this.surveyStatus == true){
      this.router.navigate(['traceability/select-destination']);
    }
  }

  goBack(){
    this.nextStep --;
  }

  getPackageLevels(){
    this.loading = true;
    // console.log(this.loading)
    this.productService.get_gs1_package_level(this.subProductId).subscribe((res: any)=>{
      console.log(res)
      this.loading = false;
      if(res.statusCode == 200){
        console.log(this.loading)
        if(res.data.length > 0){
          this.packageLevel = res.data;
          const primaryPack = this.packageLevel.findIndex(item => item.level === 'Primary');
          const secondaryPack = this.packageLevel.findIndex(item => item.level === 'Secondary' );
          const tertiaryPack = this.packageLevel.findIndex(item => item.level === 'Tertiary' );
          const pallet = this.packageLevel.findIndex(item => item.level === 'Pallet' )
          this.primaryPackageId = this.packageLevel[primaryPack]?.id;
          this.primary_unit = this.packageLevel[primaryPack]?.quantity;
          this.secondaryPackageId = this.packageLevel[secondaryPack]?.id;
          this.secondary_unit = this.packageLevel[secondaryPack]?.quantity;
          this.tertiaryPackageLevelId = this.packageLevel[tertiaryPack]?.id;
          this.tertiary_unit = this.packageLevel[tertiaryPack]?.quantity;
          this.palletLevelId = this.packageLevel[pallet]?.id;
          this.pallet_unit = this.packageLevel[pallet]?.id;
          this.nextStep = 3;
        }else{
          this.nextStep = 2;
        }
      }else{
        this.loading = false;
        // this.toastService.show(res.message);
        this.alertService.simpleAlert(res.message)
      }
    },(error)=>{
      this.loading = false;
      this.alertService.simpleAlert(error)
    })
  }


  viewCode(e){
    console.log(e.level)
    this.loading = true;

    const codeDetails = this.packageLevel.findIndex(item => item.id == e)
    console.log(codeDetails)

    this.serialNumber = this.packageLevel[codeDetails];
    this.serailNumberRange = this.packageLevel[codeDetails].serial_no_range;
    this.serialNumberLevel = this.serialNumber.level;
    this.serialNumberLevelType = this.serialNumber.type;

    console.log(this.serialNumber)

    this.productService.get_package_level_serials(this.subProductId, this.serialNumber.id).subscribe((res :any)=>{
      console.log(res)
      this.loading = false;
      if(res.statusCode == 200){
        this.serialDetails = res.data;
        this.commissionedData = res.data.commissionedCount;
        this.qrTotalCount = res.data.totalCount;
        this.qrData = res.data.rows;
        this.commissioned = this.qrData.filter(sticker => sticker.commissioned === true)
        console.log(this.commissioned)
        this.nextStep = 7;
        // this.toastService.show(res.message)
      }else{
        // this.toastService.show(res.message);
        this.alertService.simpleAlert(res.message)
      }
    },(error)=>{
      this.loading = false;
      console.log(error)
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

  comissionAll(){
    this.commissionAll = !this.commissionAll;
  }
  copySerial(serial: any) {
    navigator.clipboard.writeText(serial).then().catch(e => console.log(e));
  }

  fetchSerials(){
    // this.productService.get_package_level_serials()
  }


  comissionProduct(){
    this.loading = true;
    const body = {
      "elementStrings": this.serialRange,
      "subProductId": this.subProductId,
      "gln": this.locationGln,
      "latitude": this.locationLat,
      "longitude": this.locationLong
    }
    console.log(body)
    this.productService.comission_product(body).subscribe((res: any)=>{
      this.loading = false;
      console.log(res)



      if(res.statusCode == 200){
        // this.toastService.show(res.message)
       this.getProductDetails();

        this.nextStep = 6;
        this.serialRange = [];

      }else{
        // this.toastService.show(res.message)
        this.alertService.simpleAlert("An error ocuured")
      }
    }, (error)=>{
      this.loading = false;
      console.log(error);
      this.alertService.simpleAlert(error)
    })

  }

  comissionOther(){
    this.nextStep = 5;
    this.isSelected = false;
    this.serialRange = [];
  }



  addMore(){

    const numberRange = this.serial_range
    this.serialRange.push(numberRange);

    this.serial_range = '';

  }

  removeCode(e){
    const item = this.serialRange.findIndex(item => item.serial === e );
    // console.log(item)
    this.serialRange.splice(item, 1)
  }

  toComission(){
    this.nextStep = 5
  }

  prevStep(){
    this.nextStep --;
  }
  toggleModal(){

    this.showModal = !this.showModal;
  }

  backToLevel(){
    this.nextStep = 4;
  }

  closeModal(){
    this.showModal = !this.showModal
  }

  packingSummary(){
    this.nextStep = 8;
  }

  attachSurvey(){
    this.nextStep = 9;
  }


  gotoShipping(){
    this.router.navigate(['traceability/select-destination']);
  }

  getProductDetails(){
    console.log(this.productId)
    this.productService.getProductDetails(this.productId).subscribe((res: any)=>{
      console.log(res)


      if(res.statusCode == 200){
        this.toastService.show(res.message);
        this.productDescription = res.data.product_description;
        this.productImage = res.data.product_image;
        this.gtinNumber = res.data.gtin;
      }else{
        // this.toastService.show(res.message)
        this.alertService.simpleAlert(res.message)
      }
    },(error)=>{
      this.alertService.simpleAlert(error)
    })
  }

  selectSachet(){
    this.selectSatchet = !this.selectSatchet;
    this.satchetChecked = !this.satchetChecked;
  }

  choosePack(){
    this.selectPack =  !this.selectPack;
    this.packChecked = !this.packChecked;
  }

  chooseCarton(){
    this.cartonPack = !this.cartonPack;
    this.cartonChecked = !this.cartonChecked;
  }

  choosePallet(){
    this.selectPallet = !this.selectPallet;
    this.palletChecked = !this.palletChecked;
  }


  proceedToQuantity(){
    this.nextStep = 1;
  }

  updatePackageLevel(){
    this.loading = true;

    const body = {
      "packageLevel": [
        {
          "id": parseInt(this.levelId),
          "unit": this.packageLevelQuantity
        },
      ]
    }

    this.productService.updatePackageLevel(body, this.subProductId).subscribe((res: any)=>{
      console.log(res)
      this.loading = false;
      if(res.statusCode == 200){
        this.toggleModal();
      }else{
        this.alertService.simpleAlert(res.message)
      }
    },(error)=>{
      this.alertService.simpleAlert(error)
    })
  }

  serialize(){
    this.loading = true;

    const body = {
      "subProductId": this.subProductId,
      "quantity": this.packageLevelQuantity,
      "packageLevelId": this.levelId
    }

    this.productService.serializeProduct(body).subscribe((res: any)=>{
      console.log(res)
      this.loading = false;
      if(res.statusCode == 200){
        this.getPackageLevels();
        this.updateModal = !this.updateModal;
        this.packageLevelQuantity = '';
        this.alertService.simpleAlert(res.message)

      }else{
        this.alertService.simpleAlert(res.message)
      }
    },(error)=>{
      this.loading = false;
      this.alertService.simpleAlert(error)
    })
  }

  bactToStatus(){
    this.nextStep = 3;
    this.getPackageLevels();
  }



  confirmReload(){
    return "Are you sure to leave ???"
  }


}
