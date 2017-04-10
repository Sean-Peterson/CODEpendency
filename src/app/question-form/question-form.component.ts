import { Component, OnInit } from '@angular/core';

import { Answer } from './../answer.model';
import { Question } from './../question.model';
import { QuestionService } from './../question.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css'],
  providers: [ QuestionService ]
})
export class QuestionFormComponent implements OnInit {
  question: Question;
  answered: boolean = false;

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.question = new Question("", "Author", "Deck Name", [], []);
  }

  appendTag(tagToAppend: string) {
    if (!this.question.tags.includes(tagToAppend)) {
      this.question.tags.push(tagToAppend);
    }
  }

  removeTag(tagToRemove: string) {
    this.question.tags.forEach(tag => {
      if (tag === tagToRemove) {
        let index = this.question.tags.indexOf(tag);
        this.question.tags.splice(index, 1);
      }
    });
  }

  appendAnswer(answerText: string) {
    let repeat = false;
    this.question.answers.forEach(answer => {
      if (answer.text === answerText) {
        repeat = true;
      }
    });

    if (!repeat) {
      let newAnswer = new Answer(answerText, false);
      this.question.answers.push(newAnswer);
    }
  }

  removeAnswer(answerToRemove: Answer) {
    this.question.answers.forEach(answer => {
      if (answer === answerToRemove) {
        if (answer.correct === true) {
          this.answered = false;
        }
        let index = this.question.answers.indexOf(answer);
        this.question.answers.splice(index, 1);
      }
    });
  }

  selectAnswer(answerToSelect: Answer) {
    this.answered = true;
    this.question.answers.forEach(answer => {
      if (answer === answerToSelect) {
        answer.correct = true;
      } else {
        answer.correct = false;
      }
    });
  }

  submitForm(question: Question) {
    this.questionService.saveQuestion(question);
    this.question = new Question("", "Author", "Deck Name", [], []);
  }

}
