import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAffecterComponent } from './add-affecter.component';

describe('AddAffecterComponent', () => {
  let component: AddAffecterComponent;
  let fixture: ComponentFixture<AddAffecterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAffecterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAffecterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
