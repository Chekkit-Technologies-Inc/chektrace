import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AlertService, AuthenticationService, ProductService } from 'src/app/core/_services';
import { FooterService } from 'src/app/core/_services/footer.service';
import { NavbarService } from 'src/app/core/_services/navbar.service';
import { environment } from 'src/environments/environment';
import { User } from '../../../../core/_models';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-link-account',
  templateUrl: './link-account.component.html',
  styleUrls: ['./link-account.component.css']
})
export class LinkAccountComponent implements OnInit {
  link_email: string;
  link_key: string;
  url = environment.apiUrl+'/api/v2/gs1/account-link?/';
  loading: boolean = false;
  currentUserSubscription: Subscription;
  currentUser: User;
  gs1Status: any;
  selected: string = 'userkey';
  emailLinkUrl: string = 'https://ci-api-staging.chekkit.app/api/v2/gs1/account-link?email=';
  tokenLinkUrl: string = 'https://ci-api-staging.chekkit.app/api/v2/gs1/account-link?gs1UserKey=' ;

  constructor(
    public navService: NavbarService,
    private router: Router,
    private http: HttpClient,
    public footerService: FooterService,
    private authenticationService: AuthenticationService,
    private productService: ProductService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.navService.hide()

    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('User value', this.currentUser);
    });


    this.gs1Status = this.currentUser.profile.gs1_api_key;

    if(this.gs1Status == null){
      this.router.navigate(['/traceability/link-account'])
    }else{
      this.router.navigate(['/traceability/products'])
    }
  }

  linkAccount(){
    this.loading = true;
    console.log(this.link_email)
    const link_url = this.url+this.link_email
    console.log(link_url)

    this.http.get(this.emailLinkUrl+this.link_email).subscribe((res: any)=>{
      console.log(res)
      if(res.statusCode == 200){
        this.loading = false;
        this.router.navigate(['/traceability/products']);
      }
    },(error)=>{
      this.loading = false;
      this.simpleAlert("Something Went Wrong Please Try again");
    })


    // this.router.navigate(['/traceability/products'])
  }

  linkToken(){
    this.loading = true;
    this.http.get(this.tokenLinkUrl+this.link_key).subscribe((res: any)=>{
      if(res.statusCode == 200){
        this.loading = false;
        this.router.navigate(['/traceability/products']);
      }
    })
  }

  useEmail(){
    this.selected = 'email';
  }

  useToken(){
    this.selected = 'userkey';
  }

  simpleAlert(msg){
    Swal.fire(msg);
}
}
