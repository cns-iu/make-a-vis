import { TestBed } from '@angular/core/testing';

import { UpdateVisService } from './update-vis.service';

describe('UpdateVisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateVisService = TestBed.get(UpdateVisService);
    expect(service).toBeTruthy();
  });
});
