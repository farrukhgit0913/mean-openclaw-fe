import { TestBed } from '@angular/core/testing';
import { Openclaw } from './openclaw';

describe('Openclaw', () => {
  let service: Openclaw;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Openclaw);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
