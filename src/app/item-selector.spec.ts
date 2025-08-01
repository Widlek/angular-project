import { TestBed } from '@angular/core/testing';

import { ItemSelector } from './item-selector';

describe('ItemSelector', () => {
  let service: ItemSelector;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemSelector);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
