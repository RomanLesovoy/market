import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawContentComponent } from './withdraw-content.component';

describe('WithdrawContentComponent', () => {
  let component: WithdrawContentComponent;
  let fixture: ComponentFixture<WithdrawContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WithdrawContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WithdrawContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
