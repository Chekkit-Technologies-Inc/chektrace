import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-traceability-map',
  templateUrl: './traceability-map.component.html',
  styleUrls: ['./traceability-map.component.css']
})
export class TraceabilityMapComponent implements OnInit {
  step = 1;
  receiveModal: boolean = false;
  shipModal: boolean = false;
  isItemVisible: boolean = false;
  loading: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
