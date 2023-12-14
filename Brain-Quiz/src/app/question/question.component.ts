import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../service/questions.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {

  public name : string = "null";
  public questionList : any = [];
  public currentQuestion : number = 0 ;
  public point : number = 0;
  public correctAnswer : number = 0;
  public inCorrectAnswer : number = 0;
   interval$ : any ;
  counter = 60;

  constructor (private questionService : QuestionsService ) { }

   ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestions();
    this.startCounter();
   }
 
   getAllQuestions(){
    this.questionService.getQuestionJson().subscribe(res=>{
      this.questionList = res.questions
    })
   }
   nextQuestion(){
     this.currentQuestion++;
   }
   previousQuestion(){
    this.currentQuestion--;
   }
   answer(currentQuestion : any ,option : any){
     if(option.correct){
            this.point+= 10;
            this.correctAnswer++;
            this.currentQuestion++;
     }else{
      this.point-= 10;
      this.inCorrectAnswer++;
      this.currentQuestion++;
     }
   }
    startCounter(){
    this.interval$= interval(1000).subscribe(val=>{
      this.counter--;
      if(this.counter===0){
        this.currentQuestion++;
        this.counter=60;
        this.point-=10
      }
    });
    setTimeout(()=>{
      this.interval$.unsubscribe()
    }, 600000);

    }
    stopCounter(){
      this.interval$.unsubscribe();
      this.counter = 0;
    }
    resetCounter(){
          this.stopCounter();
          this.counter= 60;
          this.startCounter();
    }
  resetQuiz(){
        this.resetCounter();
        this.getAllQuestions();
        this.point= 0;
        this.counter=60;
        this.currentQuestion=0;
        
  }
}