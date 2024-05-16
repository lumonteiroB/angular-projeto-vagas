import { TestBed } from '@angular/core/testing';

import { ConteudoSiteService } from './conteudo-site.service';

describe('ConteudoSiteService', () => {
  let service: ConteudoSiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConteudoSiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
