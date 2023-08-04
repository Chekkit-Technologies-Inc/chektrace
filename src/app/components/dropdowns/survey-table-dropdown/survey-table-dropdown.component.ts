import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { createPopper } from "@popperjs/core";
import {  Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'survey-table-dropdown',
  templateUrl: './survey-table-dropdown.component.html',
  styleUrls: ['./survey-table-dropdown.component.css']
})
export class SurveyTableDropdownComponent  implements AfterViewInit {
  dropdownPopoverShow = false;
  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef: ElementRef;
 

  @Output() onViewEvent = new EventEmitter<string>();
  @Output() onEditEvent = new EventEmitter<string>();


  ngAfterViewInit() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
  }


  edit() {
    this.onEditEvent.emit();
  }

  view() {
    this.onViewEvent.emit();
  }

  toggleDropdown(event) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }
}