import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmigrationStatisticsComponent } from './immigration-statistics.component';

describe('ImmigrationStatisticsComponent', () => {
  let component: ImmigrationStatisticsComponent;
  let fixture: ComponentFixture<ImmigrationStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmigrationStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmigrationStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
