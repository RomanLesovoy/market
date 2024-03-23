import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositContentComponent } from './deposit-content.component';

describe('DepositContentComponent', () => {
  let component: DepositContentComponent;
  let fixture: ComponentFixture<DepositContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepositContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepositContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
