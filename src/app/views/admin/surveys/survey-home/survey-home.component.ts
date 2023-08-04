import { Component, OnInit } from '@angular/core';
import { AuthenticationService, SurveyService, SurveyRewardService, AlertService, ProductService } from '../../../../core/_services';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { User } from '../../../../core/_models';
import { UserService } from '../../../../core/_services/user.service';
import { Survey } from '../../../../core/_models/survey';
import { Survey_Question } from '../../../../core/_models/survey_quest';
import { UtilityProvider } from '../../../../core/_helpers/utility';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey-home',
  templateUrl: './survey-home.component.html',
  styleUrls: ['./survey-home.component.css']
})
export class SurveyHomeComponent implements OnInit {
  rewardType = '';
  color = "light";
  editing = {};
  rows = [];
  temp = [];
  success_msg: any;
  loadingIndicator = true;
  reorderable = true;
  closeResult: any;
  data: any;
  loading = false;
  submitted = false;
  save_survey: any;
  save_products: any;
  selectChange: any;
  currentUser: User;
  currentUserSubscription: Subscription;
  user_recordCounts: any;

  // index = 1;
  // subtitle: string;
  // destroyByClick = true;
  // duration = 5000;
  // hasIcon = true;
  // preventDuplicates = false;


  constructor(
    public utility: UtilityProvider, 
    private router: Router,
    private authenticationService: AuthenticationService, 
    private surveyService: SurveyService,
    private userService: UserService
    ) {

    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('User value', this.currentUser);
    });
    this.getAllSurvey();
    setTimeout(() => { this.loadingIndicator = false; }, 1500);
  }

  getAllSurvey() {
    this.authenticationService.allsurveys.subscribe(save_survey => {
      console.log(save_survey);
      console.log('printed Surveys up');
      if (save_survey) {
        this.save_survey = save_survey;
        this.surveyService.getAllUserSurveys(this.currentUser.id).pipe(first()).subscribe(data => {
          if (data['data'].surveys) {
            this.save_survey = data['data'].surveys;
            // localStorage.setItem('allsurveys', JSON.stringify(data['data'].surveys));
          }
        });
      } else {
        this.surveyService.getAllUserSurveys(this.currentUser.id).pipe(first()).subscribe(data => {
          console.log(data['data'].surveys);
          if (data['data'].surveys) {
            this.save_survey = data['data'].surveys;
            localStorage.setItem('allsurveys', JSON.stringify(data['data'].surveys));
          }
        });
      }
    });
  }
  ngOnInit() {

  }
 

  getSurveyQuestions(survey_data: Survey) {
    this.surveyService.getSurveyQuestions(survey_data.id).pipe(first()).subscribe(data => {
      console.log(data['data']);
      if (data['status']) {
        return data['data'];
      }
    });
  }

  gotoViewSurvey(surveyData: Survey) {

    console.log(surveyData)
    return false;
    this.router.navigate(['/dashboard/surveys/view-survey'], { queryParams: surveyData });
  }

  gotoEditSurvey(surveyData: Survey, questions: Survey_Question) {
    const data = JSON.stringify({
      survey: surveyData,
      question: questions,
    });

    this.router.navigate(['/dashboard/surveys/edit-survey'], { queryParams: { data }, skipLocationChange: false });

  }
  gotoDeleteSurvey(surveyData: Survey) {
    this.router.navigate(['/dashboard/surveys/edit-survey'], { queryParams: surveyData, skipLocationChange: true });

  }

  viewSurvey(id){
    console.log(id)
  }


  editSurvey(id){
    console.log(id)
  }

}
