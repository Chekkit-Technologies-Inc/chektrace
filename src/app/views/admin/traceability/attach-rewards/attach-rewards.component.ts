import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/_services';

@Component({
  selector: 'app-attach-rewards',
  templateUrl: './attach-rewards.component.html',
  styleUrls: ['./attach-rewards.component.css']
})
export class AttachRewardsComponent implements OnInit {
  postPackingProcess = 'packing';
  isPacking: boolean = false;
  type: any;
  parentLevel: any;
  childLevel: any;
  capacity: any;
  @Output() backToStatus = new EventEmitter

  @Input() serialDetails: any;
  @Input() serialNumber: any;
  @Input() packageLevel: any;
  packageLevels: any;
  subProductId: any;
  childId: any;
  parentId: any;
  loading: boolean;
  childScan: any;
  parentScan: any;
  childrenScans: any = [];


  constructor(
    private router: Router,
    private productService: ProductService,
  ) { }

  ngOnInit(): void {
    console.log(this.serialDetails);
    console.log(this.serialNumber);
    console.log(this.packageLevel);

    this.packageLevels = this.packageLevel;
    this.subProductId = this.serialNumber.subProductId;
  }

  attachRewards(){
    this.router.navigate(['/traceability/quicklinks'])
  }

  pack(){
    this.loading = true;
    const body = {
      "subProductId": this.subProductId,
      "parentPackageLevelId": parseInt(this.parentId),
      "parentCapacity": this.capacity,
      "childrenPackageLevelId": parseInt(this.childId)
    }

    this.productService.packing(body).subscribe((res: any)=>{
      this.loading = false;
      console.log(res);
      if(res.statusCode == 200){
        this.parentId = '';
        this.childId = '';
        this.capacity = '';
        this.postPackingProcess = 'loading';
        this.parentLevel = '';
        this.childLevel = '';
        this.capacity = '';
        this.childrenScans = [];
        this.parentScan = '';

      }
      this.getShippingSummary()

    })

    console.log(body)


  }

  selectChild(e){
    console.log(e)
    this.childId = e
  }

  selectParent(p){
    console.log(p)
    this.parentId = p;
  }

  back(){
    this.backToStatus.emit('true')
  }

  addMore(){

    const numberRange = this.childScan
    this.childrenScans.push(numberRange);

    this.childScan = '';
    console.log(this.childrenScans)

  }

  getShippingSummary(){
    this.productService.shippingSummary(this.subProductId).subscribe((res)=>{
      console.log(res)
    })
  }

  removeCode(e){
    // const item = this.childrenScans.findIndex(item => item.code === e );
    // this.childrenScans.splice(item, 1)

    const itemDelete: number = this.childrenScans.indexOf(e);
    if(itemDelete !== -1){
      this.childrenScans.splice(itemDelete, 1);
    }
  }

}
