import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;
        const currentSubscription = this.authenticationService.currenSubscriptionValue;
        const currentUserPlan = this.authenticationService.currentUserPlan;
        // console.log("currentUser", currentUser);
        console.log("currentUser", currentSubscription);
        console.log("currentUser", currentUserPlan);

        // if (currentUser) {
        //     console.log("currentUser>>>", currentUser);
        //     // authorised so return true
        //     return true;
        // }
        // console.log("currentUser>>>>>11", currentUser);
        // // not logged in so redirect to login page with the return url
        // this.router.navigate(['/pages/auth/login'], { queryParams: { returnUrl: state.url } });
        // return false;

       

        if (this.authenticationService.tokenExist()) {
            return true;
        }
         else {
            // console.log('token value', '!toke exits');
            this.router.navigate(['/authentication/login'], { queryParams: { returnUrl: state.url } });
            // this.router.navigate(['/authentication/login']);
            return false;
        }
        // if (this.authenticationService.tokenExist() && this.authenticationService.planValid()) {
        //     return true;
        // }
        // else if (this.authenticationService.tokenExist() && !this.authenticationService.planValid()) {
        //     console.log('plan invalid')
        //     this.router.navigate(['/authentication/plans']);
        //     return true;

        // }
        //  else {
        //     // console.log('token value', '!toke exits');
        //     this.router.navigate(['/authentication/login']);
        //     return false;
        // }
    }
}
