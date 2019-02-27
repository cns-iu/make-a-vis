import { TestBed, async } from '@angular/core/testing';

import { LegendService } from './legend.service';
import { Store } from '@ngrx/store';

describe('LegendService', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ Store ]
    })
    .compileComponents();
  }));

  // FIXME: To be fixed after test coverage setup in SONAR
  xit('should be created', () => {
    const service: LegendService = TestBed.get(LegendService);
    expect(service).toBeTruthy();
  });
});
