import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DemoComponent} from './demo.component';
import {RouterModule} from '@angular/router';
import {DashboardsModule} from '../../_metronic/partials/content/dashboards/dashboards.module';
import {FormsModule} from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {ReactiveFormsModule} from '@angular/forms';
import {DialogModule} from 'primeng-lts/dialog';
import {ButtonModule} from 'primeng-lts/button';
import {CheckboxModule} from 'primeng-lts/checkbox';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { AnswersComponent } from './answers/answers.component';
import { EditQuastionnaireComponent } from './answers/edit-quastionnaire/edit-quastionnaire.component';
import {InlineSVGModule} from 'ng-inline-svg';


@NgModule({
  declarations: [DemoComponent, AnswersComponent, EditQuastionnaireComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: DemoComponent,
            },
        ]),
        DashboardsModule,
        FormsModule,
        MatStepperModule,
        ReactiveFormsModule,
        DialogModule,
        ButtonModule,
        CheckboxModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        InlineSVGModule,
    ],
    exports: [
        MatInputModule,
    ]
})
export class DemoModule { }
