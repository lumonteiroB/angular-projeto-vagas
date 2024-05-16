import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioInputsComponent } from './usuario-inputs.component';

describe('UsuarioInputsComponent', () => {
  let component: UsuarioInputsComponent;
  let fixture: ComponentFixture<UsuarioInputsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioInputsComponent]
    });
    fixture = TestBed.createComponent(UsuarioInputsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
