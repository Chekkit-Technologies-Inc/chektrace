import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from '../../../../core/_models';
import { Subject, Subscription } from 'rxjs';
import { SurveyRewardService, AuthenticationService, SurveyService, UserService } from '../../../../core/_services';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import {DataTablesModule} from 'angular-datatables';
import { DataTableDirective } from 'angular-datatables';
import { UtilityProvider } from '../../../../core/_helpers/utility';

@Component({
  selector: 'app-raffle-draw',
  templateUrl: './raffle-draw.component.html',
  styleUrls: ['./raffle-draw.component.css']
})
export class RaffleDrawComponent implements OnInit {
  currentUserSubscription: Subscription;
  currentUser: User;
  rewardObjct: any;
  data: any;
  rows: any;
  temp: any[];
  rewards: any;
  color ='light';
  table: any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective, {static: false})
  datatableElement: DataTableDirective;
  
  constructor(
    private authenticationService: AuthenticationService, 
    private router: Router, 
    public utility: UtilityProvider,
    private _surveyRewardService: SurveyRewardService
  ) { 
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('User value', this.currentUser);
    });

  }

  ngOnInit(): void {
    this.dtOptions = {
      destroy: true,
      ordering: true,
      // pagelength: 10,
      pagingType: "full_numbers",
    //   columnDefs: [{ 
    //     targets: 0,
    //     checkboxes:{
    //     selectRow: true,
    //     selected: true
    //   }]
    };
  }
  ngAfterViewInit(): void {
    this.dtTrigger.next();
    this.get_UserRewards();
}

  get_UserRewards() {
    this.utility.startBarLoader()
    this._surveyRewardService.getAllUserSurveyReward(this.currentUser.id).pipe(first()).subscribe(data => {
      console.log("data", data);
      if (data['status']) {
        this.utility.stopBarLoader()

        console.log(data['data']);
        this.data = data['data'];
        this.rows = this.data;
        this.temp = [...this.data];
        this.doTrigger();
      }
    });

  }

  doTrigger(){
    console.log(889);
    
    this.dtTrigger.next();
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.temp.filter(function(d) {
      return d.reward_value.toLowerCase().indexOf(val) !== -1 || !val || JSON.stringify(d.reward_quantity).indexOf(val) !== -1 || !val  || d.reward_type.toLowerCase().indexOf(val) !== -1 || !val ;
    });
    this.dtTrigger.next();
    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table = this.rows;
  } 

}
