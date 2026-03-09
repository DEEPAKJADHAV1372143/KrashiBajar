import { TestBed } from '@angular/core/testing';

import { Myapi } from './myapi';

describe('Myapi', () => {
  let service: Myapi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Myapi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
