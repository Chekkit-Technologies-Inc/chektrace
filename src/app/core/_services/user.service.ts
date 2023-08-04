import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
    baseUrl = environment.apiUrl + environment.basePath;
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(this.baseUrl + `/users`);
    }

    register(user: User) {
        return this.http.post(this.baseUrl + `/auth/signup`, user);
    }
    getUserRecordCount(id: number) {
        return this.http.get(this.baseUrl + `/users/${id}/count_all`);
    }
    getUserSubDetails(id: number) {
        return this.http.get(this.baseUrl + `/users/sub-details/${id}`);
    }
    delete(id: number) {
        return this.http.delete(this.baseUrl + `/users/${id}`);
    }
}