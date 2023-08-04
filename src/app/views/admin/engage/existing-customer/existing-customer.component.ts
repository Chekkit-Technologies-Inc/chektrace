import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthenticationService, UserService, AlertService, SurveyService, SurveyRewardService, ProductService, RestService } from '../../../../core/_services';
import { Router, ActivatedRoute } from '@angular/router';
import { noWhitespaceValidator } from '../../../../core/_helpers/whitespace-validator';
import { Subscription } from 'rxjs';
import { User } from '../../../../core/_models/user';
import { Papa } from 'ngx-papaparse';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
  ValidatorFn
} from '@angular/forms';
  
@Component({
  selector: 'app-existing-customer',
  templateUrl: './existing-customer.component.html',
  styleUrls: ['./existing-customer.component.css']
})
export class ExistingCustomerComponent implements OnInit {
  stage = 2;
  dataForm: FormGroup;
  loading = false;
  submitted: boolean;
  currentUser: User;
  currentUserSubscription: Subscription;
  _slug: any;
  slug: string;
  subProductForm: FormGroup;
  contactsForm: FormGroup;
  // contactsData = [];

  success_msg: any;
  processing: boolean;
  groupId: any;
	inputData = {
		message: "",
		group_id: "",
		send_immediately: 0,
		should_save: 1,
	};
  groupName: any;
  color = 'light'
  contactsData = [
    {
      phone: '09415673402',
      age: '18 - 25',
      date_created: '11 mar 2020',
    },
    {
      phone: '09415622202',
      age: '18 - 25',
      date_created: '18 mar 2020',
    }
  ]
  form: FormGroup;

  orcdersData = [
    { id: 100, name: 'order 1' },
    { id: 200, name: 'order 2' },
    { id: 300, name: 'order 3' },
    { id: 400, name: 'order 4' }
  ];

  



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
      // this.contactsForm = this.formBuilder.group({
      //   contacts: []
      // });
      this.form = this.formBuilder.group({
        contacts: new FormArray([])
      });
  
      this.addCheckboxes();

      // this.addCheckboxes();

      this.subProductForm = this.formBuilder.group({
        productId: [this.slug],
        product_name: ['', [Validators.required]],
        expiry_date: ['', Validators.required],
        production_date: ['', Validators.required],
        survey_id: ['', Validators.required],
        reward_id: ['', Validators.required],
      });

     }

     // convenience getter for easy access to form fields
     get f() { return this.subProductForm.controls; }


    get contactsFormArray() {
      return this.contactsForm.controls.contacts as FormArray;
    }

    // private addCheckboxes() {
    //   this.ordersData.forEach(() => this.contactsFormArray.push(new FormControl(false)));
    // }
    get ordersFormArray() {
      return this.form.controls.contacts as FormArray;
    }

  private addCheckboxes() {
    this.contactsData.forEach(() => this.ordersFormArray.push(new FormControl(false)));
  }

  selectAll(event){
    console.log(event.target.checked)
    console.log(event.target.checked)
    this.ordersFormArray.controls.forEach((currentValue, index) => {this.ordersFormArray.controls[index].setValue(event.target.checked);  });
  }
    nextStage(){
      // this.stage++;
      this.router.navigate(["survey"]);
    }

    prevStage(){
      console.log('prev')
      this.stage--;
    }

    goBack(){
      this.router.navigate(["engage/engage"]);
    }

    ngOnInit(): void {
    }

    submit(){}

}
