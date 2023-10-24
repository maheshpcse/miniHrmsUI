import { TestBed } from '@angular/core/testing';

import { AdminFormsService } from './admin-forms.service';

describe('AdminFormsService', () => {
  let service: AdminFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
