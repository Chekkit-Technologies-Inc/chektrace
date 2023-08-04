import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Survey } from '../_models';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class SurveyService {
    token: any;
    baseUrl = environment.apiUrl + environment.basePath;
    constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    }

    getAllUserSurveys(id: number) {
        return this.http.get(this.baseUrl + `/survey/all_surveys/${id}`);
    }
    getAllUserLoyaltyPoints(id: number) {
        return this.http.get(this.baseUrl + `/survey/all_loyaltypoints/${id}`);
    }
    getAllUserRaffle(id: number) {
        return this.http.get(this.baseUrl + `/survey/get-user-raffles/${id}`);
    }
    getRaffleDetails(id: number) {
        return this.http.get(this.baseUrl + `/survey/get-raffle-details/${id}`);
    }
    selectRaffleWinner(id: number) {
        return this.http.get(this.baseUrl + `/survey/select-raffle-winner/${id}`);
    }
    getAllRedemptionPoints(id: number) {
        return this.http.get(this.baseUrl + `/survey/all_redemptionpoints/${id}`);
    }
    addSurvey(surveydata: any) {
        return this.http.post(this.baseUrl + `/survey`, surveydata);
    }
    addLoyaltyPoint(loyaltyData: any) {
        return this.http.post(this.baseUrl + `/survey/create-loyalty-point`, loyaltyData);
    }
    addRaffleDraw(raffleData: any) {
        return this.http.post(this.baseUrl + `/survey/create-raffle-draw`, raffleData);
    }

    getSurveyRewards(id: number){
      return this.http.get(this.baseUrl + `/survey-reward/survey-reward/${id}`);
    }

    deleteRaffle(id: number) {
        return this.http.delete(this.baseUrl + `/survey/delete-raffle/${id}`);
    }

    uploadGiftImage(imageData: any) {
        return this.http.post(this.baseUrl + `/survey/upload-gift-image`, imageData);
    }
    updateSurvey(surveyId: number, surveydata: any) {
        return this.http.put(this.baseUrl + `/survey/${surveyId}`, surveydata);
    }

    updateSurveyQuestion(slug: any, data){
      return this.http.put(this.baseUrl + `/survey/update-survey/${slug}`, data);
    }
    updateLoyalty(slug: number, loyaltyData: any) {
        return this.http.put(this.baseUrl + `/survey/update-loyalty-point/${slug}`, loyaltyData);
    }
    updateProductSurvey(surveyId: number, productId: any) {
        console.log(surveyId);
        console.log(productId);
        return this.http.put(this.baseUrl + `/survey/update-product/${surveyId}`, productId);
    }
    updateProductSurvey2(surveyId: number, productId: any) {
        console.log(surveyId);
        console.log(productId);
        return this.http.put(this.baseUrl + `/survey/update-product-survey/${surveyId}`, productId);
    }
    getSurveyQuestions(id: number) {
        return this.http.get(this.baseUrl + `/surveyquestion/get-surveyquestions/${id}`);
    }
    getSurveyQuestionsWithResponses(id: number) {
        return this.http.get(this.baseUrl + `/surveyquestion/get-survey-questions-with-response/${id}`);
    }
    getLabelSurveyQuestionsWithResponses(id: number) {
        return this.http.get(this.baseUrl + `/surveyquestion/get-label-survey-questions-with-response/${id}`);
    }
    delete(id: number) {
        return this.http.delete(this.baseUrl + `/survey/${id}`);
    }

    getCounts(userId: any){
      return this.http.get(this.baseUrl + `/users/${userId}/count_all`)
    }

}
