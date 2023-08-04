import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-campaign',
  templateUrl: './new-campaign.component.html',
  styleUrls: ['./new-campaign.component.css']
})
export class NewCampaignComponent implements OnInit {
  isNotSelected: boolean = true;
  selectedPlan: string ;

  constructor() { }

  ngOnInit(): void {
    this.selectedPlan = 'airtime'
  }

  selectPlan(e){
    this.selectedPlan = e;
    console.log(e)
  }

}
