import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeversComponent } from './levers.component';

describe('LeversComponent', () => {
  let component: LeversComponent;
  let fixture: ComponentFixture<LeversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeversComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
