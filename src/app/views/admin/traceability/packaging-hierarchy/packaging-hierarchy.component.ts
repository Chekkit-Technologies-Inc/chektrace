import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-packaging-hierarchy',
  templateUrl: './packaging-hierarchy.component.html',
  styleUrls: ['./packaging-hierarchy.component.css']
})
export class PackagingHierarchyComponent implements OnInit {
  nextStep: number = 1

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  continue(){
    this.router.navigate(['/traceability/serial-number-summary'])
  }

  back(){
    this.router.navigate(['/traceability/package-level'])
  }

}
