import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertService } from 'src/app/core/_services/alert.service';
import { SurveyService } from 'src/app/core/_services/survey.service';
import { first } from 'rxjs/operators';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { v4 as uuidv4 } from 'uuid';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/_services';

@Component({
  selector: 'app-attach-survey',
  templateUrl: './attach-survey.component.html',
  styleUrls: ['./attach-survey.component.css']
})
export class AttachSurveyComponent implements OnInit {
  currentUserSubscription: Subscription;
  @Output() assignRewards:EventEmitter<boolean> = new EventEmitter();
  @Output() emitSurveyAddedEvent:EventEmitter<any> = new EventEmitter();
  nextStep: boolean = false;
  options = [];

  surveyForm: FormGroup;
  questions: any = [];
  currentStep = 1;
  loading: boolean;
  currentUser: any;
  userSurveys: any;
  selectedSurveyId: any;


  constructor(
    private formBuilder: FormBuilder,
    private surveyService: SurveyService,
    private alertService: AlertService,
    private authenticationService: AuthenticationService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('User value', this.currentUser);
    });

    this.getAllSurvey()
  }

  ngOnInit(): void {
    this.questions.push(
      {
        content: "",
        questionType: "",
        choices: [
          {
            text: "",
            id: uuidv4()
          },
          {
            text: "",
            id: uuidv4()
          },

        ],
        id: uuidv4()
        }
      )
    this.surveyForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      hasSurvey: ['1', Validators.required],
    });
  }


  onSubmit() {
    // this.updateQuestion();
    let surveyObjct = {
      title: this.surveyForm.value.title,
      content: this.surveyForm.value.content,
      type: this.surveyForm.value.hasSurvey
    };
   let newQuestion = []
   this.questions.forEach((id,index)=>{
      let  currentQuestion = this.questions[index];
      let newChoices = currentQuestion.choices.map((item)=>{
        return {
          text: item.text
        }
      });
      let newCurrentQuestion = {
        content: currentQuestion.content,
        questionType: currentQuestion.questionType,
        choices: JSON.stringify(newChoices)
      }
      newQuestion.push(newCurrentQuestion)
    });
    console.log(newQuestion)
    console.log(surveyObjct)

    // console.log(this.surveyForm.value);
    this.surveyService.addSurvey({ survey: surveyObjct, question: newQuestion })
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          console.log("ok>>", data['data']);
          if (data['statusCode'] == 200) {
            this.nextStep = data['status'];
            this.assignRewards.emit(this.nextStep);
            this.emitSurveyAddedEvent.emit(data['data'].id);
          }
        },
        error => {
        });
  }

  selectSurvey(e){
    console.log(e)
    this.selectedSurveyId = e;
    this.nextStep = true;
    this.assignRewards.emit(this.nextStep);
     this.emitSurveyAddedEvent.emit(e);
  }

  proceedtoAddQuestion(){
    this.currentStep = 2;
  }

  getAllSurvey(){
    this.loading = true;
    this.surveyService.getAllUserSurveys(this.currentUser.id).subscribe((res: any)=>{
      console.log(res)
      this.loading = false;
      this.userSurveys = res.data.surveys;
    })
  }


  drop(event: CdkDragDrop<string[]>) {
    console.log(event)
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
  }

  addOptions(content){
    const currentQuestion = this.questions.find(item => item.id == content.id)

    if(currentQuestion){
      currentQuestion.choices.push({text: "", id: uuidv4() });
    }
  }

  removeOption(i){
    this.options.splice(i);
    console.log(i)
  }

  addQuestions(){
    this.questions.push({content: "", questionType: "", choices: [{text: "", id: uuidv4() },{text: "", id: uuidv4() }], id: uuidv4()})
    console.log(this.questions)
  }

  removeQuestion(i){
    this.questions.splice(i)
    console.log(i)
  }


}
