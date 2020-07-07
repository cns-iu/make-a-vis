import { TestBed } from '@angular/core/testing';

import { ViewManagerService } from './view-manager.service';

describe('ViewManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewManagerService = TestBed.get(ViewManagerService);
    expect(service).toBeTruthy();
  });
});
