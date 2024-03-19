import {Point} from "./point";

export class Line {
  begin: Point;
  end: Point;

  constructor(begin: Point, end: Point) {
    this.begin = begin;
    this.end = end;
  }

  public getAngle(): number {
    return Math.atan2(this.end.y - this.begin.y, this.end.x - this.begin.x);
  }
}
