import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheepComponent } from './sheep.component';

describe('SheepComponent', () => {
  let component: SheepComponent;
  let fixture: ComponentFixture<SheepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
