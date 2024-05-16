import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VagasInputsComponent } from './vagas-inputs.component';

describe('VagasInputsComponent', () => {
  let component: VagasInputsComponent;
  let fixture: ComponentFixture<VagasInputsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VagasInputsComponent]
    });
    fixture = TestBed.createComponent(VagasInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
