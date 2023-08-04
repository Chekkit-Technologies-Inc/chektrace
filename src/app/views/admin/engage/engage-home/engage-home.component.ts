import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-engage-home',
  templateUrl: './engage-home.component.html',
  styleUrls: ['./engage-home.component.css']
})
export class EngageHomeComponent implements OnInit {
  stage = 2;
  selectedChannel = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }


  chooseChannel(type){
    console.log(type)
    this.selectedChannel = type;
  }

  visitPage(){
    if(this.selectedChannel == 'csv'){
      this.router.navigate(["dashboard/engage/upload-csv"]);
    }else if(this.selectedChannel == 'contacts'){
      this.router.navigate(["dashboard/engage/existing-contacts"]);
    }else if(this.selectedChannel == 'target'){
      this.router.navigate(["dashboard/engage/target-group"]);
    }
  }

  uploadCSV(){
    this.router.navigate(["engage/upload-csv"]);
  }

  linkExistingContact(){
    this.router.navigate(["engage/existing-customer"]);
  }

  targetDatabase(){
    this.router.navigate(["engage/target-group"]);
  }
}
