import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService, ProductService } from 'src/app/core/_services';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css']
})
export class TriviaComponent {
  createTrivia:boolean = false;
  currentStep = 1;
  surveyForm: FormGroup;
  surveyForm2: FormGroup;
  questions: any = [];
  loading2: boolean = false;
  loading: boolean = false;
  options = [];
  imageSrc: string;
  imageSrc2: string;
  lastImage: string | ArrayBuffer;
  lastImage2: string | ArrayBuffer;
  imageSelected: boolean = false;
  imageData: any;
  fetchingTrivias: boolean = false;
  trivias: any;
  showModal: boolean = false;
  selectedTrivia: any;
  triviaTitle: any;
  triviaType: any;
  triviaContent: any;
  selectedQuestions: any;
  edit: boolean = false;
  triviaQuestion: any;
  imageData2: any;
  questionEdit: any;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ){

  }

  ngOnInit(): void {
    this.fetchTrivias();
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
      photo: ['', Validators.required],
      content: ['', Validators.required],
      is_trivia: [true, Validators.required],
      title: ['', Validators.required],
      desc: ['', Validators.required],
      hasSurvey: ['1', Validators.required],
    });

    this.surveyForm2 = this.formBuilder.group({
      photo: ['', Validators.required]
    })
  }

  addTrivia(){
    const data = {

    }

    this.productService.addTrivia(data)
  }

  // removeOption(i: any){
  //   console.log('removed')
  //   const itemDelete = this.question.choices.indexOf(i);
  //   if(itemDelete !== -1){
  //     this.options.splice(itemDelete, 1);
  //   }
  // }


  removeOption(i){
    console.log(this.options)
    const toDelete = this.options.findIndex(item => item.id == i);
    console.log(toDelete)
    // if(toDelete !== -1){
    //   this.options.splice(toDelete,1);
    //   console.log(this.options)
    // }
  }

  addOptions(content){
    const currentQuestion = this.questions.find(item => item.id == content.id)

    if(currentQuestion){
      currentQuestion.choices.push({text: "", id: uuidv4() });
    }
  }
  addQuestions(){
    this.questions.push({content: "", questionType: "", choices: [{text: "", id: uuidv4() },{text: "", id: uuidv4() }], id: uuidv4()})
    console.log(this.questions)
  }

  removeQuestion(i){
    this.questions.splice(i)
    console.log(i)
  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.surveyForm.get('photo').setValue(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
          this.lastImage = reader.result;
          console.log(reader.result);
          const photodata = {
            "photo": this.lastImage
          }
          this.productService.upload(photodata).subscribe((res: any)=>{
            console.log(res)
            this.imageData = res.data
          })
          this.imageSelected = true;
      }
    }
  }

  onFileChange2(event){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.surveyForm2.get('photo').setValue(file);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc2 = reader.result as string;
          this.lastImage2 = reader.result;
          console.log(reader.result);
          const photodata = {
            "photo": this.lastImage2
          }
          this.loading2 = true;
          this.productService.upload(photodata).subscribe((res: any)=>{
            console.log(res)
            this.imageData2 = res.data;
            setTimeout(()=>{
              this.submitEdit()
            },1000)
          })
          // this.imageSelected = true;
      }
    }
  }

  submitEdit(){

    let surveyObjct = {
      title: this.selectedTrivia.title,
      content: this.selectedTrivia.content,
      type: this.selectedTrivia.type,
      photo: this.imageData2,
      trivia_points: this.selectedTrivia.trivia_points,
      is_trivia: this.selectedTrivia.is_trivia
    };

    const selectedQuestion = this.trivias.findIndex(item => item.slug === this.selectedTrivia.slug);
    this.questionEdit = this.trivias[selectedQuestion].question;


    const payload = {
      survey: surveyObjct,
      question: this.questionEdit
    }

    this.productService.updateTrivia(this.selectedTrivia.slug, payload).subscribe((res: any)=>{
      this.loading2 = false;
      if(res.statusCode == 200){
        console.log(res)
      }

    },(error)=>{
      this.loading2 = false;
    })

  }

  onSubmit(){
    this.loading = true;
    let surveyObjct = {
      title: this.surveyForm.value.title,
      content: this.surveyForm.value.desc,
      type: this.surveyForm.value.hasSurvey,
      photo: this.imageData,
      trivia_points: this.surveyForm.value.content,
      is_trivia: true
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
        answer: currentQuestion.answer,
        choices: JSON.stringify(newChoices)
      }
      newQuestion.push(newCurrentQuestion)
    });
    console.log(newQuestion)
    // console.log(triviaObjct)
    console.log(surveyObjct)

    this.productService.addTrivia({survey: surveyObjct ,question: newQuestion}).subscribe((res: any)=>{
      console.log(res);
      this.loading = false;
      if(res.statusCode == 200){
        this.createTrivia = false;
        this.fetchTrivias();
        this.alertService.showAlertNotification('Success!', res.message, 'success')
      }
    },(error)=>{
      this.loading = false;
      this.alertService.showAlertNotification('Oops', 'An error occured','error')
    })
  }

  fetchTrivias(){
    this.fetchingTrivias = true;
    this.productService.getTrivias().subscribe((res: any)=>{
      this.fetchingTrivias = false;
      console.log(res)
      if(res.statusCode == 200){
        this.trivias = res.data;
      }else{

      }
    },(error)=>{
      this.fetchingTrivias = false;
      console.log(error)
    })
  }

  viewTrivia(id){
    // const selectedTrivia = this.trivias.findIndex(item => item.id === id);
    // this.selectedTrivia = this.trivias[selectedTrivia];
    // this.showModal = true;
    const surveyIndex = this.trivias.findIndex(item => item.id == id);
    this.selectedTrivia = this.trivias[surveyIndex];
    this.triviaTitle = this.selectedTrivia.title;
    this.triviaType = this.selectedTrivia.type;
    this.triviaContent = this.selectedTrivia.content;
    this.triviaQuestion = this.selectedTrivia.question;
    console.log(this.selectedTrivia)
    // const selectedSurvey = this.trivias.filter(item => item.id == id);
    // console.log(selectedSurvey);
    setTimeout(()=>{
      let stringifiedQuestions = this.triviaQuestion.map(stringifiedQuestions => {
        stringifiedQuestions.choices = JSON.parse(stringifiedQuestions.choices);
        return stringifiedQuestions
      });
      this.selectedQuestions = stringifiedQuestions;
      console.log(stringifiedQuestions)
      this.showModal = true;
    }, 800)
  }
}
