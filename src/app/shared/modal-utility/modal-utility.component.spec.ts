import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUtilityComponent } from './modal-utility.component';

describe('ModalUtilityComponent', () => {
  let component: ModalUtilityComponent;
  let fixture: ComponentFixture<ModalUtilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalUtilityComponent]
    });
    fixture = TestBed.createComponent(ModalUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
