import { TestBed } from '@angular/core/testing';

import { UsuariosFazerLoginService } from './usuarios.service';

describe('UsuariosFazerLoginService', () => {
  let service: UsuariosFazerLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosFazerLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
