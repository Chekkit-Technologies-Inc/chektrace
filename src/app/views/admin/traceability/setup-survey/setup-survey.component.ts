import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-setup-survey',
  templateUrl: './setup-survey.component.html',
  styleUrls: ['./setup-survey.component.css']
})
export class SetupSurveyComponent implements OnInit {
  

  options = [];
  questions = [];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goBack(){
    this.router.navigate(["dashboard/engage"]);
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

}
