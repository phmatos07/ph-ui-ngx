import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'phu-horizontal-timeline',
  templateUrl: './horizontal-timeline.component.html',
  styleUrls: ['./horizontal-timeline.component.scss']
})
export class HorizontalTimelineComponent implements OnInit {

  @Input()
  pointsInTime = Array<string>();

  @Input()
  position: string | number = 0;

  quantityValues = this.pointsInTime.length;
  lastValue = 0;

  ngOnInit(): void {
    this.pointsInTime = this.convertToArray();
    this.lastValue = this.pointsInTime.length - 1;
    this.quantityValues = this.pointsInTime.length;
  }

  private convertToArray(): string[] {

    const enumValues: string[] = [];

    for (const enumProperty in this.pointsInTime) {

      if (this.pointsInTime.hasOwnProperty(enumProperty)) {

        const enumValue = this.pointsInTime[enumProperty];

        if (typeof enumValue === 'string') {
          enumValues.push(enumValue);
        }
      }
    }

    return enumValues;
  }

  trackByPointsInTime(index: number): number {
    return index;
  }

  get positionIndex(): number {

    for (const key in this.pointsInTime) {

      if (this.pointsInTime.hasOwnProperty(key)) {

        const point = this.pointsInTime[key];

        if (key === this.position || point === this.position) {
          return Number(key);
        }
      }
    }
    return 0;
  }
}
