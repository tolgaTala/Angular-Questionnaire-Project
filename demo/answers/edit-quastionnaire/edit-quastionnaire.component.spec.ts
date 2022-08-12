import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditQuastionnaireComponent } from './edit-quastionnaire.component';

describe('EditQuastionnaireComponent', () => {
  let component: EditQuastionnaireComponent;
  let fixture: ComponentFixture<EditQuastionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditQuastionnaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuastionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
