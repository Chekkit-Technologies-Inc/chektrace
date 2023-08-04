import { Component } from '@angular/core';
import { AlertService, ProductService } from 'src/app/core/_services';

@Component({
  selector: 'app-redemption-site',
  templateUrl: './redemption-site.component.html',
  styleUrls: ['./redemption-site.component.css']
})
export class RedemptionSiteComponent {
  redemptionList: any;
  showModal: boolean = false;
  selectedId: any;
  location: string;
  state: string;
  address: string;
  name: string;
  loading: boolean = false;
  searchTerm = '';
  term = '';


  constructor(
    private productService: ProductService,
    private alertService: AlertService
  ){
    this.getRedemptionList()
  }

  getRedemptionList(){
    this.productService.getRedemptionlist().subscribe((res: any)=>{
      console.log(res)
      if(res.statusCode === 200){
        this.redemptionList = res.data;
      }else{
        this.alertService.showAlertNotification('Oops!',res.message,'error')
      }
    },(error)=>{
      this.alertService.showAlertNotification('Error!',error,'error')
    })
  }

  updateRedemptionSite(){
    this.loading = true;
    const body = {
      id: this.selectedId,
      "point_location": this.location,
      "point_address": this.address,
      "point_state": this.state,
      "point_agent_name": this.name
    }
    console.log(body)
    this.productService.updateRedemptionPoint(body).subscribe((res: any)=>{
      this.loading = false;
      this.showModal = false;
      this.location = '';
      this.address = '';
      this.state = '';
      this.name = '';
      this.getRedemptionList()
      // console.log(res)
      this.alertService.showAlertNotification('Success!',res.message,'success');

    },(error)=>{
      this.loading = false;
      this.alertService.showAlertNotification('Oops!','An error occured','error')
    })
  }

  openModal(e){

    const selectedList = this.redemptionList.filter(item => item.id === e)
    console.log(selectedList);
    this.selectedId = e;
    this.location = selectedList[0].point_location;
    this.address = selectedList[0].point_address;
    this.state = selectedList[0].point_state;
    this.name = selectedList[0].point_agent_name;
    this.showModal = true;
    // this.
  }
}
