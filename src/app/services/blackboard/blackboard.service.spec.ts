import { TestBed } from '@angular/core/testing';

import { BlackboardService } from './blackboard.service';

describe('BlackboardService', () => {
  let service: BlackboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlackboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
