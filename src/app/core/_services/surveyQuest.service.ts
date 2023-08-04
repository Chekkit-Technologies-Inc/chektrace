import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Survey_Question } from '../_models';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class SurveyQuestService {
    token: any;
    baseUrl = environment.apiUrl + environment.basePath;
    constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
    }

    getAllSUrveyQuestion() {
        return this.http.get(this.baseUrl + `/surveyquestion/surveyquestions`);
    }
    getUserSUrveyQuestion(userId: number) {
        return this.http.get(this.baseUrl + `/surveyquestion/all-userquestions/${userId}`);
    }
    CreateRedemptionPoint(redemptData: any) {
        return this.http.post(this.baseUrl + `/surveyquestion`, redemptData);
    }
    CreateQuestion(survey_id, survey_quest: any) {
        return this.http.post(this.baseUrl + `/surveyquestion/${survey_id}`, survey_quest);
    }

    delete(id: number) {
        return this.http.delete(this.baseUrl + `/surveyquestion/${id}`);
    }
}