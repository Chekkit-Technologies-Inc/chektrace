import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService, AuthenticationService } from '../../../../core/_services';
import { User } from '../../../../core/_models/user';
import { UtilityProvider } from '../../../../core/_helpers/utility';
import { ExportToCsv } from 'export-to-csv';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-view-batch',
  templateUrl: './view-batch.component.html',
  styleUrls: ['./view-batch.component.css']
})
export class ViewBatchComponent implements OnInit {

  batchObject: any;
  productObject: any;
  navData: any;
  currentUserSubscription: Subscription;
  currentUser: User;


  product_pin: any;
  loading = true;
  prevPin: any;
  nextPin: any;
  hasNext: boolean = false;
  hasPrevious: boolean = false;
  per_page: number = 1250;
  pins: any;
  totalPins: number = 0;
  cursors: any;
  name = 'Angular 6';
  showCustomExport = false;
  perBox = 1250;


  // @ViewChild('screen', {static:true}) screen: ElementRef;
  // @ViewChild('canvas', {static:true}) canvas: ElementRef;
  // @ViewChild('downloadLink', {static:true}) downloadLink: ElementRef;

  allPins: any;
  quantity: any;
  lastScanEndIndex = 0;
  success_msg: any;
  lastExportIndex: any;
  processing: boolean;
  slug: any;
  downloadTracking: any;
  downloading: boolean;

  constructor(
    private productService: ProductService,
    public utility: UtilityProvider,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private router: Router
    ) {
    this.navData = this.activatedRoute.snapshot.queryParams;
    console.log('product', (this.navData));

    this.productService.productDetails$.subscribe(
      (details) => {
        this.productObject = details;
        console.log(details)
      }
    );

    this.productService.batchDetails$.subscribe(
      (details) => {
        this.batchObject = details;
        console.log(details)
      }
    );

    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('User value', this.currentUser);
    });

    this.getProductPins();
    this.getLastExportHistory();
  }
  ngOnInit(): void {
  }

  getShelfLife(prod_date: any, exp_date) {
    const diff = (new Date(exp_date)).valueOf() - (new Date(prod_date)).valueOf();
    console.log('result date ', Math.ceil(diff / (1000 * 3600 * 24)));
    return Math.ceil(diff / (1000 * 3600 * 24));
  }

  gotoBatchPins() {
    this.productService.updateBatchDetails(this.batchObject);
    this.productService.updateProductDetails(this.productObject);
    const slug = this.productObject?this.productObject.product?.slug:'';

    this.router.navigate(['/dashboard/products/product-pins'], { queryParams: { slug } });
  }

  gotoCreateBatch() {
    let q = JSON.stringify(this.batchObject.id);
    this.router.navigate(['/dashboard/products/create-batch'], { queryParams: { q }});
  }



  getProduct() {
    this.productService.getProduct(this.slug).pipe(first()).subscribe(data => {
      console.log("result of survey", data['data']);
      if (data['data']) {
        console.log('okay ooo', data['data']);
        this.productObject = data['data'];
      }
    });
  }

  async getProductPins() {
    await this.productService.getProductPins(this.batchObject.id, this.per_page,
      this.prevPin, this.nextPin).pipe(first()).subscribe(async data => {
        console.log('product-pin', data['data']);
        if (data['status']) {
          this.product_pin = await data['data'];
          this.pins = this.product_pin.pins;
          this.totalPins = this.product_pin.totalPins;
          this.loading = false;
          this.cursors = this.product_pin.cursors;
          this.nextPin = this.cursors.after;
          this.prevPin = this.cursors.before;
          this.hasNext = this.cursors.hasNext;
          this.hasPrevious = this.cursors.hasPrevious;
          window.scrollTo(0, 0)
          // await this.showToast(this.status, this.title, this.content);
        } else {
          this.loading = false;
          // await this.showToast(this.status, 'OH, sorry', 'Pls, try to refresh!');
        }
      });
  }
  async getLastExportHistory() {
    await this.productService.getLastExportHistory(this.batchObject.id).pipe(first()).subscribe(async data => {
        console.log('product-pin', data['data']);
        if (data['status']) {
          this.lastExportIndex =  data['data'].endIndex?data['data'].endIndex:0;
        } else {
          this.loading = false;
        }
      });
  }

  async getAllProductPins() {
    await this.productService.getAllProductPins(this.batchObject.id).pipe(first()).subscribe(async data => {
        console.log('product-pin', data['data']);
        if (data['status']) {
          this.product_pin = await data['data'];
          this.allPins = this.product_pin.pins;
          // await this.showToast(this.status, this.title, this.content);
        } else {
          this.loading = false;
          // await this.showToast(this.status, 'OH, sorry', 'Pls, try to refresh!');
        }
      });
  }

  async trackPinExport() {
    await this.productService.trackPinExport(this.batchObject.id).pipe(first()).subscribe(async data => {
      this.downloading = false;
      if (data['status']) {
          this.downloadTracking = data['data'];
          this.downloadTracking.downloadUrls = JSON.parse(this.downloadTracking.downloadUrls);
          console.log(this.downloadTracking)
          // this.product_pin = await data['data'];
          // this.allPins = this.product_pin.pins;
          // await this.showToast(this.status, this.title, this.content);
        } else {
          this.downloading = false;
          // await this.showToast(this.status, 'OH, sorry', 'Pls, try to refresh!');
        }
      });
  }

  async downloadPins() {
    this.downloading = true;

    await this.productService.exportProductPins(this.batchObject.id).pipe(first()).subscribe(async data => {
        console.log('product-pin', data['data']);
        if (data['status']) {
          console.log(data)
          this.trackPinExport();
          // this.product_pin = await data['data'];
          // this.allPins = this.product_pin.pins;
          // await this.showToast(this.status, this.title, this.content);
        } else {
          this.downloading = false;
          // await this.showToast(this.status, 'OH, sorry', 'Pls, try to refresh!');
        }
      });
  }
  getNextPin(): void {
    this.prevPin = '';
    console.log(this.nextPin)
    this.getProductPins();
  }
  getPrevPin(): void {
    this.nextPin = '';
    this.getProductPins();
  }
  generatePin() {
    const data = JSON.stringify({
      batch: this.batchObject,
      product: this.productObject,
    });
    this.router.navigate(['/dashboard/new-pin'], { queryParams: { data }, skipLocationChange: true });
  }

  generateExcel(action = 'open') {
    var mappedPins = this.pins.map((p,index) => ({ serial: '1000' + p.id, pin: p.pin_value,box_no: this.returnBoxNumber(index, this.pins) }));

    console.log(mappedPins);
    // return false;

    var d = new Date();
    var n = d.getTime();
    let newFileName = 'chekkit-pin-sheet-' + n;

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Chekkit Generated pin CSV',
      useTextFile: false,
      useBom: true,
      filename: newFileName,
      useKeysAsHeaders: false,
      headers: ['Serial Number', 'Pin', 'Box']
    };



      const csvExporter = new ExportToCsv(options);

      csvExporter.generateCsv(mappedPins);
  }

  returnBoxNumber(index, arr){
    let g = index + 1;
    let array_total = arr.length;

    let f = array_total/(array_total - g);

    // return Math.round(f);

    return (Math.ceil(g/this.perBox)*this.perBox)/this.perBox

  }


  printDiv() {
    var divToPrint = document.getElementById('print-index-invoice');
    var newWin = window.open('_blank', 'Print-Window');
    newWin.document.open();
    newWin.document.write('<html><link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" media="print"/><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');
    newWin.document.close();
    setTimeout(function() {
      newWin.close();
    }, 10);
  }

  printComponent(cmpName) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}

  generateAllExcel(action = 'open') {
    var mappedPins = this.allPins.map(p => ({ serial: '1000' + p.id, pin: p.pin_value }));

    console.log(mappedPins);

    var d = new Date();
    var n = d.getTime();
    let newFileName = 'chekkit-pin-sheet-' + n;

    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Chekkit Generated pin CSV',
      useTextFile: false,
      useBom: true,
      filename: newFileName,
      useKeysAsHeaders: false,
      headers: ['Serial Number', 'Pin']
    };



      const csvExporter = new ExportToCsv(options);

      csvExporter.generateCsv(mappedPins);
  }


  // generatePng(){
  //   html2canvas(this.screen.nativeElement).then(canvas => {
  //     this.canvas.nativeElement.src = canvas.toDataURL();
  //     this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
  //     this.downloadLink.nativeElement.download = 'marble-diagram.png';
  //     this.downloadLink.nativeElement.click();
  //   });
  // }

  // generatePdf(){
  //   html2canvas(this.screen.nativeElement).then(canvas => {
  //     this.canvas.nativeElement.src = canvas.toDataURL();
  //     var imgData = canvas.toDataURL('image/jpeg', 1.0);
  //     // this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
  //     this.downloadLink.nativeElement.download = 'marble-diagram.png';
  //     var pdf = new jsPDF();

  //     pdf.addImage(imgData, 'JPEG', 0, 0);
  //     pdf.save("download.pdf");

  //     // this.downloadLink.nativeElement.click();
  //   });
  // }

  async getPinAndExport(q) {
    let prevPin = parseInt(this.lastExportIndex);
    let nextPin = parseInt(this.lastExportIndex) + parseInt(this.quantity);

    this.cursors = this.product_pin.cursors;
    nextPin = this.cursors.after;
    prevPin = this.cursors.before;

    console.log(prevPin)
    this.processing = true;
    await this.productService.getProductPinsExport(this.batchObject.id, q,
      JSON.stringify(prevPin), JSON.stringify(nextPin)).pipe(first()).subscribe(async data => {
        console.log('product-pin', data['data']);
        if (data['status']) {
          var mappedPins = data['data'].pins.map(p => ({ serial: '10000000' + p.id, pin: p.pin_value }));

          console.log(mappedPins);


          var d = new Date();
          var n = d.getTime();
          let newFileName = 'chekkit-pin-sheet_' + prevPin + '-' + nextPin + '_'+ n;

          const options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: true,
            title: 'Chekkit Generated pin CSV',
            useTextFile: false,
            useBom: true,
            filename: newFileName,
            useKeysAsHeaders: false,
            headers: ['Serial Number', 'Pin']
          };



            const csvExporter = new ExportToCsv(options);

            csvExporter.generateCsv(mappedPins);


          this.processing = false;

          this.updatePinExportHistory();
          // await this.showToast(this.status, this.title, this.content);
        } else {
          this.processing = false;
          // await this.showToast(this.status, 'OH, sorry', 'could not get pins!');
        }
      });

  }

  updatePinExportHistory() {
    // let prevPin = parseInt(this.lastExportIndex) + parseInt(this.quantity);
    // let nextPin = parseInt(this.lastExportIndex) + parseInt(this.quantity);
    console.log(parseInt(this.lastExportIndex) + parseInt(this.quantity))
    let d = {
      sub_product_id: this.batchObject.id,
      quantity: this.quantity,
      start_index: parseInt(this.lastExportIndex),
      end_index: parseInt(this.lastExportIndex) + parseInt(this.quantity)
    };

    // this.loading = true;
    // console.log(this.surveyForm.value);
    this.productService.updatePinExportHistory( this.currentUser.id, d )
      .pipe(first())
      .subscribe(
        data => {
          // console.log("ok>>", data['data']);
          if (data['status']) {
            // this.success_msg = "Survey added successfully.";
            // this.router.navigate(['/pages/survey']);
            this.getLastExportHistory();
          }
          else {
            // this.success_msg = data['message'];
          }
        },
        error => {
          // this.alertService.error(error);
          // this.loading = false;
        });
  }


  async convert(value) {
    const dg = JSON.parse(value);
    const digits = '000000000000';
    const newDgt = digits.slice(0, -dg.length);
    console.log(digits, newDgt, 'newDgt + dg', newDgt + dg, dg.length);
    return await newDgt + dg;
  }

}
