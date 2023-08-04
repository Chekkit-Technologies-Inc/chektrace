import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/internal/operators/first';
import { ProductService, SurveyService } from 'src/app/core/_services';
import { AuthenticationService } from 'src/app/core/_services/authentication.service';
import { RestService } from 'src/app/core/_services/rest.service';
import { SurveyRewardService } from 'src/app/core/_services/surveyReward.service';
// import { PaystackOptions } from 'angular4-paystack';
import { Chart } from 'chart.js'
import { getRelativePosition } from 'chart.js';
import { NavbarService } from 'src/app/core/_services/navbar.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {
  currentUser: any;
  campaigns: any;
  userId: any;
  allCampaigns: any;
  currentStage: number = 1;
  showPaystackModal: boolean = false;
  airtime_value: any;
  airtime_units: any;
  rewards: any = [];
  loading: boolean;
  p: number = 1;
  campaign_name: any;
  campaign_description: any;
  showDetail: boolean = false;
  reference = '';
  campaignType: string;
  campaignTitle: any;
  campaignDescription: any;
  title: string;
  paymentData: any;
  proceedToPay: boolean = false;
  paymentRef: any;
  resPaymentRef: any;
  campaignId: any;
  showModal: boolean = false;
  selectedCampaign: any;
  searchTerm = '';
  term = '';


  // options: PaystackOptions = {
  //   amount: parseInt(airtime_units ),
  //   email: 'user@mail.com',
  //   ref: `${Math.ceil(Math.random() * 10e10)}`
  // }


  constructor(
    private _rest: RestService,
    private authService: AuthenticationService,
    private surveyService: SurveyRewardService,
    private router: Router,
    private survey: SurveyService,
    private navService: NavbarService
  ) {
    this.currentUser = this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
      console.log("User value", this.currentUser);
      this.userId = this.currentUser.id

    });

    this.navService.show()

    setTimeout(()=>{
      this.getCampaigns();
    }, 1000)
   }

  ngOnInit(): void {
    const data = [
      { month: "Jan", count: 200 },
      { month: "Feb", count: 170 },
      { month: "Mar", count: 150 },
      { month: "Apr", count: 250 },
      { month: "May", count: 220 },
      { month: "Jun", count: 300 },
      { month: "Jul", count: 280 },
      { month: "Aug", count: 150 },
      { month: "Sept", count: 250 },
      { month: "Oct", count: 220 },
      { month: "Nov", count: 300 },
      { month: "Dec", count: 280 },
    ];
    const chart = new Chart("myChart", {

      type: 'bar',
      data: {
        labels: data.map(row => row.month),
        datasets: [
          {
            label: '',
            data: data.map(row => row.count),
            backgroundColor: '#153853',
          }
        ]
      },
      options: {
        onClick: (e) => {
          const canvasPosition = getRelativePosition(e, chart);

          // Substitute the appropriate scale IDs
          const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
          const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
        }
      }
    });
  }

  getCampaigns(){
    // this._rest.getUserInsightCampaigns$(this.currentUser.id).subscribe((response)=>{
    //   console.log(response)
    // })
    this._rest
      .getUserInsightCampaigns$(this.userId).subscribe((res: any)=>{
       this.allCampaigns = res.data;
        console.log(res)
      })

  }

  closeModal(){
    this.showPaystackModal = !this.showPaystackModal;
  }

  addNewAirtime(){
    const rewardObject = {
      reward_value: this.airtime_value,
      reward_quant: this.airtime_units,
      reward_type: "airtime",
    };
    this.rewards.push(rewardObject);
    this.airtime_value = '';
    this.airtime_units = '';
    console.log(this.rewards)
  }

  addAirtimeReward(){

    this.loading = true;
    const body = {
      "rewards": this.rewards,
      "campaign_id": 0
    }
    this.surveyService.createReward(this.currentUser.id, body).subscribe((response: any) => {
      this.loading = false;
      console.log(response)
      // if(response.status == true){
      //   this.showModal = !this.showModal;
      // }
    })

    console.log(body)
  }

  paymentInit() {
    console.log('Payment initialized');
  }

  paymentDone(ref: any) {
    this.title = 'Payment successfull';
    console.log(this.title, ref);
    if(ref.status == 'success'){
      this.resPaymentRef = ref.reference;
      this.verifyPayment();
      this.fetchSurvey();

    }
  }

  paymentCancel() {
    console.log('payment failed');
  }
  goHome(){
    this.router.navigate(['/MAS'])
  }

  removeReward(e){
    console.log(e)
    const item = this.rewards.findIndex(item => item.reward_value === e );

    this.rewards.splice(item, 1)
  }

  selectAirtime(){
    this.campaignType = 'Airtime';
    this.currentStage = 4;
  }

  createCampaign(){
    const body = {
      "title" : this.campaign_name,
      "description": this.campaign_description
    }
    this.surveyService.createCampaign(body).subscribe((res: any)=>{
      // console.log(res)
      if(res.statusCode == 200){
        this.showDetail = true;
        console.log(res);
        this.campaignId = res.data.id;
        this.campaignTitle = res.data.title;
        this.campaignDescription = res.data.description;
      }
    })
    console.log(body)
  }

  fetchSurvey(){
    this.survey.getAllUserSurveys(this.userId).subscribe((res :any)=>{
      console.log(res)
    })
  }
  initPayment(){
    this.loading = true;
    let amount = this.airtime_value  *  this.airtime_units;
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

  verifyPayment(){
    const body = {
      "reference": this.paymentRef,
      "amount": this.airtime_value * this.airtime_units
    }
    console.log(body)
    this.surveyService.verifyPayment(body).subscribe((res: any)=>{
      console.log(res)
      // this.router.navigate(['MAS/add-survey/'], { queryParams: { id: this.campaignId } });
      this.currentStage = 6;
    })
  }

  getSurveyId(e){
    console.log(e)
    if(e){
      this.router.navigate(['/MAS/active-campaign'])
    }
  }

  viewCampaign(e){
    const selectedId = this.allCampaigns.findIndex(item => item.id == e);
    this.selectedCampaign = this.allCampaigns[selectedId];
    console.log(this.selectedCampaign)
    this.showModal = true;
  }

}
