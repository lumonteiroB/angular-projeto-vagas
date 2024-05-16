import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalErroFormComponent } from './modal-erro-form.component';

describe('ModalErroFormComponent', () => {
  let component: ModalErroFormComponent;
  let fixture: ComponentFixture<ModalErroFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalErroFormComponent]
    });
    fixture = TestBed.createComponent(ModalErroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
