import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/core/_services';
import { NavbarService } from 'src/app/core/_services/navbar.service';

@Component({
  selector: 'app-assign-survey',
  templateUrl: './assign-survey.component.html',
  styleUrls: ['./assign-survey.component.css']
})
export class AssignSurveyComponent implements OnInit {
  nextStep: number = 1;
  parent_container: any;
  children_containers: any = [];
  children_container: any;
  loading: boolean = false;
  subProductId: any;

  constructor(
    private router: Router,
    private productService: ProductService,
    public navService: NavbarService,
    private _Activatedroute: ActivatedRoute,
  ) {
    this._Activatedroute.paramMap.subscribe(params => {
      this.subProductId = params.get('id');

      console.log(this.subProductId)

    });
  }

  ngOnInit(): void {
    this.navService.show()

  }

  goToSetup(){
    this.router.navigate(['traceability/setup-surveys'])
  }

  addContainer(){
    this.children_containers.push(this.children_container);
    console.log(this.children_containers)
    this.children_container = '';
  }

  unpackPackage(){
    this.loading = true;
    const body = {
      "subProductId": parseInt(this.subProductId),
      "parentSerial": this.parent_container,
      "children": this.children_containers
    }



    // console.log(body)

    setTimeout(()=>{
      this.productService.unpackPackages(body).subscribe((res: any)=>{
        this.loading = false;
        this.nextStep = 2
        console.log(res);
        this.parent_container = '';
        this.children_containers = [];
        this.children_container = '';
      },(error)=>{
        this.loading = false;
        console.log(error)
      })

  }, 3000);
  }

}
