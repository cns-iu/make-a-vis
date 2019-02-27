import { Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { SaveProjectService } from './save-project.service';

describe('SaveProjectService', () => {
  let service: SaveProjectService;

  beforeEach(() => {
    const mockedStore = { dispatch: (): void => undefined };
    const mockedProviders: Provider[] = [
      { provide: Store, useValue: mockedStore }
    ];
    TestBed.configureTestingModule({
      providers: ([SaveProjectService] as Provider[]).concat(mockedProviders)
    })
    .compileComponents();
  });

  beforeEach(() => {
    service = TestBed.get(SaveProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
