import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-readability',
  templateUrl: './readability.component.html',
  styleUrls: ['./readability.component.scss']
})
export class ReadabilityComponent implements OnInit {
  gradeLevel: string | undefined;

  constructor() { }

  ngOnInit() {
  }

  public autoGrow(): void {
    let textArea = this.inputText.nativeElement;
    if (textArea.scrollHeight > 250) {
      textArea.style.height = 'auto';
      textArea.style.height = textArea.scrollHeight - 60 + 'px';
    }
  }

  @ViewChild('inputText', { read: ElementRef }) inputText: ElementRef;

  getGrade(text: string) {

    let avgLetters = (this.numLetters(text) * 100) / this.numWords(text);
    let avgSentences = (this.numSentences(text) * 100) / this.numWords(text);

    let indexGrade = 0.0588 * avgLetters - 0.296 * avgSentences - 15.8;

    console.log(indexGrade);

    switch (true) {
      case (indexGrade >= 16):
        this.gradeLevel = 'Grade 16+';
        break;
      case (indexGrade > 0 && indexGrade < 1):
        this.gradeLevel = 'Before Grade 1';
        break;
      case (indexGrade < 0):
        this.gradeLevel = '';
        break;
      default:
        this.gradeLevel = 'Grade ' + Math.round(indexGrade);
    }

  }


  numLetters(text: string) {

    let i: number, num = 0;

    for (i = 0; text[i] != null; i++) {
      if (('a' <= text[i] && text[i] <= 'z')
        || ('A' <= text[i] && text[i] <= 'Z')) {
        num = num + 1;
      }
    }

    return num;
  }


  numWords(text: string) {
    let i: number, num = 1;

    for (i = 0; text[i] != null; i++) {
      if (text[i] == ' ') {
        num = num + 1;
      }
    }

    return num;

  }



  numSentences(text: string) {
    let i: number, num = 0;

    for (i = 0; text[i] != null; i++) {
      if (['.', '!', '?'].indexOf(text[i]) >= 0) {
        num = num + 1;
      }
    }
    return num;

  }



}
