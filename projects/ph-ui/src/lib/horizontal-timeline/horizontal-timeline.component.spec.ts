import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HorizontalTimelineComponent } from './horizontal-timeline.component';

describe('HorizontalTimelineComponent', () => {

  let component: HorizontalTimelineComponent;
  let fixture: ComponentFixture<HorizontalTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HorizontalTimelineComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#HorizontalTimelineComponent deve criar o aplicativo', async(() => {
    expect(component).toBeTruthy();
  }));

  it('Verificar se a quantidade do array #component.pointsInTime seja igual ou maior que 1', () => {

    inject([HorizontalTimelineComponent], (horizontalTimeline: HorizontalTimelineComponent) => {
      horizontalTimeline.pointsInTime = ['Teste 01', 'Teste 02'];
      expect(horizontalTimeline.quantityValues).toBeGreaterThan(1);
    });
  });
});
