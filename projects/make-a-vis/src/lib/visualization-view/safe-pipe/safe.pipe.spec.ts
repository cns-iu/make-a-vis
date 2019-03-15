import { SafePipe } from './safe.pipe';
import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';

describe('SafePipe', () => {

  let directive: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomSanitizer]
    });
  });

  beforeEach(() => {
    directive = TestBed.get(DomSanitizer);
  });

  it('create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
