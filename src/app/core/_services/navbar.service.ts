import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../_models';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  currentUserSubscription: Subscription;
  visible: boolean;
  public currentUser: User;

  constructor(
    private authenticationService: AuthenticationService,
  ) {
    this.visible = false;

     this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('User value', this.currentUser);
    });
   }

   hide(){
     this.visible = false;
   }

   show(){
     this.visible = true;
   }

   toggle(){
     this.visible = !this.visible;
   }
}
