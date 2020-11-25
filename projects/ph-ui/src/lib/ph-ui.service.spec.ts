import { TestBed } from '@angular/core/testing';

import { PhUiService } from './ph-ui.service';

describe('PhUiService', () => {
  let service: PhUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
