import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberWheelComponent } from './number-wheel.component';

describe('NumberWheelComponent', () => {
  let component: NumberWheelComponent;
  let fixture: ComponentFixture<NumberWheelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberWheelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NumberWheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
