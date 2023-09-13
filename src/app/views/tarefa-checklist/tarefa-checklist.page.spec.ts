import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TarefaChecklistPage } from './tarefa-checklist.page';

describe('TarefaChecklistPage', () => {
  let component: TarefaChecklistPage;
  let fixture: ComponentFixture<TarefaChecklistPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TarefaChecklistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
