import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AuthenticationService } from 'src/app/core/_services/authentication.service';
import { SurveyService } from 'src/app/core/_services/survey.service';
import { AlertService } from 'src/app/core/_services';

@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.css']
})
export class AddSurveyComponent implements OnInit {
  viewSurvey: boolean = true;
  addSurvey: boolean = false;
  options = [];
  questions = [];
  currentUser: any;
  userId: any;
  surveys: any;
  p: number = 1;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private surveyService: SurveyService,
    private alertService: AlertService
  ) {
    this.currentUser = this.authService.currentUser.subscribe((user) => {
      this.currentUser = user;
      console.log("User value", this.currentUser);
      this.userId = this.currentUser.id;
    });
  }

  ngOnInit(): void {
    this.getSurveys()
  }

  goHome(){
    this.router.navigate(['/MAS'])
  }
  goBack(){
    this.viewSurvey = true;
    this.addSurvey = false;
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event)
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
  }

  attachReward(){
    this.router.navigate(["traceability/attach-rewards"]);
  }


  addOptions(i){
    this.options.push({option: i})
    console.log(i)
  }

  removeOption(i){
    this.options.splice(i);
    console.log(i)
  }

  addQuestions(){
    this.questions.push({qustion: ""})
  }

  removeQuestion(i){
    this.questions.splice(i)
    console.log(i)
  }

  createSurvey(){
    this.viewSurvey = false;
    this.addSurvey = true;
  }

  getSurveys(){

    this.surveyService.getAllUserSurveys(this.userId).subscribe((res: any)=>{
      console.log(res)
      this.surveys = res.data.surveys;

    })

  }

  onSuccess(e){
    if(e === true){
      this.alertService.showAlertNotification('success','Survey added successfully!','success')
      this.viewSurvey = true;
      this.addSurvey = false;
    }else{
      this.alertService.showAlertNotification('error','An error occured','error')
    }

  }

}
