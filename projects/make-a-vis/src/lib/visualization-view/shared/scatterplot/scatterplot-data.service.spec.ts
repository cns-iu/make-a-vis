import { TestBed, inject } from '@angular/core/testing';

import { ScatterplotDataService } from './scatterplot-data.service';

describe('ScatterplotDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScatterplotDataService]
    });
  });

  it('should be created', inject([ScatterplotDataService], (service: ScatterplotDataService) => {
    expect(service).toBeTruthy();
  }));
});
