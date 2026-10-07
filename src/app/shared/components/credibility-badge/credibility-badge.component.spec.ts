import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CredibilityBadgeComponent } from './credibility-badge.component';

describe('CredibilityBadgeComponent', () => {
  let component: CredibilityBadgeComponent;
  let fixture: ComponentFixture<CredibilityBadgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CredibilityBadgeComponent]
    });
    fixture = TestBed.createComponent(CredibilityBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
