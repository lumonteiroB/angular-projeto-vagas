import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaInputsComponent } from './empresa-inputs.component';

describe('EmpresaInputsComponent', () => {
  let component: EmpresaInputsComponent;
  let fixture: ComponentFixture<EmpresaInputsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpresaInputsComponent]
    });
    fixture = TestBed.createComponent(EmpresaInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
