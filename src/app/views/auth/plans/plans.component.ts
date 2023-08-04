
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService, RestService, UserService, AlertService } from '../../../core/_services';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  
  @ViewChild('targetBtn') targetBtn: ElementRef;

  plans = [];
  
  selectedPlan : any;

  planData = {
    planId:'',
    isTrial: false
  }
  currentUserSubscription: any;
  currentUser: any;
  processing = false;

  constructor(
    private router: Router,
    private restService: RestService,
    private authenticationService: AuthenticationService
  ) {

    if (!this.authenticationService.tokenExist()){
      this.router.navigate(['/authentication/login']);
    }


    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('User value', user);
      console.log('User value', this.currentUser);
    });
   }

  ngOnInit(): void {
    // console.log(JSON.parse('["John","Peter","Sally","Jane"]'))
    this.getAllPlans();
  }

  formatCurrency =  (n) => n.toLocaleString()

  getAllPlans() {
    this.restService.getPlans().pipe(first()).subscribe(res => {
      if (res['data']) {
        // this.plans = this.plans.map(plans=>plans.sort(this.sortByPrice))

        let sortedBuilds = res['data'].sort((a, b) => {
          return parseFloat(a.price) - parseFloat(b.price);
        })

        this.plans = sortedBuilds;

        console.log('sortedBuilds ',sortedBuilds)
      }
    });
  }
  sortByPrice(a,b) {
    if (a.price < b.price)
      return -1;
    if (a.price > b.price)
      return 1;
    return 0;
  }
  convertToArray(str){
    return str?str.split(","):[]
  }

  choosePlan(plan,isTrial=false){
    this.selectedPlan = plan;
    this.planData.planId = plan.id;
    this.planData.isTrial = isTrial;
    // this.targetBtn.nativeElement.scrollIntoView();
    // document.querySelector('#targetBtn').scrollIntoView({ behavior: 'smooth', block: 'center' });


  }

  isPlanChosen(id){
    // return 0;
    return (this.selectedPlan  && (this.selectedPlan.id == id))?true:false;
  }

  submitPlan(){
    this.processing = true;

    this.restService.selectPlan(this.planData).pipe(first()).subscribe(res => {
      console.log("chekkitUserPlan", res['data']);
      if (res['data']) {
        console.log(888)
        console.log(res['data'])
        this.updateUserPlan(res['data'].planId);
        localStorage.setItem('chekkitCurrentSubscription', JSON.stringify(res['data']));
        this.authenticationService.currentSubscriptionSubject.next(res['data']);
        // this.router.navigate(['/dashboard']);
      }
    },(err:any) =>{
      this.processing = false;
    });    
  }

  updateUserPlan(id){
    this.processing = true;
    this.restService.getPlan(id).pipe(first()).subscribe(res => {
      console.log("chekkitUserPlan", res['data']);
      if (res['data']) {
        this.processing = false;
        console.log(555)
        console.log(res['data'])
        localStorage.setItem('chekkitUserPlan', JSON.stringify(res['data']));
        this.authenticationService.currentUserPlanSubject.next(res['data']);
        this.router.navigate(['/dashboard']);
      }
    },(err:any) =>{
      this.processing = false;
    });   

  }

}
