import { TestBed } from '@angular/core/testing';

import { RespostaQuestService } from './resposta-quest.service';

describe('RespostaQuestService', () => {
  let service: RespostaQuestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RespostaQuestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
