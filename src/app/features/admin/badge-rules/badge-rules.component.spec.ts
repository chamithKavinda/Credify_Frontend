import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeRulesComponent } from './badge-rules.component';

describe('BadgeRulesComponent', () => {
  let component: BadgeRulesComponent;
  let fixture: ComponentFixture<BadgeRulesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BadgeRulesComponent]
    });
    fixture = TestBed.createComponent(BadgeRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
