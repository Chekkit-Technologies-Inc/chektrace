import { Survey_Question } from './../../../../core/_models/survey_quest';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/_services/authentication.service';
import { SurveyService } from 'src/app/core/_services/survey.service';
import { User } from 'src/app/core/_models';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/core/_services/navbar.service';
import { SurveyQuestService } from 'src/app/core/_services/surveyQuest.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css']
})
export class SurveysComponent implements OnInit {
  currentUserSubscription: Subscription;
  currentUser: User;
  availableRewards: any;
  userSurveys: any;
  p: number = 1;
  loading: boolean = false;
  currentPage = 1;
  setupSurvey: any;
  showModal: boolean = false;
  showEditModal: boolean = false;
  isLoading: boolean = false;
  edit: boolean = false;
  selectedSurvey: any;
  questions: any;
  selectedQuestions: any[];
  newQuestion: any;
  newChoices: any;
  surveySelected: any;
  surveyTitle: any;
  surveyType: any;
  curveyContent: any;
  surveyContent: any;
  selectedQuestionEdit: any;
  questionSlug: any;
  surveySlug: any;
  isAddNew: boolean = false;
  isEditLoadiing: boolean = false;
  newQuest: any;
  option: any;
  options: any = [];
  // stringifiedQuestions: any;

  constructor(
    private surveyService: SurveyService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private navService: NavbarService,
    private surveyQuestions: SurveyQuestService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('User value', this.currentUser);
    });

    this.getAllSurvey();
    this.navService.show();
    this.getAllSurveyQuestions();
   }

  ngOnInit(): void {

  }

  getAllSurvey(){
    this.loading = true;
    this.surveyService.getAllUserSurveys(this.currentUser.id).subscribe((res: any)=>{
      console.log(res)
      this.loading = false;
      this.userSurveys = res.data.surveys;
    })
  }

  extractChoiceFromJson(obj){
    obj = JSON.parse(obj);
    return obj.text;
  }
  goHome(){
    this.router.navigate(['/MAS'])
  }

  deleteSurvey(e){
    this.isLoading = true;
    this.surveyService.delete(e).subscribe((res: any)=>{
      console.log(res);
      if(res.statusCode == 200){
        this.getAllSurvey();
        this.showModal = !this.showModal;
        this.isLoading = false;
      }
    })
  }

  confirm(id){
    const selectedSurvey = this.userSurveys.findIndex(item => item.id == id);
    this.selectedSurvey = this.userSurveys[selectedSurvey];
    // console.log(this.selectedProduct)
    this.showModal = true;
  }

  viewSurvey(id){
    console.log(id)
    const surveyIndex = this.userSurveys.findIndex(item => item.id == id);
    this.surveySelected = this.userSurveys[surveyIndex];
    this.surveyTitle = this.surveySelected.title;
    this.surveyType = this.surveySelected.type;
    this.surveyContent = this.surveySelected.content;
    this.surveySlug = this.surveySelected.slug;
    console.log(this.surveySelected)
    const selectedSurvey = this.questions.filter(item => item.surveyId == id);
    console.log(selectedSurvey);
    setTimeout(()=>{
      let stringifiedQuestions = selectedSurvey.map(stringifiedQuestions => {
        stringifiedQuestions.choices = JSON.parse(stringifiedQuestions.choices);
        return stringifiedQuestions
      });
      this.selectedQuestions = stringifiedQuestions;
      console.log(stringifiedQuestions)
      this.showEditModal = true;
    }, 800)
  }

  editSurvey(slug: any){
    this.edit = true;
    console.log(slug)
    this.questionSlug = slug;
    const questionEdit = this.questions.findIndex(item => item.slug == slug);
    this.selectedQuestionEdit = this.questions[questionEdit];
    let quest = this.questions[questionEdit].choices;
  }


  SubmitEdit(){
    this.isEditLoadiing = true;
    let surveyObjct = {
      title: this.surveyTitle,
      content: this.surveyContent,
      type: this.surveyType
    };

    let question = [{
      content: this.selectedQuestionEdit.content,
      questionType: this.selectedQuestionEdit.questionType,
      choices: JSON.stringify(this.selectedQuestionEdit.choices),
      id: this.selectedQuestionEdit.id
    }]

    const body = {
      survey: surveyObjct,
      question: question
    }
    this.surveyService.updateSurveyQuestion(this.surveySlug, body).subscribe((res: any)=>{
      this.isEditLoadiing = false;
      console.log(res);
      if(res.statusCode == 200){
        this.edit = !this.edit;
        this.showEditModal = !this.showEditModal;
        this.getAllSurvey();
        this.getAllSurveyQuestions();
        // window.location.reload()
      }
    })

  }


  addNew(){
    this.isEditLoadiing = true;
    let surveyObjct = {
      title: this.surveyTitle,
      content: this.surveyContent,
      type: this.surveyType
    };

    let question = [{
      content: this.newQuest,
      questionType: this.surveyType,
      choices: JSON.stringify(this.options),
    }]

    const body = {
      survey: surveyObjct,
      question: question
    }
    console.log(body)
    this.surveyService.updateSurveyQuestion(this.surveySlug, body).subscribe((res: any)=>{
      this.isEditLoadiing = false;
      console.log(res);
      if(res.statusCode == 200){
        this.surveyTitle = '';
        this.surveyType = '';
        this.options = [];
        this.newQuest = '';
        this.surveyContent = '';
        this.edit = !this.edit;
        this.showEditModal = !this.showEditModal;
        this.getAllSurvey();
      }
    })
  }

  addOption(){
    this.options.push(this.option);
    console.log(this.options)
    this.option = '';
  }



  assignReward(e){
    this.setupSurvey = e;
    if(this.setupSurvey == true){
      this.currentPage = 1
      window.location.reload()
    }
  }

  getAllSurveyQuestions(){


    this.surveyQuestions.getUserSUrveyQuestion(this.currentUser.id).subscribe((res: any)=>{
      this.questions = res.data;
      console.log(this.questions)
    })
  }

}
