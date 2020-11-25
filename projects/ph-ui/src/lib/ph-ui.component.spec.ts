import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhUiComponent } from './ph-ui.component';

describe('PhUiComponent', () => {
  let component: PhUiComponent;
  let fixture: ComponentFixture<PhUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
