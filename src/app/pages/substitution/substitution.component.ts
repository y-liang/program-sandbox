import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-substitution',
  templateUrl: './substitution.component.html',
  styleUrls: ['./substitution.component.scss']
})
export class SubstitutionComponent implements OnInit {
  outputText: string | undefined;
  ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

  substitutionTypes = ['numeric', 'alphabetical'];
  translationTypes = ['encrypt', 'decipher'];
  key: string | undefined;
  text: string | undefined;

  mainForm: FormGroup | undefined;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.mainForm = this.formBuilder.group({
      subTypeFC: [this.substitutionTypes[0]],
      traTypeFC: [this.translationTypes[0]],
      keyFC: ['', Validators.required],
      inputTextFC: ['', Validators.required],
    }, { validators: keyValidator });
  }

  // make form controls available in template
  get subTypeFC() { return this.mainForm?.get('subTypeFC'); }
  get traTypeFC() { return this.mainForm?.get('traTypeFC'); }
  get keyFC() { return this.mainForm?.get('keyFC'); }
  get inputTextFC() { return this.mainForm?.get('inputTextFC'); }


  computeNow(key: string, text: string) {

    let substitutionType = this.subTypeFC?.value;
    let translationType = this.traTypeFC?.value;

    switch (substitutionType) {
      case 'numeric':
        this.numberSubstitute(translationType, key, text);
        break;
      case 'alphabetical':
        this.alphabetSubstitute(translationType, key, text);
        break;
    }

  }

  numberSubstitute(type: string, numKey: string, text: string) {

    let outputTextArray = []; // has to be here, otherwise undefined
    let i: number;

    for (i = 0; i < text.length; i++) {
      let letterCode = text.charCodeAt(i);

      // if (text[i] >= 'a' && text[i] <= 'z' || text[i] >= 'A' && text[i] <= 'Z') {
      if (/^[A-Za-z]*$/.test(text[i])) {
        outputTextArray.push(String.fromCharCode(
          type == 'encrypt' ?
            (letterCode + (parseInt(numKey) % 26)) // encrypt the text
            : (letterCode - (parseInt(numKey) % 26)))); // decipher the text
      }

    }

    this.outputText = outputTextArray.join('');
  }

  generateKey() {
    console.log(this.key);
    this.key = this.shuffle(this.ALPHABET.split('')).join('');
    // for ( let i = 0; i < length; i++ ) {
    //   console.log('yea')
    //   console.log(this.ALPHABET.charAt(Math.floor(Math.random() * this.ALPHABET.length)));
    // }
    console.log(this.key);
    this.keyFC?.setValue(this.key);
  }

  shuffle(array: string[]) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  resetOutput() {
    this.outputText = '';
  }


  alphabetSubstitute(type: string, alphKey: string, text: string) {
    let inputTextArray = text.split('');
    let outputTextArray = [];

    if (type == 'encrypt') {
      outputTextArray = inputTextArray.map(
        item => {
          if (item >= 'a' && item <= 'z') {
            return item = alphKey[this.ALPHABET.indexOf(item)];
          } else if (item >= 'A' && item <= 'Z') {
            return item = alphKey[this.ALPHABET.indexOf(item.toLowerCase())].toUpperCase(); // .toUpperCase() Cannot read property 'toUpperCase' of undefined - because no return
          } else {
            return item;
          }
        }
      );
    } else {
      // decipher
      outputTextArray = inputTextArray.map(
        item => {
          if (item >= 'a' && item <= 'z') {
            return item = this.ALPHABET[alphKey.indexOf(item)];
          } else if (item >= 'A' && item <= 'Z') {
            return item = this.ALPHABET[alphKey.indexOf(item.toLowerCase())].toUpperCase();
          } else {
            return item;
          }
        }
      );
    }

    this.outputText = outputTextArray.join('');
  }
}

// it takes an Angular control object as an argument and 
// returns either null if the form is valid, or ValidationErrors otherwise

// function keyValidator, type ValidatorFn
// argument formGroup, type FormGroup
// return type ValidationErrors or null

const keyValidator: ValidatorFn | any = (formGroup: FormGroup): ValidationErrors | any => {
  const subTypeFC = formGroup.get('subTypeFC');
  const keyFC = formGroup.get('keyFC');


  switch (subTypeFC?.value) {

    case 'numeric':
      return /^[0-9]*$/.test(keyFC?.value) ? null : { 'invalidNumKey': true };

    case 'alphabetical':

      let isUnique = (item: string, index: number, array: any) => {
        return array.indexOf(item) == array.lastIndexOf(item);
      };

      return /^[A-Za-z]*$/.test(keyFC?.value)
        && (keyFC?.value ? keyFC?.value.length == 26 : true)
        && (keyFC?.value ? keyFC?.value.split('').every(isUnique) : true)
        ? null : { 'invalidAlphKey': true };
  }
};
