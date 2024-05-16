import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespUsuariosComponent } from './resp-usuarios.component';

describe('RespUsuariosComponent', () => {
  let component: RespUsuariosComponent;
  let fixture: ComponentFixture<RespUsuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RespUsuariosComponent]
    });
    fixture = TestBed.createComponent(RespUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
