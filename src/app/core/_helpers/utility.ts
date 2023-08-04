import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { ToastService } from '../component/toast/toast.service';
import { AuthenticationService } from '../_services';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Injectable()
export class UtilityProvider {
    plan: any;
    loader = this.loadingBar.useRef();

  constructor(
      public http: HttpClient,
      private loadingBar: LoadingBarService,
      private authenticationService: AuthenticationService
      ) {
      
        this.authenticationService.currentUserPlan.subscribe(data => {
        //   this.plan = user.data.user;
          this.plan = JSON.parse(data.features);
          console.log('User value', this.plan);

        });

    }
    
    hasPermission(id){
        // console.log(id)
        id = JSON.stringify(id);
        // console.log(this.plan.includes(id));
        // console.log(this.plan);
        return this.plan.includes(id);
    }

    startBarLoader(){
        this.loader.start()
      }
    
      stopBarLoader(){
        this.loader.stop()
      }
    
    returnCurrencySymbol(c){
        let sym = '';

        if(c == 'NGN'){
            sym = '₦';
        }else if(c == 'USD'){
            sym = '$';
        }

        return sym;
    }
    
    numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}
