import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IceLocatorDialogComponent } from './ice-locator-dialog.component';

describe('IceLocatorDialogComponent', () => {
  let component: IceLocatorDialogComponent;
  let fixture: ComponentFixture<IceLocatorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IceLocatorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IceLocatorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
