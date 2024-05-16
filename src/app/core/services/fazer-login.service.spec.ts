import { TestBed } from '@angular/core/testing';

import { FazerLoginService } from './fazer-login.service';

describe('FazerLoginService', () => {
  let service: FazerLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FazerLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
