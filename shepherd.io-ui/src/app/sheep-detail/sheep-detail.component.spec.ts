import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheepDetailComponent } from './sheep-detail.component';

describe('SheepDetailComponent', () => {
  let component: SheepDetailComponent;
  let fixture: ComponentFixture<SheepDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheepDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheepDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
