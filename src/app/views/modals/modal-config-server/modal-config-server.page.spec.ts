import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalConfigServerPage } from './modal-config-server.page';

describe('ModalConfigServerPage', () => {
  let component: ModalConfigServerPage;
  let fixture: ComponentFixture<ModalConfigServerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalConfigServerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
