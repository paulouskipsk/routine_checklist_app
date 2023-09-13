import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponseChecklistPage } from './response-checklist.page';

describe('ResponseChecklistPage', () => {
  let component: ResponseChecklistPage;
  let fixture: ComponentFixture<ResponseChecklistPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ResponseChecklistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
