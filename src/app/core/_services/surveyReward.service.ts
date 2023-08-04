import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class SurveyRewardService {
    token: any;
    baseUrl = environment.apiUrl + environment.basePath;
    constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    }
    getAllSurveyReward(survey_id: number) {
        return this.http.get(this.baseUrl + `/survey-reward/${survey_id}`);
    }

    updateSurveyReward(rewardId: number, rewardObject: any) {
        return this.http.put(this.baseUrl + `/survey-reward/update-reward/${rewardId}`, rewardObject);
    }

    getUserRedemptionLocations(user_id: number) {
        return this.http.get(this.baseUrl + `/survey-reward/get-user-redemption-locations/${user_id}`);
    }
    getAllUserSurveyReward(user_id: number) {
        return this.http.get(this.baseUrl + `/survey-reward/all-rewards/${user_id}`);
    }
    getDefaultReward$() {
        return this.http.get(this.baseUrl + `/survey-reward/default-reward/`);
    }
    getUserSurveyReward(user_id: number) {
        return this.http.get(this.baseUrl + `/survey-reward/${user_id}`);
    }
    getAllUserAirtime(user_id: number) {
        return this.http.get(this.baseUrl + `/survey-reward/all-airtime/${user_id}`);
    }
    getAllUserMerchandize(user_id: number) {
        return this.http.get(this.baseUrl + `/survey-reward/all-merchandize/${user_id}`);
    }
    createReward(id: number, survey_reward: any) {
        return this.http.post(this.baseUrl + `/survey-reward/${id}`, survey_reward);
    }
    createMerchatReward(id: number, survey_reward: any) {
        return this.http.post(this.baseUrl + `/survey-reward/merchnt/${id}`, survey_reward);
    }
    updateMerchatReward(rewardId: number, rewardObjct: any) {
        return this.http.put(this.baseUrl + `/survey-reward/update-merchntreward/${rewardId}`, rewardObjct, {
            reportProgress: true,
            observe: 'events',
        });
    }
    updateAirtimeReward(rewardId: number, rewardObjct: any) {
        return this.http.put(this.baseUrl + `/survey-reward/update-reward/${rewardId}`, rewardObjct, {
            reportProgress: true,
            observe: 'events',
        });
    }
    updateProductReward(rewardId: number, productId: any) {
        return this.http.put(this.baseUrl + `/survey-reward/update-product/${rewardId}`, productId);
    }
    attach_reward(product: any, productId) {
        return this.http.post(this.baseUrl + `/survey-reward/attach-reward/${productId}`, product);
    }
    delete(id: number) {
        return this.http.delete(this.baseUrl + `/surveys/${id}`);
    }
    redeem_point(redeemData: any) {
        return this.http.post(this.baseUrl + `/survey-reward/redeem-point`, redeemData);
    }

    addLocation(locationData: any) {
        return this.http.post(this.baseUrl + `/survey-reward/location/add`, locationData);
    }


    // Antifake calls
    createCampaign(data: any){
        return this.http.post(this.baseUrl + "/campaigns", data);
      }

      initPayment(data: any){
        return this.http.post(this.baseUrl + `/transactions/init-payment`, data)
      }

      verifyPayment(data: any){
        return this.http.post(this.baseUrl + `/transactions/verify-payment`, data)
      }
}
