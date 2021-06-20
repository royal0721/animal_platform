import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckMemberComponent } from './check-member.component';

describe('CheckMemberComponent', () => {
  let component: CheckMemberComponent;
  let fixture: ComponentFixture<CheckMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
