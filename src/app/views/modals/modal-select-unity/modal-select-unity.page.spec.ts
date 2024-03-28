import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalSelectUnityPage } from './modal-select-unity.page';

describe('ModalSelectUnityPage', () => {
  let component: ModalSelectUnityPage;
  let fixture: ComponentFixture<ModalSelectUnityPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalSelectUnityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
