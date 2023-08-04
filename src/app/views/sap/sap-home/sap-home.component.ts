import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sap-home',
  templateUrl: './sap-home.component.html',
  styleUrls: ['./sap-home.component.css']
})
export class SapHomeComponent implements OnInit {
  stage = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
