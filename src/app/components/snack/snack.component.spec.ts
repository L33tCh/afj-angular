import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSnackBar } from '@angular/material';

describe('SnackComponent', () => {
  let component: MatSnackBar;
  let fixture: ComponentFixture<MatSnackBar>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatSnackBar ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatSnackBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
