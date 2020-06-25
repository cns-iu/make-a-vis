import { TestBed } from '@angular/core/testing';

import { NgxVegaService } from './ngx-vega.service';

describe('NgxVegaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxVegaService = TestBed.get(NgxVegaService);
    expect(service).toBeTruthy();
  });
});
