import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  baseUrl = environment.apiUrl + environment.basePath;
  constructor(private http: HttpClient) {
  }
  verifySubscription(input: any, type: any) {
    return this.http.post(this.baseUrl + `/subscription/make-payment?type=${type}`, input);
  }
}
