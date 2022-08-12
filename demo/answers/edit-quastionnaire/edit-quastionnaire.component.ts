import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Questionnaire} from '../../demo.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-quastionnaire',
  templateUrl: './edit-quastionnaire.component.html',
  styleUrls: ['./edit-quastionnaire.component.scss']
})
export class EditQuastionnaireComponent implements OnInit {
  @Input() questionnaire;
  @Output() msgevent = new EventEmitter<Questionnaire>();
  checkboxAnswers: any = [
    {id: 0, cevap: 'Sağ Ayak', selected: false},
    {id: 1, cevap: 'Sol Ayak', selected: false},
    {id: 2, cevap: 'Her İkisinide', selected: false}];
  editedQuestionnaire: FormGroup;
  constructor(public modal: NgbActiveModal,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup(){
    this.editedQuestionnaire = this.formBuilder.group({
      firstName: [this.questionnaire.firstName, Validators.compose([Validators.required])],
      cevap1: [this.questionnaire.questionnaire[0].cevap],
      chkbox1: this.questionnaire.questionnaire[1].cevap[0].selected,
      chkbox2: this.questionnaire.questionnaire[1].cevap[1].selected,
      chkbox3: this.questionnaire.questionnaire[1].cevap[2].selected,
      cevap3: [this.questionnaire.questionnaire[2].cevap],
      cevap4: [this.questionnaire.questionnaire[3].cevap],
      cevap5: [this.questionnaire.questionnaire[4].cevap],
    });
  }
  save(){
    this.prepareQuestionnaire();
    this.checkboxCheckedControl();
    this.msgevent.emit(this.questionnaire);
    this.modal.dismiss();
    this.ngOnInit();
  }

  private prepareQuestionnaire() {
    const formData = this.editedQuestionnaire.value;
    this.questionnaire.firstName = formData.firstName;
    this.questionnaire.questionnaire[0].cevap = formData.cevap1;
    this.questionnaire.questionnaire[2].cevap = formData.cevap3;
    this.questionnaire.questionnaire[3].cevap = formData.cevap4;
    this.questionnaire.questionnaire[4].cevap = formData.cevap5;
    this.questionnaire.updateDate = Date();
  }

  checkboxCheckedControl(){
    const formData = this.editedQuestionnaire.value;
    if (formData.chkbox1){
      this.checkboxAnswers[0].selected = true;
      this.questionnaire.questionnaire[1].cevap[0] = this.checkboxAnswers[0];
    }else{
      this.checkboxAnswers[0].selected = false;
      this.questionnaire.questionnaire[1].cevap[0] = this.checkboxAnswers[0];
    }
    if (formData.chkbox2){
      this.checkboxAnswers[1].selected = true;
      this.questionnaire.questionnaire[1].cevap[1] = this.checkboxAnswers[1];
    }else{
      this.checkboxAnswers[1].selected = false;
      this.questionnaire.questionnaire[1].cevap[1] = this.checkboxAnswers[1];
    }
    if (formData.chkbox3){
      this.checkboxAnswers[2].selected = true;
      this.questionnaire.questionnaire[1].cevap[2] = this.checkboxAnswers[2];
    }else{
      this.checkboxAnswers[2].selected = false;
      this.questionnaire.questionnaire[1].cevap[2] = this.checkboxAnswers[2];
    }
  }

  controlHasError(validation, controlName): boolean {
    const control = this.editedQuestionnaire.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }
}
