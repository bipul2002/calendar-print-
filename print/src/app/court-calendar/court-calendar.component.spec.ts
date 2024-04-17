import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtCalendarComponent } from './court-calendar.component';

describe('CourtCalendarComponent', () => {
  let component: CourtCalendarComponent;
  let fixture: ComponentFixture<CourtCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourtCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourtCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
