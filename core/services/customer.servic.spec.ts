import { TestBed } from '@angular/core/testing';

import { CustomerServic } from './customer.servic';

describe('CustomerServic', () => {
  let service: CustomerServic;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerServic);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
