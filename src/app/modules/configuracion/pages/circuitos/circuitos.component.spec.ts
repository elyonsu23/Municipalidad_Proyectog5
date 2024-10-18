import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitosComponent } from './circuitos.component';

describe('CircuitosComponent', () => {
  let component: CircuitosComponent;
  let fixture: ComponentFixture<CircuitosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CircuitosComponent]
    });
    fixture = TestBed.createComponent(CircuitosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
