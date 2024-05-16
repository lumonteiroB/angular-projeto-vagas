import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVisualizarComponent } from './modal-visualizar.component';

describe('ModalVisualizarComponent', () => {
  let component: ModalVisualizarComponent;
  let fixture: ComponentFixture<ModalVisualizarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalVisualizarComponent]
    });
    fixture = TestBed.createComponent(ModalVisualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
