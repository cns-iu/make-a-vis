import { TestBed } from '@angular/core/testing';

import { AdvancedService } from './advanced.service';

describe('AdvanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdvancedService = TestBed.get(AdvancedService);
    expect(service).toBeTruthy();
  });
});
