import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescricaoComponent } from './descricao.component';

describe('DescricaoComponent', () => {
  let component: DescricaoComponent;
  let fixture: ComponentFixture<DescricaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescricaoComponent]
    });
    fixture = TestBed.createComponent(DescricaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
