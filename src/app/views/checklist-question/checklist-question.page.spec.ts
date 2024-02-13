import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChecklistQuestionPage } from './checklist-question.page';

describe('ChecklistQuestionPage', () => {
  let component: ChecklistQuestionPage;
  let fixture: ComponentFixture<ChecklistQuestionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChecklistQuestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
