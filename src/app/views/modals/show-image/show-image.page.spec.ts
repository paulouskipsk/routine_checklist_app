import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShowImagePage } from './show-image.page';

describe('ShowImagePage', () => {
  let component: ShowImagePage;
  let fixture: ComponentFixture<ShowImagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ShowImagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
