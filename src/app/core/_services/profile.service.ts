import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import { environment } from '../../../environments/environment';
import { Profile } from '../_models/user';
/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable({ providedIn: 'root' })
export class ProfileServices {
  baseUrl = environment.apiUrl + environment.basePath;
  constructor(private http: HttpClient) { }

  getProfile(uname: any) {
    return this.http.get(this.baseUrl + `/profile/` + uname);
  }

  updateProfile(input: any) {
    return this.http.put(this.baseUrl + `/profile/`, input);
  }

  postProfilePhoto(input: Profile) {
    console.log("yes ooo", input);
    return this.http.post(this.baseUrl + `/profile/upload`, { photo: input });
  }
}