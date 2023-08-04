import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User, Survey, Product_Reward, Survey_Question, Product, RecordCounts } from '../_models';
import { environment } from '../../../environments/environment';
import { ToastService } from '../_services/toast.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    baseUrl = environment.apiUrl + environment.basePath;
    public currentUserSubject: BehaviorSubject<any>;
    public currentUserPlanSubject: BehaviorSubject<any>;
    public currentSubscriptionSubject: BehaviorSubject<any>;
    private SurveySubject: BehaviorSubject<any>;
    private ProductRewardSubject: BehaviorSubject<any>;
    private SurveyQuestSubject: BehaviorSubject<any>;
    private ProductsSubject: BehaviorSubject<any>;
    private SubProductsSubject: BehaviorSubject<any>;
    private ProductPinsSubject: BehaviorSubject<any>;
    private RecordCountsSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;
    public currentSubscription: Observable<any>;
    public currentUserPlan: Observable<any>;
    public allsurveys: Observable<any>;
    public allproductRewards: Observable<any>;
    public allsurveyQuestions: Observable<any>;
    public allProducts: Observable<any>;
    public allSubProducts: Observable<any>;
    public allUserProductPins: Observable<any>;
    public recordCounts: Observable<any>;



    constructor(
        private http: HttpClient,
        private toastService: ToastService
        ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('chekkitCurrentUser')!));
        this.currentUser = this.currentUserSubject.asObservable();

        this.currentUserPlanSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('chekkitUserPlan')!));
        this.currentUserPlan = this.currentUserPlanSubject.asObservable();

        this.currentSubscriptionSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('chekkitCurrentSubscription')!));
        this.currentSubscription = this.currentSubscriptionSubject.asObservable();

        this.SurveySubject = new BehaviorSubject<Survey>(JSON.parse(localStorage.getItem('allsurveys')!));
        this.allsurveys = this.SurveySubject.asObservable();

        this.ProductRewardSubject = new BehaviorSubject<Product_Reward>(JSON.parse(localStorage.getItem('allsurveyRewards')!));
        this.allproductRewards = this.ProductRewardSubject.asObservable();

        this.SurveyQuestSubject = new BehaviorSubject<Survey_Question>(JSON.parse(localStorage.getItem('allsurveyQuestions')!));
        this.allsurveyQuestions = this.SurveyQuestSubject.asObservable();

        this.ProductsSubject = new BehaviorSubject<Product>(JSON.parse(localStorage.getItem('allProducts')!));
        this.allProducts = this.ProductsSubject.asObservable();

        this.SubProductsSubject = new BehaviorSubject<Product>(JSON.parse(localStorage.getItem('allSubProducts')!));
        this.allSubProducts = this.SubProductsSubject.asObservable();

        this.ProductPinsSubject = new BehaviorSubject<Product>(JSON.parse(localStorage.getItem('allProductPins')!));
        this.allUserProductPins = this.ProductPinsSubject.asObservable();

        this.RecordCountsSubject = new BehaviorSubject<RecordCounts>(JSON.parse(localStorage.getItem('recordCounts')!));
        this.recordCounts = this.RecordCountsSubject.asObservable();
    }

    public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }

    public get currenSubscriptionValue(): any {
        return this.currentSubscriptionSubject.value;
    }
    public get currentUserPlanValue(): any {
        return this.currentUserPlanSubject.value;
    }
    public get surveysValues(): any {
        return this.SurveySubject.value;
    }

    login(username: string, password: string) {
        console.log(444)
        return this.http.post<any>(this.baseUrl + `/auth/signin`, { username, password })
            .pipe(map(user => {
                console.log(user.data)

                // login successful if there's a jwt token in the response
                if (user.data.user && user.data.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    console.log(user.data.plan)
                    user.data.user.token = user.data.token;
                    localStorage.setItem('chekkitCurrentUser', JSON.stringify(user.data.user));
                    localStorage.setItem('chekkitUserPlan', JSON.stringify(user.data.plan));
                    localStorage.setItem('userType', JSON.stringify(user.data.user.membership_type))
                    localStorage.setItem('chekkitCurrentSubscription', JSON.stringify(user.data.subscription));

                    this.currentUserSubject.next(user.data.user);
                    this.currentUserPlanSubject.next(user.data.plan);
                    this.currentSubscriptionSubject.next(user.data.subscription);
                }
                return user.data.user;
            }));
    }

    getApiKey() {
        return this.http.post<any>(this.baseUrl + `/auth/api-access-token`, { })
            .pipe(map(data => {
                console.log(data)

                return data;
            }));
    }



    register(user: User) {
        return this.http.post(this.baseUrl + `/auth/signup`, user)
        .pipe(map(u => {
            console.log('user ', u['data'])
            // login successful if there's a jwt token in the response
            if (u['data'].user && u['data'].token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                console.log(u['data'].user)
                localStorage.setItem('chekkitCurrentUser', JSON.stringify(u['data']));
                // localStorage.setItem('chekkitUserPlan', JSON.stringify(user.data.plan));
                // localStorage.setItem('chekkitCurrentSubscription', JSON.stringify(user.data.subscription));

                this.currentUserSubject.next(u['data']);
                // this.currentUserPlanSubject.next(user.data.plan);
                // this.currentSubscriptionSubject.next(user.data.subscription);
            }
            return u;
        }));
    }

    /**
      * @param none
      * @returns boolean TRUE OR FALSE
      */
     tokenExist() {
        return !!JSON.parse(localStorage.getItem('chekkitCurrentUser')!);
    }

    /**
      * @param none
      * @returns boolean TRUE OR FALSE
      */
    planValid() {
        let subValid = false;

        let plan = JSON.parse(localStorage.getItem('chekkitUserPlan')!);
        if(plan){
            let sub = JSON.parse(localStorage.getItem('chekkitCurrentSubscription')!);

            subValid = this.diffDays(sub.end_date) > 0 ?true:false

            if(!subValid){
                alert('Trial expired')
            }

        }
        return !!plan && subValid;
    }


    diffDays(d1)
    {
      d1 =   new Date(d1);  // Today
      // console.log(d1);

      var d2 =   new Date();              // Today

      var ndays;
      var tv1 = d1.valueOf();  // msec since 1970
      var tv2 = d2.valueOf();

      ndays = (tv1 - tv2) / 1000 / 86400;
      ndays = Math.round(ndays - 0.5);
      return ndays;
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.clear();
        this.currentUserSubject.next(null);
    }
}
