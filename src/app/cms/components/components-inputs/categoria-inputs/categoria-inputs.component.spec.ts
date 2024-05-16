import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaInputsComponent } from './categoria-inputs.component';

describe('CategoriaInputsComponent', () => {
  let component: CategoriaInputsComponent;
  let fixture: ComponentFixture<CategoriaInputsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriaInputsComponent]
    });
    fixture = TestBed.createComponent(CategoriaInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
