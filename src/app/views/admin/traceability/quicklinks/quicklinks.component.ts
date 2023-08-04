import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quicklinks',
  templateUrl: './quicklinks.component.html',
  styleUrls: ['./quicklinks.component.css']
})
export class QuicklinksComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToAnalytics(){
    this.router.navigate(['/traceability/authentication-scan']);
  }

  goToTrack(){
    this.router.navigate(['/traceability/map']);
  }

}
