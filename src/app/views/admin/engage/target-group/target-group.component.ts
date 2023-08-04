import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
  ValidatorFn
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-target-group',
  templateUrl: './target-group.component.html',
  styleUrls: ['./target-group.component.css']
})
export class TargetGroupComponent implements OnInit {
  stage = 1;
  contactsForm: FormGroup;
  color = 'light'
  contactsData = [
    {
      phone: '09415673402',
      age: '18 - 25',
      date_created: '11 mar 2020',
    },
    {
      phone: '09415622202',
      age: '18 - 25',
      date_created: '18 mar 2020',
    }
  ]
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      contacts: new FormArray([])
    });
  }

  submit(){
  
  }
  nextStage(){
    // this.stage++;
    this.router.navigate(["survey"]);
  }

  prevStage(){
    console.log('prev')
    this.stage--;
  }

 get contactsFormArray() {
   return this.contactsForm.controls.contacts as FormArray;
 }

 // private addCheckboxes() {
 //   this.ordersData.forEach(() => this.contactsFormArray.push(new FormControl(false)));
 // }
 get ordersFormArray() {
   return this.form.controls.contacts as FormArray;
 }

private addCheckboxes() {
 this.contactsData.forEach(() => this.ordersFormArray.push(new FormControl(false)));
}

selectAll(event){
 console.log(event.target.checked)
 console.log(event.target.checked)
 this.ordersFormArray.controls.forEach((currentValue, index) => {this.ordersFormArray.controls[index].setValue(event.target.checked);  });
}

goBack(){
  this.router.navigate(["engage/engage"]);
}
}
