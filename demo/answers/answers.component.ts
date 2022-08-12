import {Component, Input, OnInit} from '@angular/core';
import {Questionnaire} from '../demo.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditQuastionnaireComponent} from './edit-quastionnaire/edit-quastionnaire.component';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {

  @Input() questionnaires: Questionnaire[];
  editingData: Questionnaire;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.editingValueChanges();
  }

  showEditingModal(questionnaire: Questionnaire) {
    const modalRef = this.modalService.open(EditQuastionnaireComponent, { size: 'xl' });
    modalRef.componentInstance.questionnaire = questionnaire;
    modalRef.componentInstance.msgevent.subscribe(($e) => {
      this.editingData = $e;
      console.log('edit Componentinden düzenlenmiş anket bilgisi', this.editingData);
      this.ngOnInit();
    });
  }
  editingValueChanges(){
    if (this.editingData){
      this.questionnaires.find(x => x.key === this.editingData.key).firstName = this.editingData.firstName;
      this.questionnaires.find(x => x.key === this.editingData.key).questionnaire = this.editingData.questionnaire;
      this.questionnaires.find(x => x.key === this.editingData.key).updateDate = Date();
    }
  }
}
