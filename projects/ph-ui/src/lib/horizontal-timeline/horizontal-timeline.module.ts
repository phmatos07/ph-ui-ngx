import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HorizontalTimelineComponent } from './horizontal-timeline.component';

@NgModule({
  declarations: [HorizontalTimelineComponent],
  imports: [CommonModule],
  exports: [HorizontalTimelineComponent]
})
export class HorizontalTimelineModule { }
