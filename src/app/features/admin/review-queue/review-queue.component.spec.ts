import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewQueueComponent } from './review-queue.component';

describe('ReviewQueueComponent', () => {
  let component: ReviewQueueComponent;
  let fixture: ComponentFixture<ReviewQueueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewQueueComponent]
    });
    fixture = TestBed.createComponent(ReviewQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
