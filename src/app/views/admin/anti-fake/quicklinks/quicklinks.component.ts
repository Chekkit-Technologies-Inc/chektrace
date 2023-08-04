import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/_models';
import { AuthenticationService } from 'src/app/core/_services';
import { NavbarService } from 'src/app/core/_services/navbar.service';

@Component({
  selector: 'app-quicklinks',
  templateUrl: './quicklinks.component.html',
  styleUrls: ['./quicklinks.component.css']
})
export class QuicklinksComponent implements OnInit {
  showModal = false;
  url: string = "https://chekkintel.azurewebsites.net/?id=";
  urlSafe: SafeResourceUrl;
  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(
    private authenticationService: AuthenticationService,
    public sanitizer: DomSanitizer,
    private navService: NavbarService
    ) {

    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('User value', this.currentUser);
    });
    this.navService.show()
    }



  ngOnInit(): void {
    let url = "https://chekkintel.azurewebsites.net/?id=" + this.currentUser.id;
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  toggleModal(){
    this.showModal = !this.showModal;
  }

}
