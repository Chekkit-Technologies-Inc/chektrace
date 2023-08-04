import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pin-card',
  templateUrl: './pin-card.component.html',
  styleUrls: ['./pin-card.component.css']
})
export class PinCardComponent implements OnInit {
  gtinValue: string;
  sgtinValue: string;
  expValue: string;
  lotnoValue: string;
  codeFormatValue: string;
  sizeValue: string;
  
  @Input()
  set size(val: string) {
    this.sizeValue = (val);
  }

  @Input()
  set gtin(val: string) {
    this.gtinValue = (val);
  }

  @Input()
  set exp(val: string) {
    this.expValue = (val);
  }


  @Input()
  set code_format(val: string) {
    this.codeFormatValue = (val);
  }

  @Input()
  set sgtin(val: string) {
    this.sgtinValue = (val);
  }

  

  @Input()
  set lotNo(val: string) {
    console.log('val',val)
    this.lotnoValue = (val);
  }


  constructor() { }

  ngOnInit(): void {
  }

}
