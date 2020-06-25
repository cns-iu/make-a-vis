import { TestBed } from '@angular/core/testing';

import { AdvancedService } from './advanced.service';
import { Store } from '@ngrx/store';
import { Provider } from '@angular/core';

describe('AdvanceService', () => {
  const mockedStore = { dispatch: (): void => undefined };
    const mockedProviders: Provider[] = [
      { provide: Store, useValue: mockedStore }
    ];
  beforeEach(() => TestBed.configureTestingModule({
    providers: mockedProviders
  }));

  it('should be created', () => {
    const service: AdvancedService = TestBed.inject(AdvancedService);
    expect(service).toBeTruthy();
  });
});
