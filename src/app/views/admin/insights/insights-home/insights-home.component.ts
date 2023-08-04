import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insights-home',
  templateUrl: './insights-home.component.html',
  styleUrls: ['./insights-home.component.css']
})
export class InsightsHomeComponent implements OnInit {
  stage = 1;
  
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  getStarted(){

  }
}
