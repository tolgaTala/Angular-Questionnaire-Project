import {Component, Input, OnInit, Output} from '@angular/core';
import {DemoService} from './services/demo.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
//

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  questions: Question[];
  step = 0;
  errorMessage: string;
  nameRequried: string;
  checkboxAnswers: any = [
      {id: 0, cevap: 'Sağ Ayak', selected: false},
      {id: 1, cevap: 'Sol Ayak', selected: false},
      {id: 2, cevap: 'Her İkisinide', selected: false}];
  anketSonucu: Questionnaire = {
   key: 0, firstName: '', questionnaire: [{soru: 'Hangi takımı tutuyorsunuz ?', key: 1, cevap: [] , durum: true },
      { soru: 'Futbol oynarken hangi ayağınızı kullanıyorsunuz ?' , key: 2, cevap: [] , durum: false},
      { soru: 'Haftada kaç saat kitap okuyorsunuz ?', key: 3, cevap: [], durum: false},
      { soru: 'En sevdiğiniz filmin adı nedir ?' , key: 4, cevap: [], durum: false},
      { soru: 'Bildiğiniz bir hastalığınız var mı ?', key: 5, cevap: [], durum: false}], updateDate: Date().toString()
  };
  anketSonuclari: Questionnaire[] = [];

  questionForm: FormGroup;

  constructor(private demoService: DemoService,
              private formBuilder: FormBuilder) {
    this.questions = [
        {soru: 'Hangi takımı tutuyorsunuz ?', key: 1, cevap: [] , durum: false },
      { soru: 'Futbol oynarken hangi ayağınızı kullanıyorsunuz ?' , key: 2, cevap: [] , durum: false},
      { soru: 'Haftada kaç saat kitap okuyorsunuz ?', key: 3, cevap: [], durum: false},
      { soru: 'En sevdiğiniz filmin adı nedir ?' , key: 4, cevap: [], durum: false},
      { soru: 'Bildiğiniz bir hastalığınız var mı ?', key: 5, cevap: [], durum: false}];
  }

  ngOnInit(): void {
    this.createQuestionForm();
  }
  setStep(index: number) {
    this.step = index;
  }
  nextStepForFirstQuestion(){
    if (this.questionForm.value.firstName){
      this.questions[0].durum = true;
      this.nameRequried = '';
      this.step++;
    }else{
      this.nameRequried = 'İsminizi boş geçemezsiniz !';
    }
  }
  nextStep(quastion: Question, i: string) {
    if (this.validControl(i)){
      if (quastion.key === this.questions.length){
        this.prepareAnketSonucu();
        this.checkboxCheckedControl();
        const newQuestionnaire = this.newQuestionnaireObject();
        this.anketSonuclari.push(newQuestionnaire);
        this.anketSonucu.key++;
        this.step++;
        this.refreshQuestions();
        this.ngOnInit();
      }else{
        this.findNextQuestion(quastion);
        this.errorMessage = '';
        this.step++;
      }
    }
    else {
      this.errorMessage = 'Boş bırakamazsınız !';
    }
  }
  prevStep(question: Question) {
    if (question !== this.questions[0]){
      this.findPrevQuestion(question);
      this.step--;
    }
    else{
      this.step--;
    }
  }
  validControl(i: string){
    if (i !== 'cevap2'){
      const temp = this.questionForm.get(i).value;
      return temp;
    }else {
      return true;
    }
  }
  createQuestionForm(){
    this.questionForm = this.formBuilder.group({
      firstName: [''],
      cevap1: [''],
      cevap3: [''],
      cevap4: [''],
      cevap5: [''],
      chkbox1: false,
      chkbox2: false,
      chkbox3: false,
    });
  }
  prepareAnketSonucu(){
    const formData = this.questionForm.value;
    this.anketSonucu.firstName = formData.firstName;
    this.anketSonucu.updateDate = Date();
    this.anketSonucu.questionnaire[0].cevap = formData.cevap1;
    this.anketSonucu.questionnaire[1].cevap = this.questions[1].cevap;
    this.anketSonucu.questionnaire[2].cevap = formData.cevap3;
    this.anketSonucu.questionnaire[3].cevap = formData.cevap4;
    this.anketSonucu.questionnaire[4].cevap = formData.cevap5;
  }
  checkboxCheckedControl(){
    const formData = this.questionForm.value;
    if (formData.chkbox1){
      this.checkboxAnswers[0].selected = true;
      this.anketSonucu.questionnaire[1].cevap[0] = this.checkboxAnswers[0];
    }else{
      this.checkboxAnswers[0].selected = false;
      this.anketSonucu.questionnaire[1].cevap[0] = this.checkboxAnswers[0];
    }
    if (formData.chkbox2){
      this.checkboxAnswers[1].selected = true;
      this.anketSonucu.questionnaire[1].cevap[1] = this.checkboxAnswers[1];
    }else{
      this.checkboxAnswers[1].selected = false;
      this.anketSonucu.questionnaire[1].cevap[1] = this.checkboxAnswers[1];
    }
    if (formData.chkbox3){
      this.checkboxAnswers[2].selected = true;
      this.anketSonucu.questionnaire[1].cevap[2] = this.checkboxAnswers[2];
    }else{
      this.checkboxAnswers[2].selected = false;
      this.anketSonucu.questionnaire[1].cevap[2] = this.checkboxAnswers[2];
    }
  }
  newQuestionnaireObject(){
    const newQuestionnaire = new Questionnaire();
    newQuestionnaire.questionnaire = this.anketSonucu.questionnaire;
    newQuestionnaire.key = this.anketSonucu.key;
    newQuestionnaire.firstName = this.anketSonucu.firstName;
    newQuestionnaire.updateDate = this.anketSonucu.updateDate;
    return newQuestionnaire;
  }
  findNextQuestion(quastion: Question){
    for (let i = 0; i < this.questions.length; i++) {
      if (quastion === this.questions[i]){
        this.questions[i + 1].durum = true;
      }
    }
  }
  findPrevQuestion(quastion: Question){
    for (let i = 0; i < this.questions.length; i++) {
      if (quastion === this.questions[i]){
        this.questions[i].durum = false;
        this.questions[i - 1].durum = true;
      }
    }
  }
  refreshQuestions(){
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.questions.length; i++) {
      this.questions[i].durum = false;
    }
  }
}
export class Question{
  durum: boolean;
  soru: string;
  cevap: string[];
  key: number;
}
export class Questionnaire{
  key: number;
  firstName: string;
  updateDate: string;
  questionnaire: Question[];
}
