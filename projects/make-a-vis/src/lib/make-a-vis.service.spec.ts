import { TestBed, inject } from '@angular/core/testing';

import { MakeAVisService } from './make-a-vis.service';

describe('MakeAVisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MakeAVisService]
    });
  });

  it('should be created', inject([MakeAVisService], (service: MakeAVisService) => {
    expect(service).toBeTruthy();
  }));
});
