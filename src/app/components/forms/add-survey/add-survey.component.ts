import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { noWhitespaceValidator } from '../../../core/_helpers/whitespace-validator';
import { SurveyService } from '../../../core/_services/survey.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../../../core/_services/alert.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core/_services/authentication.service';
import { Subscription } from 'rxjs';
import { User } from '../../../core/_models';
import { RestService } from '../../../core/_services/rest.service';
// import { ToastService } from '../../../_services/toast.service';

import { Output, EventEmitter,Input } from '@angular/core';

@Component({
  selector: 'add-survey-form',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.css']
})
export class AddSurveyComponent implements OnInit {
  surveyForm: FormGroup;
  editForm: FormGroup;
  surveyQuestForm: FormGroup;
  questions: any = [];
  options: string[] = [null, null];
  loading = false;
  currentUserSubscription: Subscription;
  submitted = false;
  qust_num = 1;
  success_msg: any;
  currentUser: User;
  short_codes: any;
  currentMode = 'creating';
  stage = 1;

  editQuestionOptions = [];
  editIndex: any;
  
  @Output() surveyAddedEvent = new EventEmitter<string>();

  constructor(
    private formBuilder: FormBuilder, 
    private surveyService: SurveyService,
    private alertService: AlertService, 
    private _rest: RestService,  
    private router: Router, 
    private authenticationService: AuthenticationService
  ) { 
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user.user;
      console.log('User value', this.currentUser);
    });

  }


  ngOnInit() {
    // this.generateSurveyUssdModal(75);
    this.surveyForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      hasSurvey: ['1', Validators.required],
      question: [null, [Validators.required, Validators.maxLength(200), noWhitespaceValidator]],
      choice1: [null, [Validators.required, Validators.maxLength(200), noWhitespaceValidator]],
      choice2: [null, [Validators.required, Validators.maxLength(200), noWhitespaceValidator]],
      // choice3: [null, [ Validators.maxLength(200), noWhitespaceValidator]],
      // choice4: [null, [ Validators.maxLength(200), noWhitespaceValidator]],
    });

    this.editForm = this.formBuilder.group({
      question: [null, [Validators.required, Validators.maxLength(200), noWhitespaceValidator]],
      choice1: [null, [Validators.required, Validators.maxLength(200), noWhitespaceValidator]],
      choice2: [null, [Validators.required, Validators.maxLength(200), noWhitespaceValidator]],
      choice3: [null, [Validators.maxLength(200), noWhitespaceValidator]],
      choice4: [null, [Validators.maxLength(200), noWhitespaceValidator]],
    });
  }

  returnArray(str){
    return JSON.parse(str)
  }

  resetForm() {
    this.surveyForm.setValue({
      title: '',
      content: '',
      hasSurvey: '',
      question: '',
      choice1: '',
      choice2: '',
      choice3: '',
      choice4: '',
    });
  }

  addMoreQuestion() {
    this.submitted = true;

    if(this.surveyForm.invalid){
      // alert('Please')
      // return false;
    }
    this.updateQuestion();
    const formData = this.surveyForm.value;
    console.log('this is the question', this.questions);

    this.decreaseOptions();
    this.surveyForm.setValue({
      title: formData.title,
      content: formData.content,
      hasSurvey: formData.hasSurvey,
      question: '',
      choice1: '',
      choice2: '',
      // choice3: '',
      // choice4: '',
    });
    this.submitted = false;
    this.qust_num += 1;
  }

  editQuestion(q, i){
    this.currentMode = 'editing';
    this.editIndex = i;

    this.editQuestionOptions = this.returnArray(q.choices);

    console.log(this.editQuestionOptions )

    this.editForm.setValue({
      question: q.content,
      choice1: this.editQuestionOptions[0].text,
      choice2: this.editQuestionOptions[1].text,
      choice3: this.editQuestionOptions[2]?this.editQuestionOptions[2].text:'',
      choice4: this.editQuestionOptions[3]?this.editQuestionOptions[3].text:'',
    });

  }
  updateQuestion() {
    const formData = this.surveyForm.value;
    const choices: Array<{ text: string }> = [];
    for (let index = 0; index < this.options.length; index++) {
      choices.push({ text: formData[`choice${index + 1}`] });
    }
    const questObject = {
      content: formData.question,
      choices: JSON.stringify(choices)
    };
    this.questions.push(questObject);
  }

  saveQuestionChanges(){
    console.log(this.editForm.value)
    const formData = this.editForm.value;
    const choices: Array<{ text: string }> = [];
    for (let index = 0; index < this.editQuestionOptions.length; index++) {
      choices.push({ text: formData[`choice${index + 1}`] });
    }

    const questObject = {
      content: formData.question,
      choices: JSON.stringify(choices)
    };
    this.questions[this.editIndex] = questObject;


    this.editForm.setValue({
      question: '',
      choice1: '',
      choice2: '',
      choice3: '',
      choice4: '',
    });
    this.currentMode = 'creating';
  }

  increaseOptions() {
    console.log(`${this.options.length}`);
    if (this.options.length < 4) {
      this.options.push(null);
      this.surveyForm.registerControl(`choice${this.options.length}`,
        new FormControl(null, [Validators.maxLength(20), noWhitespaceValidator]));
    }
  }
  increaseEditOptions() {
    console.log(`${this.editQuestionOptions.length}`);
    if (this.editQuestionOptions.length < 4) {
      this.editQuestionOptions.push(null);
      this.editForm.registerControl(`choice${this.editQuestionOptions.length}`,
        new FormControl(null, [Validators.maxLength(20), noWhitespaceValidator]));
    }
  }
  get f() { return this.surveyForm.controls; }
  get g() { return this.editForm.controls; }
  
  decreaseOptions() {
    if (this.options.length == 4) {
      console.log(`choice${this.options.length}`);
      this.surveyForm.removeControl(`choice${this.options.length}`);
      this.options.pop();

    }
    if (this.options.length == 3) {
      console.log(`choice${this.options.length}`);
      this.surveyForm.removeControl(`choice${this.options.length}`);
      this.options.pop();

    }
  }
  decreaseEditOptions() {
    if (this.editQuestionOptions.length == 4) {
      console.log(`choice${this.editQuestionOptions.length}`);
      this.editForm.removeControl(`choice${this.editQuestionOptions.length}`);
      this.editQuestionOptions.pop();

    }
    if (this.editQuestionOptions.length == 3) {
      console.log(`choice${this.editQuestionOptions.length}`);
      this.editForm.removeControl(`choice${this.editQuestionOptions.length}`);
      this.editQuestionOptions.pop();

    }
  }
  createSurvey() {
    this.onSubmit();
  }
  
  onSubmit() {    
    this.submitted = true;

    if (this.surveyForm.invalid) {
      return false;
    }
    this.updateQuestion();
    let surveyObjct = {
      title: this.surveyForm.value.title,
      content: this.surveyForm.value.content,
      type: this.surveyForm.value.hasSurvey
    };
    this.loading = true;
    console.log(this.surveyForm.value);
    this.surveyService.addSurvey({ survey: surveyObjct, question: this.questions })
      .pipe(first())
      .subscribe(
        data => {
          this.loading = false;
          // this.resetForm();
          console.log("ok>>", data['data']);
          if (data['status']) {
            // this.utilitiesService.showSuccessToast("Survey added successfully.");

            let env = this;
            setTimeout(function(){

            }, 1000)
          }
          else {
            this.success_msg = data['message'];
          }
        },
        error => {
          this.alertService.showAlertNotification('warning!','Error processing request, please contact support', 'warning');
          this.loading = false;
        });
  }
  
}
