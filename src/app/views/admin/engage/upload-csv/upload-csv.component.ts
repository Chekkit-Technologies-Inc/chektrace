import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService, UserService, AlertService, SurveyService, SurveyRewardService, ProductService, RestService } from '../../../../core/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { noWhitespaceValidator } from '../../../../core/_helpers/whitespace-validator';
import { Subscription } from 'rxjs';
import { User } from '../../../../core/_models/user';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-upload-csv',
  templateUrl: './upload-csv.component.html',
  styleUrls: ['./upload-csv.component.css']
})
export class UploadCsvComponent implements OnInit {
  stage = 2;
  dataForm: FormGroup;
  loading = false;
  submitted: boolean;
  currentUser: User;
  currentUserSubscription: Subscription;
  _slug: any;
  slug: string;
  subProductForm: FormGroup;
  uploadSuccess: boolean;

  success_msg: any;
  files: any[] = [];
  selectedCSVFileName: any;
  csvTableData: any[];
  csvTableHeader: any;
  isCSV_Valid: boolean;
  convertedFiles = [];
  processing: boolean;
  groupId: any;
  inputData = {
    message: "",
    group_id: "",
    send_immediately: 0,
    should_save: 1,
  };
  groupName: any;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private _rest: RestService,
    private route: ActivatedRoute,
    private papa: Papa,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private surveyRewardService: SurveyRewardService,
    private surveyService: SurveyService,
    private alertService: AlertService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('User value', this.currentUser);
    });


    this.slug = this.activatedRoute.snapshot.queryParams.q;
    this._slug = this.activatedRoute.snapshot.queryParams.j;
    console.log('product', (this.slug));

    this.subProductForm = this.formBuilder.group({
      productId: [this.slug],
      product_name: ['', [Validators.required]],
      expiry_date: ['', Validators.required],
      production_date: ['', Validators.required],
      survey_id: ['', Validators.required],
      reward_id: ['', Validators.required],
    });

  }


  ngOnInit() {

  }

  goBack() {
    this.router.navigate(["engage/engage"]);
  }

  createListName() {
    let data = {
      name: this.groupName
    }
    this.processing = true;
    this._rest.createRetargetGroup(data)
      .subscribe(
        data => {
          console.log(data);
          this.submitted = false;
          this.processing = false;
          if (data['status']) {
            this.groupId = data['data'].id;
            this.submit_bulk();
            // this.stage = 2;
            // this._message.next(`${data.message}`);
          } else {
            // this._message.next(`${data.message}`);
          }
        },
        error => {
          console.log(error);
          this.processing = false;
          // this.toastService.showToast('danger','error',error);
        });

  }

  sendText() {
    this.submitted = true;
    this.inputData.send_immediately = this.inputData.send_immediately ? 1 : 0;
    this.inputData.group_id = this.groupId;
    this.inputData.should_save = this.inputData.should_save ? 1 : 0;
    console.log(this.inputData)
    // stop here if form is invalid
    // if (this.dataForm.invalid) {
    //     return;
    // }

    this.processing = true;
    this._rest.sendRetargetMessage(this.inputData)
      .subscribe(
        data => {
          console.log(data);
          this.submitted = false;
          this.processing = false;
          if (data['status']) {
            this.success_msg = data['message'];
            // this.router.navigate(['/pages/overview']);                      
            // this.stage = 6;
          }
          else {
            this.success_msg = data['message'];
            // this.alertService.error(data['message']);
          }
        },
        error => {
          console.log(error);
          // this.toastService.showToast('danger','error',error);
          this.loading = false;
          this.processing = false;
        });

  }

  nextStage() {
    // this.stage++;
    this.router.navigate(["survey"]);
  }

  prevStage() {
    console.log('prev')
    this.stage--;
  }

  // convenience getter for easy access to form fields
  get f() { return this.subProductForm.controls; }


  submit_bulk() {
    let formatedProducts = [];
    var t = 0;
    for (var item of this.csvTableData) {
      if (item && item[0].length > 0) {

        var condition =
          ((item[0].length > 0)
            && (item[1].length > 0)
            && (item[2].length > 0));
        console.log(item[0]);
        console.log(item[1]);
        console.log(item[2]);
        console.log(condition);

        if (!condition) {
          var error = "input on line " + (t + 1) + " is invalid. Please review CSV and correct input.";
          // this.toastService.showToast('danger','error',error);
          // this.messageType = 'danger';
          // this._message.next(`${error}`);
          console.log(error);
          formatedProducts = [];
          break;
        }
        console.log(item);

        let new_item = { group_id: this.groupId, phone: item[0], name: item[1], gender: item[2], age: item[3], location: item[4], product_model: item[5], purchase_date: item[6], vip_level: parseInt(item[7]) }
        formatedProducts.push(new_item);
      }
      // console.log(item);
      console.log(formatedProducts);
      t++;
    }


    if (formatedProducts.length > 0) {
      this.processing = true;
      this._rest.uploadRetargetList(formatedProducts).pipe(first()).subscribe(async data => {
        console.log('data>>>>', data);
        if (data['status']) {
          // await this.showToast(this.status, this.title, this.paymentData.type + this.content);
          this.processing = false;
          this.clearFiles()
          // this.stage=3;
          this.sendText()

          // this.router.navigate(['pages/overview']);
        }
      },
        error => {
          console.log(error);
          this.processing = false;
          // this.toastService.showToast('danger','error',error);
        });
    }
  }
  clearFiles() {
    this.files = [];
  }

  // LOAD CSV FILE FROM INPUT
  fileChangeListener($event: any): void {

    console.log($event);
    const files = $event;
    console.log(files);

    // return;

    if (files !== null && files !== undefined && files.length > 0) {
      this.selectedCSVFileName = files[0].name;

      const reader: FileReader = new FileReader();
      reader.readAsText(files[0]);
      reader.onload = e => {

        const csv = reader.result;
        const results = this.papa.parse(csv as string, { header: false });

        // VALIDATE PARSED CSV FILE
        if (results !== null && results !== undefined && results.data !== null &&
          results.data !== undefined && results.data.length > 0 && results.errors.length === 0) {
          this.isCSV_Valid = true;

          // PERFORM OPERATIONS ON PARSED CSV
          this.csvTableHeader = results.data[0];

          this.csvTableData = [...results.data.slice(1, results.data.length)];
          console.log(this.csvTableHeader);
          console.log(this.csvTableData);

        } else {
          for (let i = 0; i < results.errors.length; i++) {
            console.log('Error Parsing CSV File: ', results.errors[i].message);
          }
        }
      };
    } else {
      console.log('No File Selected');
    }

  }
  // https://medium.com/@tarekabdelkhalek/how-to-create-a-drag-and-drop-file-uploading-in-angular-78d9eba0b854
  /**
   * on file drop handler
   */
  onFileDropped($event) {
    this.prepareFilesList($event);
  }

  onFileDropped2($event) {
    this.prepareFilesList2($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(files) {
    console.log(33)

    this.prepareFilesList(files);
  }

  fileBrowseHandler2(files) {
    console.log(33)
    this.prepareFilesList2(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }
  testAlert() {
    this.alertService.showAlertNotification('warning!', 'error', 'warning');
    this.alertService.simpleAlert("jjj")
  }
  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      // console.log(files[0].name.substr(files[0].name.lastIndexOf('.') + 1))
      if (files[0].name.substr(files[0].name.lastIndexOf('.') + 1) !== 'csv') {
        // this.alertService.showAlertNotification('danger','wrong file input','file type not accepted, please upload a csv',);
        // this.alertService.showAlertNotification('Success!','Your request is successful', 'success');
        this.alertService.showAlertNotification('warning!', 'error', 'warning');

        return false;
      }
      item.progress = 0;
      this.files[0] = item;
      console.log(item);
    }
    this.fileChangeListener(files)

    this.uploadFilesSimulator(0);
  }
  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  async prepareFilesList2(files: Array<any>) {
    for (const item of files) {
      // console.log(files[0].name.substr(files[0].name.lastIndexOf('.') + 1))
      if (files[0].name.substr(files[0].name.lastIndexOf('.') + 1) !== 'csv') {
        // this.toastService.showToast('danger','wrong file input','file type not accepted, please upload a csv');
        this.alertService.showAlertNotification('danger', 'wrong file input', 'file type not accepted, please upload a csv');
        // this.alertService.showAlertNotification('warning!','error', 'warning');

        return false;
      }
      console.log()
      item.progress = 0;
      if (this.files.length == 2) {
        this.files[1] = item;
        await this.cb(item)
      } else {
        this.files.push(item);
        await this.cb(item)
      }
      console.log(item);
    }
    // this.fileChangeListener(files)

    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }


  async cb(file) {
    // let convertedFiles=[];
    // const file = this.files[0];
    let env = this;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      env.convertedFiles.push(reader.result);
      // env.senderIdPayload.passport = env.convertedFiles[0];
      // if(env.convertedFiles[1]){
      //   env.senderIdPayload.template = env.convertedFiles[1];
      // }
      console.log(env.convertedFiles)
    };
    // console.log(this.DataURIToBlob(this.files[0]))
  }
}
