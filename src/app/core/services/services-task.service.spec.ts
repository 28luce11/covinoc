import { TestBed } from '@angular/core/testing';

import { ServicesTaskService } from './services-task.service';

describe('ServicesTaskService', () => {
  let service: ServicesTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
