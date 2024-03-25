import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwapContentComponent } from './swap-content.component';

describe('SwapContentComponent', () => {
  let component: SwapContentComponent;
  let fixture: ComponentFixture<SwapContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SwapContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SwapContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
