import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrensfertComponent } from './add-trensfert.component';

describe('AddTrensfertComponent', () => {
  let component: AddTrensfertComponent;
  let fixture: ComponentFixture<AddTrensfertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTrensfertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrensfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
