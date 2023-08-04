import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rewards-home',
  templateUrl: './rewards-home.component.html',
  styleUrls: ['./rewards-home.component.css']
})
export class RewardsHomeComponent implements OnInit {
  rewardType = '';

  
  constructor() { }

  ngOnInit(): void {
  }

}
