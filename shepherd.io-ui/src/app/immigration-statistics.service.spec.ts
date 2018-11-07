import { TestBed, inject } from '@angular/core/testing';

import { ImmigrationStatisticsService } from './immigration-statistics.service';

describe('ImmigrationStatisticsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImmigrationStatisticsService]
    });
  });

  it('should be created', inject([ImmigrationStatisticsService], (service: ImmigrationStatisticsService) => {
    expect(service).toBeTruthy();
  }));
});
