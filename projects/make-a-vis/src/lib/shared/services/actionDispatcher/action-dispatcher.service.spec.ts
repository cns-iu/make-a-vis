import { TestBed } from '@angular/core/testing';

import { ActionDispatcherService } from './action-dispatcher.service';

describe('ActionDispatcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ActionDispatcherService = TestBed.get(ActionDispatcherService);
    expect(service).toBeTruthy();
  });
});
