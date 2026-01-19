import { TestBed } from '@angular/core/testing';

import { ProductServic } from './product.servic';

describe('ProductServic', () => {
  let service: ProductServic;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductServic);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
