import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sticker-labels',
  templateUrl: './sticker-labels.component.html',
  styleUrls: ['./sticker-labels.component.css']
})
export class StickerLabelsComponent implements OnInit {
  selectedLabelStatus: any;

  constructor() { }

  ngOnInit(): void {
  }

  checkLabels(e){
    console.log(e.target.value);
    this.selectedLabelStatus = e.target.value;
  }

}
