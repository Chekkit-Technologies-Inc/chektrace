import { Component, OnInit } from '@angular/core';
import { FooterService } from 'src/app/core/_services/footer.service';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit {
  step = 1;

  constructor(
    public footerService: FooterService
  ) { 
    this.footerService.hide();
  }

  ngOnInit(): void {
  }

  onboardCsv(){
    this.step = 2;
  }

  onboardApi(){
    this.step = 3;
  }

  displayCsvDetails(){
    this.step = 4
  }



}
