import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class RestService {
  baseUrl = environment.apiUrl + environment.basePath;
  constructor(
      private http: HttpClient
    ) {
  }


  getDailyDials(type='dails', start, end)  {
    return this.http.get(this.baseUrl + `/voice-call/leads/dashboard/graph?from=${start}&to=${end}&type=${type}`);
  }

  addStatus(data) {
    return this.http.put(this.baseUrl + `/voice-call/rewards/winners/status`, data);
  }

  getSignUps()  {
    return this.http.get(this.baseUrl + `/voice-call/all-contacts/`);
  }

  getPlans() {
    return this.http.get(this.baseUrl + `/plans`);
  }
  getPlan(id) {
    return this.http.get(this.baseUrl + `/plans/${id}`);
  }

  getSmsBalance() {
    return this.http.get(this.baseUrl + `/retargeting-contacts/report/`);
  }

  get3DigitCode() {
    return this.http.get(this.baseUrl + `/retargeting-contacts/generate-code/`);
  }
  getShortCodes() {
    return this.http.get(this.baseUrl + `/retargeting-contacts/survey-short-code/`);
  }

  getRetargetingContacts() {
    return this.http.get(this.baseUrl + `/retargeting-contacts/`);
  }

	sendRetargetMessage(input) {
    return this.http.post(this.baseUrl + `/retargeting-contacts/groups/message`, input);
  }


	requestUssdSurveyAttachment(input) {
    return this.http.post(this.baseUrl + `/retargeting-contacts/survey-short-code`, input);
  }


	selectPlan(input) {
    return this.http.post(this.baseUrl + `/users/subscription`, input);
  }


  getVoiceCallLeads() {
    return this.http.get(this.baseUrl + `/voice-call/leads/dashboard`);
  }

  getGifts() {
    return this.http.get(this.baseUrl + `/voice-call/rewards/winners`);
  }

  getWinners() {
    return this.http.get(this.baseUrl + `/voice-call/rewards`);
  }

  getDistribution() {
    return this.http.get(this.baseUrl + `/voice-call/leads/distribution`);
  }

  addRewards(input) {
    return this.http.post(this.baseUrl + `/voice-call/rewards`, input);
  }

	sendSMSAlert(input) {
    return this.http.post(this.baseUrl + `/ussd-response/send-alert`, input)
  }

  getUserInsightCampaigns$(id) {
    return this.http.get(this.baseUrl + `/insight/${id}`);
  }


  getInsightsStats$(campaignId, start, end)  {
    return this.http.get(this.baseUrl + `/insight/participants/graph?startDate=${start}&endDate=${end}&campaignId=${campaignId}`);
  }


  getUserInsightRewardWinners$(id) {
    return this.http.get(this.baseUrl + `/insight/campaign/reward-total/${id}`);
  }
  getRaffleParticipantsStats$(id) {
    return this.http.get(this.baseUrl + `/survey/raffle-entries/${id}`);
  }

  getRewardGivenTotal$(id) {
    return this.http.get(this.baseUrl + `/survey-reward/total-reward-given/${id}`);
  }

  getAirtimeRewardStats$(id) {
    return this.http.get(this.baseUrl + `/survey-reward/winners/${id}`);
  }
  // /api/v2/survey-reward/winners/{rewardId}
  getTotalRewardGiven$(id) {
    return this.http.get(this.baseUrl + `/survey-reward/total-reward-given/${id}`);
  }
  getAllCampaignParticipants$(id) {
    return this.http.get(this.baseUrl + `/insight/all-participants/${id}`);
  }

	uploadAudio(input) {
    console.log(input)
    return this.http.post(this.baseUrl + `/insight/audio-upload`, input)
  }

	createQrCampaign(input) {
    console.log(input)
    return this.http.post(this.baseUrl + `/insight/qrcode-survey`, input)
  }

	submitCallForm$(input) {
    input.fields = JSON.stringify(input.fields)
    // console.log(input)
    return this.http.post(this.baseUrl + `/insight/phone-survey`, input)
  }
	submitVoiceOverForm$(input) {
    // input.fields = JSON.stringify(input.fields)
    // console.log(input)
    return this.http.post(this.baseUrl + `/insight/voice-over-request`, input)
  }

  verifySubscription(input: any, type: any) {
    return this.http.post(this.baseUrl + `/subscription/make-payment?type=${type}`, input);
  }

  uploadSenderIdScans(input: any) {
    let data= {uploads:{}}
    data.uploads = input;
    return this.http.post(this.baseUrl + `/retargeting-contacts/sender-id/uploads`, data);
  }

  uploadRetargetList(input: any) {
    return this.http.post(this.baseUrl + `/retargeting-contacts`, input);
  }

  createRetargetGroup(input: any) {
    return this.http.post(this.baseUrl + `/retargeting-contacts/groups`, input);
  }

  getUser(){
    return this.http.get(this.baseUrl + `/users/comapany/staff`);
  }

  updateStaff(id: any, data: any){
    return this.http.put(this.baseUrl + `/users/staff/${id}`, data)
  }

  addNewStaff(data: any){
    return this.http.post(this.baseUrl + `/users/add-staff`, data)
  }

  deleteStaff(id: any){
    return this.http.delete(this.baseUrl + `/users/staff/${id}`)
  }
}
