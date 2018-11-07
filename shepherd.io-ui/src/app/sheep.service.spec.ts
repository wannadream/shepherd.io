import { TestBed, inject } from '@angular/core/testing';

import { SheepService } from './sheep.service';

describe('SheepService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SheepService]
    });
  });

  it('should be created', inject([SheepService], (service: SheepService) => {
    expect(service).toBeTruthy();
  }));
});
